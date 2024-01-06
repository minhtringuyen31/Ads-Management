import { Box, Typography, Button, Divider, Modal } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PropTypes from "prop-types";
import { useState } from "react";
import ReportForm from "../Report/ReportForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",

  boxShadow: 24,
  borderRadius: 10,
};


const LocationInformation = ({ content }) => {
  const [reportModelOpen, setReportModalOpen] = useState(false);

  const handleCloseModal = () => {
    setReportModalOpen(false);
  };
  const handleOpenReportModal = () => {
    setReportModalOpen(true);
  };

  const handleReportBtnOnclick = () => {
    handleOpenReportModal();
  };

  return (
  <Box
    position="relative"
    display="flex"
    flexDirection="column"
    // justifyContent="space-between"
    sx={{ height: "100%" }}
  >
    <img
      src="https://tourscanner.com/blog/wp-content/uploads/2022/06/fun-things-to-do-in-Ho-Chi-Minh-City-Vietnam.jpg"
      width="100%"
      height="225px"
    ></img>
    <Box margin="10px">
      <Typography variant="h6">{content.name}</Typography>
      <Divider />
      <Box display="flex" alignItems="center" marginTop="5px">
        <LocationOnIcon />
        <Typography
          sx={{
            fontSize: "12px",
          }}
        >
          {content.display_name}
        </Typography>
      </Box>
    </Box>
    <Box
      display="flex"
      position="absolute"
      bottom="10px"
      marginX="auto"
      justifyContent="center"
      width="100%"
    >
      <Button
        variant="outlined"
        startIcon={<ReportIcon />}
        color="error"
        sx={{
          fontWeight: "bold",
        }}
        onClick={()=>handleReportBtnOnclick()}
      >
        Báo cáo vi phạm
      </Button>
    </Box>

    <Modal
        open={reportModelOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          display="flex"
          flexDirection="column"
          style={style}
          bgcolor={"white"}
          width="40%"
          height="90%"
          padding={3}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography fontSize={20} fontWeight="bold" color="#475569">
              {/* {item.adsboard_type.label} */}
            </Typography>
            <Typography fontSize={12} color="#70757a">
              {/* {item.location.address} */}
            </Typography>
          </Box>
          <Box>
            <ReportForm  type={"board"}/>
          </Box>
        </Box>
      </Modal>
  </Box>
  );
};

export default LocationInformation;

LocationInformation.propTypes = {
  content: PropTypes.object.isRequired,
};
