import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { GetUser } from "store/auth/auth-config";
import { useTheme } from "@mui/material/styles";
import {
  Table,
  Box,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
  CircularProgress,
  Chip,
  TablePagination,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FeaturedVideoOutlinedIcon from "@mui/icons-material/FeaturedVideoOutlined";
import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MainCard from "ui-component/cards/MainCard";
import Scrollbar from "ui-component/scrollbar/Scrollbar";
import ModalAccept from "../list-licen-adsboard/ModalAccept";

const RequestEditList = () => {
  const userRole = GetUser().userRole;
  const theme = useTheme();

  const [requestList, setRequestList] = useState([]);
  const [typeFilter, setTypeFilter] = useState("Tất cả");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //Modal confirm
  const [cancelId, setCancelId] = useState(null);
  const [openModalConfirmAgree, setOpenModalConfirmAgree] = useState(false);
  const [openModalConfirmDeny, setOpenModalConfirmDeny] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://14.225.192.121/editRequests");
        let sortedData = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        sortedData = sortedData.map((item, index) => ({
          ...item,
          id: index + 1,
        }));

        setRequestList(sortedData);
        console.log(sortedData);
      } catch (error) {
        console.error("Error fetching request list: ", error);
      }
    };
    fetchData();
  }, []);

  const handleAgree = async (status) => {
    if (cancelId) {
      console.log("ID nè", cancelId);
      try {
        const respone = await axios.put(
          `http://14.225.192.121/editRequest/${cancelId}`,
          {
            status: status,
          }
        );
        setRequestList(
          requestList.map((request) => {
            console.log("req: ", request);
            if (request._id === cancelId) {
              console.log("vô đây khum");
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
        console.error("Error cancel request: ", error);
      }
      setOpenModalConfirmAgree(false);
      setOpenModalConfirmDeny(false);
    }
  };

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value), 10);
    setPage(0);
  }, []);

  //Filter
  const handleChangeTypeFilter = (event) => {
    setTypeFilter(event.target.value);
  };
  const filteredRequestList = requestList.filter((row) =>
    typeFilter === "Tất cả" ? true : row.type === typeFilter
  );

  //Modal
  const handleOpenModelConfirmAgree = (id) => {
    setCancelId(id);
    setOpenModalConfirmAgree(true);
  };
  const handleOpenModelConfirmDeny = (id) => {
    setCancelId(id);
    setOpenModalConfirmDeny(true);
  };

  return (
    <MainCard title="Danh sách yêu cầu chỉnh sửa điểm đặt và bảng quảng cáo">
      <Scrollbar>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span></span>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Loại yêu cầu
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={typeFilter}
                onChange={handleChangeTypeFilter}
                autoWidth
                label="Loại yêu cầu"
              >
                <MenuItem value="Tất cả">
                  <em>Tất cả</em>
                </MenuItem>
                <MenuItem value={"location"}>Điểm đặt</MenuItem>
                <MenuItem value={"board"}>Bảng quảng cáo</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>STT</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}> Địa chỉ</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Loại yêu cầu</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tình trạng</TableCell>
                {userRole === "province_officer" && (
                  <>
                    <TableCell sx={{ width: "7.5%" }}></TableCell>
                    <TableCell sx={{ width: "7.5%" }}></TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRequestList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id} sx={{ cursor: "pointer" }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      {row.type === "location"
                        ? row.newInformation.address
                        : row.type === "board"
                        ? row.newInformation.location.address
                        : ""}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          row.type === "location"
                            ? "Điểm đặt"
                            : row.type === "board"
                            ? "Bảng quảng cáo"
                            : row.type
                        }
                        variant="outlined"
                        icon={
                          row.type === "location" ? (
                            <LocationOnOutlinedIcon />
                          ) : row.type === "board" ? (
                            <FeaturedVideoOutlinedIcon />
                          ) : (
                            <LocationOnOutlinedIcon />
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          row.status === "pending"
                            ? "Đang xử lý"
                            : row.status === "completed"
                            ? "Đã được duyệt"
                            : row.status === "canceled"
                            ? "Đã hủy"
                            : row.status === "rejected"
                            ? "Đã bị từ chối"
                            : row.status
                        }
                        color={
                          row.status === "pending"
                            ? "info"
                            : row.status === "completed"
                            ? "success"
                            : row.status === "canceled"
                            ? "default"
                            : row.status === "rejected"
                            ? "error"
                            : "default"
                        }
                        variant="filled"
                      />
                    </TableCell>
                    {userRole === "province_officer" && (
                      <>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="success"
                            startIcon={<DoneIcon />}
                            sx={{
                              fontWeight: "bold",
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleOpenModelConfirmAgree(row._id);
                            }}
                            disabled={
                              row.status === "completed" ||
                              row.status === "canceled" ||
                              row.status === "rejected"
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
                              handleAgree("completed");
                            }}
                            title={"Xác nhận"}
                            content={
                              "Bạn chắc chắn muốn duyệt yêu cầu cấp phép này?"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<HighlightOffIcon />}
                            sx={{
                              fontWeight: "bold",
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleOpenModelConfirmDeny(row._id);
                              // event.stopPropagation();
                            }}
                            disabled={
                              row.status === "completed" ||
                              row.status === "canceled" ||
                              row.status === "rejected"
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
                              handleAgree("rejected");
                            }}
                            title={"Xác nhận"}
                            content={
                              "Bạn chắc chắn muốn loại yêu cầu cấp phép này?"
                            }
                          />
                        </TableCell>
                      </>
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
            count={requestList.length}
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
      </Scrollbar>
    </MainCard>
  );
};
export default RequestEditList;
