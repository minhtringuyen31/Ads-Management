import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import Scrollbar from "ui-component/scrollbar/Scrollbar";
import "../styles.scss";

import Modal from "../ModalDetailAdsboard";

const BoardManagement = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false); //đóng mở modal
  const [selectedRow, setSelectedRow] = useState(null); //lưu data của row đc select
  const [filteredData, setFilteredData] = useState([]); //lưu data đã được filter

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleNewLicense = () => {
    navigate("/utils/authorize_request/create_form");
  };

  const handleReqEditAdsboard = (event, adsboardID) => {
    event.stopPropagation();
    navigate("/utils/adsboard/request_edit_form", { state: { adsboardID } });
    event.stopPropagation();
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
        const response = await axios.get("http://14.225.192.121/adsboards");
        const dataWithId = response.data.data.map((item, index) => ({
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value), 10);
    setPage(0);
  };

  console.log("Data adsboard: ", filteredData);

  return (
    <MainCard title="Quản lý bảng quảng cáo">
      <Scrollbar>
        <Box className="data-grid-container">
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
          <Table>
            <TableHead
              sx={{
                backgroundColor: theme.palette.primary.light,
              }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "5%" }}>
                  STT
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
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
                <TableCell sx={{ width: "17.25%" }}></TableCell>
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
                    <TableCell>{row.location.address}</TableCell>
                    <TableCell>{row.adsboard_type.label}</TableCell>
                    <TableCell>
                      {row.height}m x {row.width}m
                    </TableCell>
                    <TableCell>{row.contract_start_date}</TableCell>
                    <TableCell>{row.contract_end_date}</TableCell>
                    <TableCell>
                      <Button
                        endIcon={<EditIcon />}
                        variant="outlined"
                        onClick={(e) => handleReqEditAdsboard(e, row._id)}
                      >
                        Yêu cầu chỉnh sửa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>

      {selectedRow && (
        <Modal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          adDetail={selectedRow}
        />
      )}

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
    </MainCard>
  );
};

export default BoardManagement;
