import { useState, useCallback, useEffect } from "react";
import axios from "axios";
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
} from "@mui/material";

import MainCard from "ui-component/cards/MainCard";
import { useTheme } from "@mui/material/styles";

import "../styles.scss";

const LocationManagement = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [dataLocation, setDataLocation] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://14.225.192.121/locations");
        const dataWithId = response.data.data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setDataLocation(dataWithId);
      } catch (error) {
        console.error("Lỗi khi gọi API list locations:", error);
      }
    }
    fetchData();
  }, []);

  const handleRowClick = useCallback(
    (row) => {
      const clickedLocationId = row._id;
      console.log("Params: ", row);
      if (clickedLocationId != null) {
        localStorage.setItem("locationID", clickedLocationId);
        console.log("Saved locationID:", clickedLocationId);
        navigate(`/utils/customer/${clickedLocationId}`);
      }
      console.log(clickedLocationId);
    },
    [navigate]
  );

  if (!dataLocation) {
    return (
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
    );
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value), 10);
    setPage(0);
  };

  return (
    <>
      <MainCard title="Location Management">
        {/* <Scrollbar> */}
        <Box className="data-grid-container">
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
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Address
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Location type
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Ads type
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Planned status
                </TableCell>
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
          />
        </Box>
      </MainCard>
    </>
  );
};

export default LocationManagement;
