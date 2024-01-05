import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModalAccept from "./ModalAccept";
import MainCard from "ui-component/cards/MainCard";
import {
  Table,
  Box,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import Scrollbar from "ui-component/scrollbar/Scrollbar";

const styleBox = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.75rem",
};

const LicenAdsboardList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [licenList, setLicenList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [cancelId, setCancelId] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleNewLicense = () => {
    navigate("/bussiness/unit_price/createForm");
  };
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://14.225.192.121/authorizeRequests"
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
        console.error("Error fetching licen list: ", error);
      }
    };
    fetchData();
  }, []);

  console.log("Licen list: ", licenList);

  const handleOpenDialog = (id) => {
    setCancelId(id);
    setOpenDialog(true);
  };

  const handleCancel = async () => {
    if (cancelId) {
      console.log("ID nè", cancelId);
      try {
        const respone = await axios.put(
          `http://14.225.192.121/authorizeRequest/${cancelId}`,
          {
            status: "canceled",
          }
        );
        setLicenList(
          licenList.map((request) => {
            console.log("req: ", request);
            if (request._id === cancelId) {
              console.log("vô đây khum");
              return {
                ...request,
                status: "canceled",
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
      setOpenDialog(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value), 10);
    setPage(0);
  };

  return (
    <MainCard title="Quản lý cấp phép quảng cáo">
      <Scrollbar>
        <Box>
          <Box style={styleBox}>
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
                <TableCell sx={{ fontWeight: "bold", width: "25%" }}>
                  Điểm đặt
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                  Công ty
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                  Người lên hệ
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "15%" }}>
                  Bắt đầu hợp đồng
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "15%" }}>
                  Kết thúc hợp đồng
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "12.5%" }}>
                  Tình trạng
                </TableCell>
                <TableCell sx={{ width: "7.5%" }}></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {licenList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id}>
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
                          row.status === "pending"
                            ? "Đang xử lý"
                            : row.status === "completed"
                            ? "Đã được duyệt"
                            : row.status === "canceled"
                            ? "Đã hủy"
                            : row.status
                        }
                        color={
                          row.status === "pending"
                            ? "primary"
                            : row.status === "completed"
                            ? "success"
                            : row.status === "canceled"
                            ? "error"
                            : "default"
                        }
                        variant="outlined"
                        sx={{ borderRadius: "12px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteOutlineOutlinedIcon />}
                        sx={{
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          handleOpenDialog(row._id);
                        }}
                        disabled={
                          row.status === "completed" ||
                          row.status === "canceled" ||
                          row.status === "rejected"
                        }
                      >
                        Hủy
                      </Button>
                      <ModalAccept
                        open={openDialog}
                        handleClose={() => setOpenDialog(false)}
                        handleCancel={handleCancel}
                        title={"Xác nhận hủy yêu cầu"}
                      />
                    </TableCell>
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
            count={licenList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Scrollbar>
    </MainCard>
  );
};

export default LicenAdsboardList;
