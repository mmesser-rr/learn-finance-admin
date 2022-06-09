import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { styled, alpha } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import FuseNavBadge from '../../FuseNavBadge';
import { openDialog, closeDialog } from 'app/store/fuse/dialogSlice';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const Root = styled(ListItem)(({ theme, ...props }) => ({
  height: 40,
  width: '100%',
  borderRadius: '6px',
  margin: '0 0 4px 0',
  paddingRight: 12,
  paddingLeft: props.itempadding,
  color: alpha(theme.palette.text.primary, 0.7),
  cursor: 'pointer',
  textDecoration: 'none!important',
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: theme.palette.text.primary,
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, .05)!important'
        : 'rgba(255, 255, 255, .1)!important',
    pointerEvents: 'none',
    transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
    '& > .fuse-list-item-text-primary': {
      color: 'inherit',
    },
    '& > .fuse-list-item-icon': {
      color: 'inherit',
    },
  },
  '& >.fuse-list-item-icon': {
    marginRight: 12,
    color: 'inherit',
  },
  '& > .fuse-list-item-text': {},
}));

function FuseNavVerticalItem(props) {
  const dispatch = useDispatch();
  const { item, nestedLevel, onItemClick } = props;

  const itempadding = nestedLevel > 0 ? 28 + nestedLevel * 16 : 12;

  const renderConfirmDialog = (navUrl)=> dispatch(openDialog({
    children: (
      <div className="text-white">
          <DialogTitle id="alert-dialog-title">Do you want to ignore changes?</DialogTitle>          
          <DialogActions>
              <Button onClick={()=> {
                dispatch(closeDialog())                
              }} color="primary">
                  No
              </Button>
              <Button onClick={()=> {
                dispatch(closeDialog())
                window.location = navUrl
              }} color="primary" autoFocus>
                  Yes
              </Button>
          </DialogActions>
      </div>
    )
  }))

  const handleItemClick = (e) => {
    const dirtyFieldsLength = Number(localStorage.getItem("dirtyFieldsLength"))
    if (dirtyFieldsLength > 0) {
      console.log('+++++++++++++++++++++ dirtyFieldsLength', dirtyFieldsLength)
      const navUrl = e.currentTarget.href
      e.preventDefault()
      renderConfirmDialog(navUrl)
    }
    else {
      onItemClick && onItemClick(item)
    }
  }

  return useMemo(
    () => (
      <Root
        button
        component={NavLinkAdapter}
        to={item.url}
        activeClassName="active"
        className="fuse-list-item"
        onClick={handleItemClick}
        end={item.end}
        itempadding={itempadding}
        role="button"
      >
        {item.icon && (
          <Icon
            className={clsx('fuse-list-item-icon text-20 shrink-0', item.iconClass)}
            color="action"
          >
            {item.icon}
          </Icon>
        )}

        <ListItemText
          className="fuse-list-item-text"
          primary={item.title}
          classes={{ primary: 'text-13 font-medium fuse-list-item-text-primary' }}
        />
        {item.badge && <FuseNavBadge badge={item.badge} />}
      </Root>
    ),
    [item, itempadding, onItemClick]
  );
}

FuseNavVerticalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
  }),
};

FuseNavVerticalItem.defaultProps = {};

const NavVerticalItem = FuseNavVerticalItem;

export default NavVerticalItem;
