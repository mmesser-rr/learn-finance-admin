import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import clsx from 'clsx';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { getLearns, selectLearns } from '../store/learnsSlice';
import LearnsTableHead from './LearnsTableHead';

function LearnsTable(props) {
  const dispatch = useDispatch();
  const learns = useSelector(selectLearns);
  console.log('learns => table => opps', learns);
  // const learns = useSelector(({ adminApp }) => adminApp.learns.learns);
  const searchText = useSelector(({ adminApp }) => adminApp.learns.searchText);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(learns);
  console.log('data', data)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    async function load() {
      await dispatch(getLearns(searchText)).then((action) => {
        setLoading(false);
        console.log('learnsTable => useEffect => dispatching getLearns ...', action);
        setData(action.payload);
      });
      setLoading(false);
    }
    load();
  }, [searchText]);

  useEffect(() => {
    setSelected([])
    setData(learns)
  }, [learns])

  // useEffect(() => {
  //   console.log('LearnsTable => opportunites => ', learns);
  //   console.log('LearnsTable => searchText => ', searchText.length);
  //   // setLoading(false);
  //   if (searchText.length !== 0) {
  //     setData(
  //       _.filter(learns, (item) =>
  //         item.name.toLowerCase().includes(searchText.toLowerCase())
  //       )
  //     );
  //     setPage(0);
  //   } else {
  //     console.log('LearnsTable => data => ', learns);
  //     setData(learns);
  //   }
  // }, [learns, searchText]);

  function renderStatus(status) {
    switch (status) {
      case 'active':
        return <Icon className="text-green text-20">check_circle</Icon>;
      case 'inactive':
        return <Icon className="text-red text-20">remove_circle</Icon>;
      default:
        return <Icon className="text-orange text-20">help</Icon>;
    }
  }

  function handleRequestSort(learn, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(learn) {
    if (learn.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.navigate(`/pages/Learns/${item.id}/${item.title.replaceAll(' ', '_')}`);
  }

  function handleCheck(learn, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(learn, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(learn) {
    setRowsPerPage(learn.target.value);
  }

  if (loading) {
    return <FuseLoading />;
  }
  console.log('learnsTable => len', data.length);
  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There are no Learns!
        </Typography>
      </motion.div>
    );
  }
  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <LearnsTableHead
            selectedLearnIds={selected}
            setSelectedLearnIds={setSelected}
            setData={setData}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case 'categories': {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(learn) => handleClick(n)}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(learn) => learn.stopPropagation()}
                        onChange={(learn) => handleCheck(learn, n.id)}
                      />
                    </TableCell>

                    {/* <TableCell
                      className="w-52 px-4 md:px-0"
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      {n.images.length > 0 && n.featuredImageId ? (
                        <img
                          className="w-full block rounded"
                          src={_.find(n.images, { id: n.featuredImageId }).url}
                          alt={n.name}
                        />
                      ) : (
                        <img
                          className="w-full block rounded"
                          src="assets/images/ecommerce/product-image-placeholder.png"
                          alt={n.name}
                        />
                      )}
                    </TableCell> */}

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.title}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.sponsor}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.level}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.reward}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      {n.deposits?.length}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(LearnsTable);
