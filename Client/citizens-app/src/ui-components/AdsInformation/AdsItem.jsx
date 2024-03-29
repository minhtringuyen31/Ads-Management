import { Box, Typography, Button, Modal } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import { useState } from "react";
import ReportForm from "../Report/ReportForm";
import PropTypes from "prop-types";

const boxStyle = {
  margin: "10px",
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid",
  borderColor: "#cbd5e1",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",

  boxShadow: 24,
  borderRadius: 10,
};

const AdsItem = ({ item }) => {
  /**
   * useState
   */
  const [adsDetailModalOpen, setAdsDetailModalOpen] = useState(false);
  const [reportModelOpen, setReportModalOpen] = useState(false);

  /**
   * @returns {void}
   */
  const handleOpenDetailModal = () => {
    setReportModalOpen(false);
    setAdsDetailModalOpen(true);
  };
  const handleCloseModal = () => {
    setAdsDetailModalOpen(false);
    setReportModalOpen(false);
  };
  const handleOpenReportModal = () => {
    setAdsDetailModalOpen(false);
    setReportModalOpen(true);
  };
  const handleAdsItemOnClick = () => {
    handleOpenDetailModal();
  };
  const handleReportBtnOnclick = () => {
    handleOpenReportModal();
  };

  const formatDateRange = (startDateISO, endDateISO) => {
    const startDate = new Date(startDateISO);
    const endDate = new Date(endDateISO);

    const options = { day: "2-digit", month: "2-digit", year: "numeric" };

    const formattedStartDate = startDate.toLocaleDateString("en-GB", options);
    const formattedEndDate = endDate.toLocaleDateString("en-GB", options);

    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  return (
    <div>
      <Box margin="10px" padding="25px" borderRadius="20px" style={boxStyle}>
        <Box>
          <Typography fontSize="18px" fontWeight="bold">
            {item.adsboard_type.label}
          </Typography>
        </Box>
        <Box marginY="5px">
          <Typography fontSize="16px" color="#70757a">
            {item.location.address}
          </Typography>
        </Box>
        <Box marginY="5px">
          <Typography style={{ marginRight: "8px" }}>
            Kích thước: {item.width}m x {item.height}m
          </Typography>
          <Box display="flex" flexDirection="row">
            <Typography style={{ marginRight: "8px" }}>Số lượng:</Typography>
            <Typography fontWeight="bold"> 1 trụ/bảng</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography style={{ marginRight: "8px" }}>Hình thức: </Typography>
            <Typography fontWeight="bold">
              {item.location.ads_type.label}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography style={{ marginRight: "8px" }}>Phân loại:</Typography>
            <Typography fontWeight="bold" display="inline">
              {item.location.location_type.label}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          bottom="10px"
          marginX="auto"
          justifyContent="space-between"
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
            onClick={() => handleAdsItemOnClick()}
          >
            Chi tiết
          </Button>
          <Button
            variant="outlined"
            startIcon={<ReportIcon />}
            color="error"
            size="small"
            sx={{
              fontWeight: "bold",
            }}
            onClick={() => handleReportBtnOnclick(item.id)}
          >
            Báo cáo vi phạm
          </Button>
        </Box>
      </Box>

      <Modal
        open={adsDetailModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          display="flex"
          flexDirection="row"
          style={style}
          bgcolor={"white"}
          width="60%"
          height="50%"
        >
          <Box width="50%">
            <img
              srcSet={`${item.image[0]}?w=20&h=20&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.image[0]}?w=20&h=20&fit=crop&auto=format`}
              alt="ads-detail-image"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width="50%"
            padding={2}
            justifyContent="center"
          >
            <Box>
              <Typography fontSize="18px" fontWeight="bold">
                {item.adsboard_type.label}
              </Typography>
            </Box>
            <Box marginY="5px">
              <Typography fontSize="16px" color="#70757a">
                {item.location.address}
              </Typography>
            </Box>
            <Box marginY="5px">
              <Typography style={{ marginRight: "8px" }}>
                Kích thước: {item.width}m x {item.height}m
              </Typography>
              <Box display="flex" flexDirection="row">
                <Typography style={{ marginRight: "8px" }}>
                  Số lượng:
                </Typography>
                <Typography fontWeight="bold"> 1 trụ/bảng</Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <Typography style={{ marginRight: "8px" }}>
                  Hình thức:{" "}
                </Typography>
                <Typography fontWeight="bold">
                  {" "}
                  {item.location.ads_type.label}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                <Typography style={{ marginRight: "8px" }}>
                  Phân loại:
                </Typography>
                <Typography fontWeight="bold" display="inline">
                  {item.location.location_type.label}
                </Typography>
              </Box>

              <Box display="flex" flexDirection="row">
                <Typography style={{ marginRight: "8px" }}>
                  Thời hạn hợp đồng:
                </Typography>
                <Typography fontWeight="bold" display="inline">
                  {formatDateRange(
                    item.contract_start_date,
                    item.contract_end_date,
                  )}
                </Typography>
              </Box>

              <Box
                display="flex"
                bottom="10px"
                marginX="auto"
                justifyContent="end"
                width="100%"
                marginTop={2}
              >
                <Button
                  variant="outlined"
                  startIcon={<ReportIcon />}
                  color="error"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Báo cáo vi phạm
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>

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
              {item.adsboard_type.label}
            </Typography>
            <Typography fontSize={12} color="#70757a">
              {item.location.address}
            </Typography>
          </Box>
          <Box>
            <ReportForm
              agent={item._id}
              type={"board"}
              handleCloseModal={handleCloseModal}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AdsItem;

AdsItem.propTypes = {
  item: PropTypes.object.isRequired,
};
