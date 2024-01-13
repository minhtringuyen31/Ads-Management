import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GetUser } from "store/auth/auth-config";
import instance from "axiosConfig/axios-config";
import MainCard from "ui-component/cards/MainCard";
import TablePagination from "@mui/material/TablePagination";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTheme } from "@mui/material/styles";
import "../styles.scss";

import Modal from "../ModalDetailAdsboard";
import ModalAccept from "views/utilities/list-licen-adsboard/ModalAccept";

const BoardManagement = () => {
  const userRole = GetUser().userRole;
  const theme = useTheme();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false); //đóng mở modal
  const [selectedRow, setSelectedRow] = useState(null); //lưu data của row đc select
  const [filteredData, setFilteredData] = useState([]); //lưu data đã được filter

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //Modal confirm
  const [adsboardToDelete, setAdsboardToDelete] = useState(null);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);

  //Alert, Loading
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewLicense = () => {
    navigate("/utils/authorize_request/create_form");
  };

  const handleNewAdsboard = () => {
    navigate("/utils/adsboard/new_adsboard");
  };

  const handleReqEditAdsboard = (event, adsboardID) => {
    event.stopPropagation();
    navigate("/utils/adsboard/request_edit_form", { state: { adsboardID } });
    event.stopPropagation();
  };
  const handleEditAdsboard = (adsboardID) => {
    navigate("/utils/adsboard/edit_adsboard", { state: { adsboardID } });
  };

  const handleRowClick = useCallback((row) => {
    console.log("Vào đây khum");
    setSelectedRow(row); //lưu data của row đc chọn
    setOpenModal(true);
  }, []);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.get("http://14.225.192.121/adsboards");
        let sortedData = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const dataWithId = sortedData.map((item, index) => ({
          ...item,
          id: index + 1,
          contract_start_date: formatDate(item.contract_start_date),
          contract_end_date: formatDate(item.contract_end_date),
        }));
        setFilteredData(dataWithId);
      } catch (error) {
        console.error("Lỗi khi gọi API list adsboards:", error);
      }
    }
    fetchData();
  }, []);

  //Delete an adsboard
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://14.225.192.121/adsboard/${adsboardToDelete}`
      );
      if (response.status < 300) {
        setShowSuccessAlert(true);
        const updatedDataAdsboard = filteredData
          .filter((adsboard) => adsboard._id !== adsboardToDelete)
          .map((item, index) => ({
            ...item,
            id: index + 1,
          }));
        setFilteredData(updatedDataAdsboard);
      }
    } catch (error) {
      console.error("Lỗi khi xóa bảng quảng cáo", error);
      setShowFailAlert(true);
    }
    setIsLoading(false);
    setOpenModalConfirmDelete(false);
  };

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value), 10);
    setPage(0);
  };

  //Modal confirm
  const handleOpenModalConfirmDelete = (adsboardID) => {
    setOpenModalConfirmDelete(true);
    setAdsboardToDelete(adsboardID);
  };
  const handleCloseModalConfirmDelete = () => {
    setOpenModalConfirmDelete(false);
  };

  //Alert
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };
  const handleCloseFailAlert = () => {
    setShowFailAlert(false);
  };

  console.log("Data adsboard: ", filteredData);

  return (
    <>
      <MainCard title="Quản lý bảng quảng cáo">
        <Box className="data-grid-container">
          {userRole === "province_officer" ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.75rem",
              }}
            >
              <span></span> {/* Phần trống bên trái */}
              <Button
                variant="contained"
                color="primary"
                endIcon={<AddIcon />}
                onClick={handleNewAdsboard}
              >
                Bảng quảng cáo mới
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.75rem",
              }}
            >
              <span></span> {/* Phần trống bên trái */}
              <Button
                variant="contained"
                color="primary"
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
                <TableCell sx={{ fontWeight: "bold", width: "2.5%" }}>
                  STT
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "27.5%" }}>
                  Địa chỉ
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "15%" }}>
                  Loại bảng quảng cáo
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                  Kích thước
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "11.9%" }}>
                  Bắt đầu hợp đồng
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "11.9%" }}>
                  Kết thúc hợp đồng
                </TableCell>
                {userRole === "province_officer" ? (
                  <>
                    <TableCell sx={{ width: "7.5%" }}></TableCell>
                    <TableCell sx={{ width: "7.5%" }}></TableCell>
                  </>
                ) : (
                  <TableCell sx={{ width: "17.25%" }}></TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                    hover
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{row.id}</TableCell>

                    <TableCell>
                      {row.location === null
                        ? "Không xác định điểm đặt"
                        : row.location.address}
                    </TableCell>

                    <TableCell>{row.adsboard_type.label}</TableCell>
                    <TableCell>
                      {row.height}m x {row.width}m
                    </TableCell>
                    <TableCell>{row.contract_start_date}</TableCell>
                    <TableCell>{row.contract_end_date}</TableCell>
                    {userRole === "province_officer" ? (
                      <>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="success"
                            // startIcon={<EditIcon />}
                            sx={{
                              fontWeight: "bold",
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleEditAdsboard(row._id);
                            }}
                            // disabled={
                            //   row.status === "completed" ||
                            //   row.status === "canceled" ||
                            //   row.status === "rejected"
                            // }
                          >
                            <EditIcon />
                          </Button>
                          {/* <ModalAccept
                            open={openModalConfirmAgree}
                            handleDisagree={(event) => {
                              event.stopPropagation();
                              setOpenModalConfirmAgree(false);
                            }}
                            handleAgree={(event) => {
                              event.stopPropagation();
                              handleAgree("completed");
                            }}
                            title={"Xác nhận"}
                            content={
                              "Bạn chắc chắn muốn duyệt yêu cầu cấp phép này?"
                            }
                          /> */}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="error"
                            sx={{
                              fontWeight: "bold",
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleOpenModalConfirmDelete(row._id);
                              // event.stopPropagation();
                            }}
                            disabled={isLoading}
                          >
                            <DeleteForeverIcon />
                          </Button>
                          <ModalAccept
                            open={openModalConfirmDelete}
                            handleDisagree={(event) => {
                              event.stopPropagation();
                              handleCloseModalConfirmDelete();
                            }}
                            handleAgree={(event) => {
                              event.stopPropagation();
                              handleDelete();
                            }}
                            title={"Xác nhận"}
                            content={"Bạn chắc chắn muốn xóa điểm đặt này?"}
                          />
                        </TableCell>
                      </>
                    ) : (
                      <TableCell>
                        <Button
                          endIcon={<EditIcon />}
                          variant="outlined"
                          onClick={(e) => handleReqEditAdsboard(e, row._id)}
                        >
                          Yêu cầu chỉnh sửa
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <span />
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={"Số hàng mỗi trang"}
            labelDisplayedRows={({ from, to, count }) => {
              return "" + from + " - " + to + " của " + count;
            }}
          />
        </Box>

        {selectedRow && (
          <Modal
            open={openModal}
            handleClose={() => setOpenModal(false)}
            adDetail={selectedRow}
          />
        )}
      </MainCard>

      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={2000}
        onClose={handleCloseSuccessAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSuccessAlert}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Xóa bảng quảng cáo thành công
        </Alert>
      </Snackbar>
      <Snackbar
        open={showFailAlert}
        autoHideDuration={1500}
        onClose={handleCloseFailAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseFailAlert}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Xóa bảng quảng cáo lỗi!
        </Alert>
      </Snackbar>
    </>
  );
};

export default BoardManagement;
