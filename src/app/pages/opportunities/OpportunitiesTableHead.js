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
// import { removeOpportunities } from '../store/OpportunitiesSlice';

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
    id: 'startDateTime',
    align: 'left',
    disablePadding: false,
    label: 'When',
    sort: true,
  },
  {
    id: 'locationDetail',
    align: 'left',
    disablePadding: false,
    label: 'Where',
    sort: true,
  },
  {
    id: 'categories',
    align: 'left',
    disablePadding: false,
    label: 'Category',
    sort: true,
  },
  {
    id: 'cost',
    align: 'right',
    disablePadding: false,
    label: 'Cost',
    sort: true,
  },
  {
    id: 'availability',
    align: 'right',
    disablePadding: false,
    label: 'Availability',
    sort: true,
  },
  {
    id: 'active',
    align: 'right',
    disablePadding: false,
    label: 'Active',
    sort: true,
  },
];

function OpportunitiesTableHead(props) {
  const { selectedOpportunityIds } = props;
  const numSelected = selectedOpportunityIds.length;

  const [selectedOpportunitiesMenu, setSelectedOpportunitiesMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedOpportunitiesMenu(event) {
    setSelectedOpportunitiesMenu(event.currentTarget);
  }

  function closeSelectedOpportunitiesMenu() {
    setSelectedOpportunitiesMenu(null);
  }

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
                aria-owns={selectedOpportunitiesMenu ? 'selectedOpportunitiesMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedOpportunitiesMenu}
                size="large"
              >
                <Icon>more_horiz</Icon>
              </IconButton>
              <Menu
                id="selectedOpportunitiesMenu"
                anchorEl={selectedOpportunitiesMenu}
                open={Boolean(selectedOpportunitiesMenu)}
                onClose={closeSelectedOpportunitiesMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      // dispatch(removeOpportunities(selectedProductIds));
                      props.onMenuItemClick();
                      closeSelectedOpportunitiesMenu();
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
        {rows.map((row) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={row.id}
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

export default OpportunitiesTableHead;
