import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DoneIcon from '@mui/icons-material/Done';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUser } from 'store/auth/auth-config';
import MainCard from 'ui-component/cards/MainCard';
import Scrollbar from 'ui-component/scrollbar/Scrollbar';
import ModalAccept from './ModalAccept';
import ModalDetail from './ModalDetailLicen';

const styleBox = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.75rem',
};

const LicenAdsboardList = () => {
  const userRole = GetUser().userRole;
  const theme = useTheme();
  const navigate = useNavigate();
  const [licenList, setLicenList] = useState([]);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openModalConfirmAgree, setOpenModalConfirmAgree] = useState(false);
  const [openModalConfirmDeny, setOpenModalConfirmDeny] = useState(false);
  const [cancelId, setCancelId] = useState(null);

  const [selectedRow, setSelectedRow] = useState(null);
  const [openModalDetail, setOpenModalDetail] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleNewLicense = () => {
    navigate('/utils/authorize_request/create_form');
  };
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://14.225.192.121/authorizeRequests'
        );
        let sortedData = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        sortedData = sortedData.map((item, index) => ({
          ...item,
          id: index + 1,
          contract_start_date: formatDate(
            item.new_ads_board.contract_start_date
          ),
          contract_end_date: formatDate(item.new_ads_board.contract_end_date),
        }));

        setLicenList(sortedData);
      } catch (error) {
        console.error('Error fetching licen list: ', error);
      }
    };
    fetchData();
  }, []);

  console.log('Licen list: ', licenList);

  const handleOpenModalConfirm = (id) => {
    setCancelId(id);
    setOpenModalConfirm(true);
    setOpenModalDetail(false);
  };

  const handleOpenModelConfirmAgree = (id) => {
    setCancelId(id);
    setOpenModalConfirmAgree(true);
    setOpenModalDetail(false);
  };

  const handleOpenModelConfirmDeny = (id) => {
    setCancelId(id);
    setOpenModalConfirmDeny(true);
    setOpenModalDetail(false);
  };

  const handleRowClick = useCallback((row) => {
    setSelectedRow(row); //lưu data của row đc chọn
    setOpenModalDetail(true);
  }, []);

  const handleAgree = async (status) => {
    if (cancelId) {
      console.log('ID nè', cancelId);
      try {
        const respone = await axios.put(
          `http://14.225.192.121/authorizeRequest/${cancelId}`,
          {
            status: status,
          }
        );
        setLicenList(
          licenList.map((request) => {
            console.log('req: ', request);
            if (request._id === cancelId) {
              console.log('vô đây khum');
              return {
                ...request,
                status: status,
              };
            } else {
              return request;
            }
          })
        );
        console.log(respone);
      } catch (error) {
        console.error('Error cancel request: ', error);
      }
      setOpenModalConfirm(false);
      setOpenModalConfirmAgree(false);
      setOpenModalConfirmDeny(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value), 10);
    setPage(0);
  };

  if (!licenList) {
    console.log('vào đây hem');
    return (
      <Box
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1500,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  console.log('Selected data: ', selectedRow);
  const filteredList =
    userRole === 'province_officer'
      ? licenList.filter((row) => row.status !== 'canceled')
      : licenList;

  return (
    <MainCard title='Quản lý cấp phép quảng cáo'>
      {selectedRow && (
        <ModalDetail
          open={openModalDetail}
          handleClose={() => setOpenModalDetail(false)}
          licenDetail={selectedRow}
          handleOpenAgreeModel={(event) => {
            event.stopPropagation();
            handleOpenModelConfirmAgree(selectedRow._id);
          }}
          handleOpenDenyModel={(event) => {
            event.stopPropagation();
            handleOpenModelConfirmDeny(selectedRow._id);
          }}
        />
      )}
      <Scrollbar>
        <Box>
          {userRole !== 'province_officer' && (
            <Box style={styleBox}>
              <span></span> {/* Phần trống bên trái */}
              <Button
                variant='contained'
                color='primary'
                endIcon={<AddIcon />}
                onClick={handleNewLicense}
              >
                Cấp phép mới
              </Button>
            </Box>
          )}
          <Table>
            <TableHead
              sx={{
                backgroundColor: theme.palette.primary.light,
              }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '2.5%' }}>
                  STT
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>
                  Điểm đặt
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>
                  Công ty
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>
                  Người liên hệ
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>
                  Bắt đầu hợp đồng
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>
                  Kết thúc hợp đồng
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '12.5%' }}>
                  Tình trạng
                </TableCell>
                {userRole === 'province_officer' ? (
                  <>
                    <TableCell sx={{ width: '7.5%' }}></TableCell>
                    <TableCell sx={{ width: '7.5%' }}></TableCell>
                  </>
                ) : (
                  <TableCell sx={{ width: '7.5%' }}></TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRowClick(row);
                    }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      {row.new_ads_board.location.display_name}
                    </TableCell>
                    <TableCell>{row.new_ads_board.name}</TableCell>
                    <TableCell>
                      {row.new_ads_board.contact_name_person}
                    </TableCell>
                    <TableCell>{row.contract_start_date}</TableCell>
                    <TableCell>{row.contract_end_date}</TableCell>
                    <TableCell>
                      <Chip
                        label={
                          row.status === 'pending'
                            ? 'Đang xử lý'
                            : row.status === 'completed'
                            ? 'Đã được duyệt'
                            : row.status === 'canceled'
                            ? 'Đã hủy'
                            : row.status
                        }
                        color={
                          row.status === 'pending'
                            ? 'primary'
                            : row.status === 'completed'
                            ? 'success'
                            : row.status === 'canceled'
                            ? 'error'
                            : 'default'
                        }
                        variant='outlined'
                        sx={{ borderRadius: '12px' }}
                      />
                    </TableCell>
                    {userRole === 'province_officer' ? (
                      <>
                        <TableCell>
                          <Button
                            variant='outlined'
                            color='success'
                            startIcon={<DoneIcon />}
                            sx={{
                              fontWeight: 'bold',
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleOpenModelConfirmAgree(row._id);
                              // event.stopPropagation();
                            }}
                            disabled={
                              row.status === 'completed' ||
                              row.status === 'canceled' ||
                              row.status === 'rejected'
                            }
                          >
                            Duyệt
                          </Button>
                          <ModalAccept
                            open={openModalConfirmAgree}
                            handleDisagree={(event) => {
                              event.stopPropagation();
                              setOpenModalConfirmAgree(false);
                            }}
                            handleAgree={(event) => {
                              event.stopPropagation();
                              handleAgree('completed');
                            }}
                            title={'Xác nhận'}
                            content={
                              'Bạn chắc chắn muốn duyệt yêu cầu cấp phép này?'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant='outlined'
                            color='error'
                            startIcon={<HighlightOffIcon />}
                            sx={{
                              fontWeight: 'bold',
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleOpenModelConfirmDeny(row._id);
                              // event.stopPropagation();
                            }}
                            disabled={
                              row.status === 'completed' ||
                              row.status === 'canceled' ||
                              row.status === 'rejected'
                            }
                          >
                            Loại
                          </Button>
                          <ModalAccept
                            open={openModalConfirmDeny}
                            handleDisagree={(event) => {
                              event.stopPropagation();
                              setOpenModalConfirmDeny(false);
                            }}
                            handleAgree={(event) => {
                              event.stopPropagation();
                              handleAgree('rejected');
                            }}
                            title={'Xác nhận'}
                            content={
                              'Bạn chắc chắn muốn loại yêu cầu cấp phép này?'
                            }
                          />
                        </TableCell>
                      </>
                    ) : (
                      <TableCell>
                        <Button
                          variant='outlined'
                          color='error'
                          startIcon={<DeleteOutlineOutlinedIcon />}
                          sx={{
                            fontWeight: 'bold',
                          }}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleOpenModalConfirm(row._id);
                            // event.stopPropagation();
                          }}
                          disabled={
                            row.status === 'completed' ||
                            row.status === 'canceled' ||
                            row.status === 'rejected'
                          }
                        >
                          Hủy
                        </Button>
                        <ModalAccept
                          open={openModalConfirm}
                          handleDisagree={(event) => {
                            event.stopPropagation();
                            setOpenModalConfirm(false);
                          }}
                          handleAgree={(event) => {
                            event.stopPropagation();
                            handleAgree('canceled');
                          }}
                          title={'Xác nhận'}
                          content={
                            'Bạn chắc chắn muốn hủy yêu cầu cấp phép này?'
                          }
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <span />
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component='div'
            count={filteredList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={'Số hàng mỗi trang'}
            labelDisplayedRows={({ from, to, count }) => {
              return '' + from + ' - ' + to + ' của ' + count;
            }}
          />
        </Box>
      </Scrollbar>
    </MainCard>
  );
};

export default LicenAdsboardList;
