import { useState, useCallback, useEffect } from "react";
import axios from "axios";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MainCard from "ui-component/cards/MainCard";
import Scrollbar from "ui-component/scrollbar/Scrollbar";

const styleBox = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.75rem",
};

const RequestEditList = () => {
  const theme = useTheme();

  const [requestList, setRequestList] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://14.225.192.121/editRequests");
        let sortedData = response.data.data.sort(
          (a, b) => new Date(b.createAt) - new Date(a.createAt)
        );

        sortedData = sortedData.map((item, index) => ({
          ...item,
          id: index + 1,
        }));

        setRequestList(sortedData);
      } catch (error) {
        console.error("Error fetching request list: ", error);
      }
    };
    fetchData();
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value), 10);
    setPage(0);
  }, []);

  return (
    <MainCard title="Danh sách yêu cầu chỉnh sửa điểm đặt và bảng quảng cáo">
      <Scrollbar>
        <Box>
          <Box style={styleBox}>
            <span></span>
            <Button variant="contained" color="primary" endIcon={<AddIcon />}>
              Yêu cầu mới
            </Button>
          </Box>
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>STT</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}> Địa chỉ</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Loại yêu cầu</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tình trạng</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {requestList
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
                      {row.type === "location"
                        ? "Điểm đặt"
                        : row.type === "board"
                        ? "Bảng quảng cáo"
                        : row.type}
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
                            ? "primary"
                            : row.status === "completed"
                            ? "success"
                            : row.status === "canceled"
                            ? "default"
                            : row.status === "rejected"
                            ? "error"
                            : "default"
                        }
                        variant="outlined"
                        sx={{ borderRadius: "12px" }}
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
