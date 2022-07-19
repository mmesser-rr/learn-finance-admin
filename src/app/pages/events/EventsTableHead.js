import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import TableHead from '@mui/material/TableHead';
import { openDialog, closeDialog } from 'app/store/fuse/dialogSlice';
import { getEvents, removeEvents } from '../store/eventsSlice';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const rows = [
  // {
  //   id: 'image',
  //   align: 'left',
  //   disablePadding: true,
  //   label: '',
  //   sort: false,
  // },
  {
    id: 'title',
    align: 'left',
    disablePadding: false,
    label: 'Title',
    sort: true,
  },
  {
    id: 'dateTime',
    align: 'left',
    disablePadding: false,
    label: 'Start Date',
    sort: true,
  },
  {
    id: 'dateTime',
    align: 'left',
    disablePadding: false,
    label: 'Start Time',
    sort: true,
  },
  {
    id: 'location',
    align: 'left',
    disablePadding: false,
    label: 'Where',
    sort: true,
  },
  {
    id: 'category',
    align: 'left',
    disablePadding: false,
    label: 'Category',
    sort: true,
  }
];

function EventsTableHead(props) {
  const { selectedEventIds, setData } = props;
  const numSelected = selectedEventIds.length;

  const [selectedEventsMenu, setSelectedEventsMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedEventsMenu(event) {
    setSelectedEventsMenu(event.currentTarget);
  }

  function closeSelectedEventsMenu() {
    setSelectedEventsMenu(null);
  }

  const renderConfirmDialog = ()=> dispatch(openDialog({
    children: (
      <div className="text-white">
          <DialogTitle id="alert-dialog-title">Are you sure to delete selected opportunites?</DialogTitle>          
          <DialogActions>
              <Button onClick={()=> {
                dispatch(closeDialog())                
              }} color="primary">
                  No
              </Button>
              <Button onClick={()=> {
                dispatch(closeDialog())
                dispatch(removeEvents(selectedEventIds)).then(async () => {
                  console.log('EventsTableHead => removeEvents => success');
                });
              }} color="primary" autoFocus>
                  Yes
              </Button>
          </DialogActions>
      </div>
    )
  }))

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell padding="none" className="w-40 md:w-64 text-center z-99">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < props.rowCount}
            checked={props.rowCount !== 0 && numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />
          {numSelected > 0 && (
            <Box
              className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
              sx={{
                background: (theme) => theme.palette.background.paper,
              }}
            >
              <IconButton
                aria-owns={selectedEventsMenu ? 'selectedEventsMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedEventsMenu}
                size="large"
              >
                <Icon>more_horiz</Icon>
              </IconButton>
              <Menu
                id="selectedEventsMenu"
                anchorEl={selectedEventsMenu}
                open={Boolean(selectedEventsMenu)}
                onClose={closeSelectedEventsMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      renderConfirmDialog()
                      // dispatch(removeEvents(selectedProductIds));
                      // props.onMenuItemClick();
                      closeSelectedEventsMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </TableCell>
        {rows.map((row, index) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={row.id + index}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default EventsTableHead;
