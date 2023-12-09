import { useState, useCallback } from "react";

import { Box, Button } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataLocationAds } from "../../data/fakeDataLocation";
import MainCard from "ui-component/cards/MainCard";
import "./styles.scss";
import BoardManagement from "./BoardManagement";
import LocationDetailCard from "./LocationDetailCard";

const LocationManagement = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showBoardManagement, setShowBoardManagement] = useState(false);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.25,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => params.row.coordinate.address,
    },
    {
      field: "ward_name",
      headerName: "Ward",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "location_type",
      headerName: "Location type",
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ads_type",
      headerName: "Ads type",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "is_planned",
      headerName: "Planned status",
      flex: 0.75,
      headerAlign: "center",
      align: "center",
    },
  ];

  const handleRowClick = useCallback((params) => {
    const clickedLocationId = params.row.id;
    // Kiểm tra xem clickedLocationId có tồn tại trong mockDataLocationAds hay không
    const locationExists = mockDataLocationAds.some(
      (location) => location.id === clickedLocationId
    );
    if (locationExists) {
      setSelectedLocation(clickedLocationId);
      setShowBoardManagement(true);
    } else {
      setSelectedLocation(null); // Xử lý trường hợp địa điểm không tồn tại
      setShowBoardManagement(false);
    }
  }, []);

  const handleBackClick = () => {
    setShowBoardManagement(false); // Ẩn BoardManagement khi click "Back"
  };

  return (
    <>
      {!showBoardManagement && (
        <MainCard title="Location Management">
          <Box m="0 0 0 0" height="70vh" className="data-grid-container">
            <DataGrid
              rows={mockDataLocationAds}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              onRowClick={handleRowClick}
            />
          </Box>
        </MainCard>
      )}
      {showBoardManagement && (
        <>
          <LocationDetailCard locationID={selectedLocation} />{" "}
          <BoardManagement locationID={selectedLocation} />
          <Button size="large" onClick={handleBackClick}>
            <KeyboardArrowLeft />
            Back
          </Button>
        </>
      )}
    </>
  );
};

export default LocationManagement;