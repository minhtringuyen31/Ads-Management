import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { GetUser } from "store/auth/auth-config";
import { useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MainCard from "ui-component/cards/MainCard";
import { useTheme } from "@mui/material/styles";
import ModalAccept from "views/utilities/list-licen-adsboard/ModalAccept";

import "../styles.scss";

const LocationManagement = () => {
  const userRole = GetUser().userRole;
  const navigate = useNavigate();
  const theme = useTheme();
  const [dataLocation, setDataLocation] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //Modal confirm
  const [locationToDelete, setLocationToDelete] = useState(null);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);

  //Alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };
  const handleCloseFailAlert = () => {
    setShowFailAlert(false);
  };

  //Navigate
  const handleReqEditLocation = (event, locationID) => {
    event.stopPropagation();
    navigate("/utils/location/request_edit_form", { state: { locationID } });
  };

  const handleNewLocation = () => {
    navigate("/utils/location/new_location");
  };

  //Fetch all locations
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get("http://14.225.192.121/locations");
        let sortedData = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const dataWithId = sortedData.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        if (response.status < 300) {
          setDataLocation(dataWithId);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API list locations:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  //Delete a location
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://14.225.192.121/location/${locationToDelete}`
      );
      if (response.status < 300) {
        setShowSuccessAlert(true);
        const updatedDataLocation = dataLocation
          .filter((location) => location._id !== locationToDelete)
          .map((item, index) => ({ ...item, id: index + 1 }));
        setDataLocation(updatedDataLocation);
      }
    } catch (error) {
      console.error("Lỗi khi xóa điểm đặt: ", error);
      setShowFailAlert(true);
    }
    setIsLoading(false);
    setOpenModalConfirmDelete(false);
  };

  const handleRowClick = useCallback(
    (row) => {
      const clickedLocationId = row._id;
      console.log("Params: ", row);
      if (clickedLocationId != null) {
        localStorage.setItem("locationID", clickedLocationId);
        console.log("Saved locationID:", clickedLocationId);
        navigate(`/utils/location/${clickedLocationId}`);
      }
      console.log(clickedLocationId);
    },
    [navigate]
  );

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value), 10);
    setPage(0);
  };

  //Modal
  const handleOpenModalConfirmDelete = (locationID) => {
    setLocationToDelete(locationID);
    setOpenModalConfirmDelete(true);
  };
  const handleCloseModalConfirmDelete = () => {
    setOpenModalConfirmDelete(false);
  };

  return (
    <>
      {isLoading && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1500,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <MainCard title="Quản lý địa điểm">
        {/* <Scrollbar> */}
        <Box className="data-grid-container">
          {userRole === "province_officer" && (
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
                onClick={handleNewLocation}
              >
                Điểm đặt mới
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
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  STT
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    width: "40%",
                  }}
                >
                  Địa chỉ
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Loại địa điểm
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Loại quảng cáo
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Tình trạng quy hoạch
                </TableCell>
                {userRole === "province_officer" ? (
                  <>
                    <TableCell sx={{ width: "7.5%" }}></TableCell>
                    <TableCell sx={{ width: "7.5%" }}></TableCell>
                  </>
                ) : (
                  <TableCell></TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataLocation
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
                      {row.address}, {row.ward.label}, {row.district.label}
                    </TableCell>
                    <TableCell>{row.location_type.label}</TableCell>
                    <TableCell>{row.ads_type.label}</TableCell>
                    <TableCell>
                      {row.is_planned ? "Đã quy hoạch" : "Chưa quy hoạch"}
                    </TableCell>
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
                            // onClick={(event) => {
                            //   event.stopPropagation();
                            //   handleOpenModelConfirmAgree(row._id);
                            // }}
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
                            // startIcon={<DeleteForeverIcon />}
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
                          onClick={(e) => handleReqEditLocation(e, row._id)}
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
            count={dataLocation.length}
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
          Xóa điểm đặt thành công
        </Alert>
      </Snackbar>
      <Snackbar
        open={showFailAlert}
        autoHideDuration={1000}
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
          Xóa điểm đặt lỗi!
        </Alert>
      </Snackbar>
    </>
  );
};

export default LocationManagement;
