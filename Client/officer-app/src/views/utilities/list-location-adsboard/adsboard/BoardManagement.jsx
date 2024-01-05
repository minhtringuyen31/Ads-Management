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

import Modal from "../ModalDetail";

const BoardManagement = () => {
  const [openModal, setOpenModal] = useState(false); //đóng mở modal
  const [selectedRow, setSelectedRow] = useState(null); //lưu data của row đc select
  const [filteredData, setFilteredData] = useState([]); //lưu data đã được filter
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  return (
    <MainCard title="Board Management">
      <Scrollbar>
        <Box className="data-grid-container">
          <Table>
            <TableHead
              sx={{
                backgroundColor: theme.palette.primary.light,
              }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Ads Board Type
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Size</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Start date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>End date</TableCell>
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
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.adsboard_type.label}</TableCell>
                    <TableCell>{`Height: ${row.height}; Width: ${row.width}`}</TableCell>
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
        />
      </Box>
    </MainCard>
  );
};

export default BoardManagement;
