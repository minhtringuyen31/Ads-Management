import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import MainCard from "ui-component/cards/MainCard";
import { useTheme } from "@mui/material/styles";

import "../styles.scss";

const LocationManagement = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [dataLocation, setDataLocation] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of items per page

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
    return <div>Loading...</div>;
  }

  const pageCount = Math.ceil(dataLocation.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataLocation.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (event, value) => {
    setCurrentPage(value);
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
              {currentItems.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                  hover
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
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={paginate}
            color="primary"
            sx={{ padding: theme.spacing(2) }}
          />
        </Box>
      </MainCard>
    </>
  );
};

export default LocationManagement;
