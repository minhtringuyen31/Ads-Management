import { useState, useCallback, useEffect } from "react";
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Scrollbar from "ui-component/scrollbar/Scrollbar";
import "../styles.scss";

import Modal from "../ModalDetailAdsboard";

const BoardManagement = () => {
  const [openModal, setOpenModal] = useState(false); //đóng mở modal
  const [selectedRow, setSelectedRow] = useState(null); //lưu data của row đc select
  const [filteredData, setFilteredData] = useState([]); //lưu data đã được filter
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRowClick = useCallback((row) => {
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
    // <ThemeProvider theme={themeLanguage}>
    <MainCard title="Quản lý bảng quảng cáo">
      <Scrollbar>
        <Box className="data-grid-container">
          <Table>
            <TableHead
              sx={{
                backgroundColor: theme.palette.primary.light,
              }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>STT</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Địa chỉ</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Loại bảng quảng cáo
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Kích thước</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Bắt đầu hợp đồng
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Kết thúc hợp đồng
                </TableCell>
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
    // </ThemeProvider>
  );
};

export default BoardManagement;
