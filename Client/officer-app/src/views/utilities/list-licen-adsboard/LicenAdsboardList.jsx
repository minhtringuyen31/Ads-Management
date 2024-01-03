import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of items per page

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
        const respone = await axios.get(
          "http://14.225.192.121/authorizeRequests"
        );
        const dataWithId = respone.data.data.map((item, index) => ({
          ...item,
          id: index + 1,
          contract_start_date: formatDate(
            item.new_ads_board.contract_start_date
          ),

          contract_end_date: formatDate(item.new_ads_board.contract_end_date),
        }));
        setLicenList(dataWithId);
      } catch (error) {
        console.error("Error fetching licen list: ", error);
      }
    };
    fetchData();
  }, []);

  console.log("Licen list: ", licenList);

  const pageCount = Math.ceil(licenList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = licenList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (event, value) => {
    setCurrentPage(value);
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
                <TableCell sx={{ fontWeight: "bold", width: "5%" }}>
                  STT
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                  Điểm đặt
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                  Công ty
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
                <TableCell sx={{ width: "12.5%" }}></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentItems.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    {row.new_ads_board.location.display_name}
                  </TableCell>
                  <TableCell>{row.new_ads_board.company.name}</TableCell>
                  <TableCell>{row.contract_start_date}</TableCell>
                  <TableCell>{row.contract_end_date}</TableCell>
                  <TableCell>
                    {row.status === "pending"
                      ? "Đang xử lý"
                      : row.status === "completed"
                      ? "Đã được duyệt"
                      : row.status === "canceled"
                      ? "Đã hủy"
                      : row.status}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteOutlineOutlinedIcon />}
                      sx={{
                        fontWeight: "bold",
                      }}
                      disabled={row.status !== "pending"}
                    >
                      Hủy
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <span />
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={paginate}
            color="primary"
            sx={{ padding: theme.spacing(2) }}
          />
        </Box>
      </Scrollbar>
    </MainCard>
  );
};

export default LicenAdsboardList;
