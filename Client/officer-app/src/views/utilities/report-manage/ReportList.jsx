import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import useHttp from 'hooks/use-http';
import { getAllReports } from 'lib/api';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ReportContext from 'store/report/report-context';
import MainCard from 'ui-component/cards/MainCard';

const createData = (id, number, time, name, email, report_type, status) => {
  return {
    id,
    number,
    time,
    name,
    email,
    report_type,
    status,
  };
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'number',
    numeric: false,
    disablePadding: false,
    label: 'STT',
  },
  {
    id: 'time',
    numeric: false,
    disablePadding: true,
    label: 'Ngày gửi',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Tên người gửi',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'report_type',
    numeric: false,
    disablePadding: false,
    label: 'Loại báo cáo',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Tình trạng',
  },
  {
    id: 'detail',
    numeric: true,
    disablePadding: false,
    label: 'Chi tiết',
  },
];

const EnhancedTableHead = (props) => {
  const theme = useTheme();
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      sx={{
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <TableRow>
        {/* <TableCell padding='checkbox'>STT</TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h4'
          id='tableTitle'
          component='div'
        >
          Danh sách Báo cáo
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

const EnhancedTable = (props) => {
  const reportCtx = useContext(ReportContext);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = props.rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
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
  };

  const handleReportDetail = (id) => {
    reportCtx.setReportDetail(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(props.rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, props.rows]
  );

  const getReportType = (report_type) => {
    if (report_type === 'denounce') {
      return 'Báo cáo vi phạm';
    } else if (report_type === 'suggest') {
      return 'Đóng góp ý kiến';
    } else {
      return 'Giải đáp thắc mắc';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell align='left'>{row.number}</TableCell>
                    <TableCell
                      component='th'
                      id={labelId}
                      scope='row'
                      padding='none'
                    >
                      {moment.utc(row.time).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell align='left'>{row.name}</TableCell>
                    <TableCell align='left'>{row.email}</TableCell>
                    <TableCell align='left'>
                      {getReportType(row.report_type)}
                    </TableCell>
                    <TableCell align='left'>
                      {row.status === 'solved'
                        ? 'Đã giải quyết'
                        : 'Chưa giải quyết'}
                    </TableCell>
                    <TableCell align='right'>
                      <Link to='/utils/report/detail'>
                        <IconButton onClick={() => handleReportDetail(row.id)}>
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label='Dense padding'
      />
    </Box>
  );
};

const ReportListTable = () => {
  const {
    sendRequest,
    status,
    data: loadedReports,
    error,
  } = useHttp(getAllReports, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const getAddress = (report) => {
    if (report.type === 'board') {
      return report.board.location.address;
    } else {
      return report.location.address;
    }
  };

  const rows = useMemo(() => {
    if (loadedReports) {
      return loadedReports.map((report, index) => {
        return createData(
          report._id,
          index + 1,
          report.createdAt,
          report.username,
          report.email,
          report.report_form,
          report.status
        );
      });
    }
  }, [loadedReports]);

  if (error) {
    return <div>Có lỗi xảy ra</div>;
  }

  if (status === 'pending') {
    return <div>Đang tải dữ liệu</div>;
  }

  if (status === 'completed' && rows !== null) {
    return (
      <MainCard>
        <EnhancedTable rows={rows} />
      </MainCard>
    );
  }
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

EnhancedTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default ReportListTable;
