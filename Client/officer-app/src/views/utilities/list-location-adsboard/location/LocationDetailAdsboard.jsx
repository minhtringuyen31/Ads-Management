import { Box, Typography, Button } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import { useState } from "react";
import ModalTest from "../ModalDetailAdsboard";

const boxContainerStyle = {
  // backgroundColor: "yellow",
  display: "flex",
  justifyContent: "space-around",
  borderColor: "aqua",
};

const boxStyle = {
  margin: "10px",
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid",
  borderColor: "#cbd5e1",
  backgroundColor: "#fff",
  width: "50%",
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

const LocationDetailAdsboard = ({ listAdsboard }) => {
  const [adsDetailModalOpen, setAdsDetailModalOpen] = useState(false);
  const [selectedAdboard, setSelectedAdboard] = useState(null);

  const handleOpenDetailModal = (adboard) => {
    const adboardCopy = { ...adboard };
    adboardCopy.contract_start_date = formatDate(adboard.contract_start_date);
    adboardCopy.contract_end_date = formatDate(adboard.contract_end_date);
    setSelectedAdboard(adboardCopy); // Set the details of the clicked adboard
    setAdsDetailModalOpen(true);
  };
  const handleCloseModal = () => {
    setAdsDetailModalOpen(false);
  };

  return (
    <div style={boxContainerStyle}>
      {listAdsboard.map((row) => (
        <Box margin="10px" padding="25px" borderRadius="20px" style={boxStyle}>
          <Box>
            <Typography fontSize="18px" fontWeight="bold">
              {row.adsboard_type.label}
            </Typography>
          </Box>
          <Box marginY="5px">
            <Typography fontSize="16px" color="#70757a">
              {row.location.address}
            </Typography>
          </Box>
          <Box marginY="5px">
            <Typography style={{ marginRight: "8px" }}>
              Kích thước: {row.width}m x {row.height}m
            </Typography>
            <Box display="flex" flexDirection="row">
              <Typography style={{ marginRight: "8px" }}>Số lượng:</Typography>
              <Typography fontWeight="bold"> 1 trụ/bảng</Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography style={{ marginRight: "8px" }}>
                Hình thức:{" "}
              </Typography>
              <Typography fontWeight="bold">
                {row.location.ads_type.label}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography style={{ marginRight: "8px" }}>Phân loại:</Typography>
              <Typography fontWeight="bold" display="inline">
                {row.location.location_type.label}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            // flexDirection="row"
            bottom="10px"
            marginX="auto"
            justifyContent="flex-start"
            width="100%"
            marginTop={2}
          >
            <Button
              variant="outlined"
              startIcon={<ReportIcon />}
              color="primary"
              size="small"
              sx={{
                fontWeight: "bold",
              }}
              onClick={() => handleOpenDetailModal(row)}
            >
              Chi tiết
            </Button>
          </Box>
        </Box>
      ))}

      <ModalTest
        open={adsDetailModalOpen}
        handleClose={handleCloseModal}
        adDetail={selectedAdboard}
      />
    </div>
  );
};

export default LocationDetailAdsboard;
