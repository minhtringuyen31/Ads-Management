import { Box, Typography, Button, Modal } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import React, { useState } from "react";
import ReportForm from "../Report/ReportForm";

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

const imageUrl =
  "https://tourscanner.com/blog/wp-content/uploads/2022/06/fun-things-to-do-in-Ho-Chi-Minh-City-Vietnam.jpg";
const AdsItem = () => {
  const [currentItemId, setCurrentItemId] = useState();
  const [adsDetailModalOpen, setAdsDetailModalOpen] = useState(false);
  const [reportModelOpen, setReportModalOpen] = useState(false);
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

  return (
    <div>
      <Box margin="10px" padding="25px" borderRadius="20px" style={boxStyle}>
        <Box>
          <Typography fontSize="18px" fontWeight="bold">
            Trụ, cụm pano
          </Typography>
        </Box>
        <Box marginY="5px">
          <Typography fontSize="16px" color="#70757a">
            Đồng Khởi - Nguyễn Du (Sở Văn hóa và Thể thao), Phường Bến Nghé,
            Quận 1
          </Typography>
        </Box>
        <Box marginY="5px">
          <Typography style={{ marginRight: "8px" }}>
            Kích thước: 2.5m x 1.2m
          </Typography>
          <Box display="flex" flexDirection="row">
            <Typography style={{ marginRight: "8px" }}>Số lượng:</Typography>
            <Typography fontWeight="bold"> 1 trụ/bảng</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography style={{ marginRight: "8px" }}>Hình thức: </Typography>
            <Typography fontWeight="bold">Cổ động chính trị</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography style={{ marginRight: "8px" }}>Phân loại:</Typography>
            <Typography fontWeight="bold" display="inline">
              Đất công/Công viên/Hành lang an toàn giao thông
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
            onClick={handleAdsItemOnClick}
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
            onClick={handleReportBtnOnclick}
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
              srcSet={`${imageUrl}?w=20&h=20&fit=crop&auto=format&dpr=2 2x`}
              src={`${imageUrl}?w=20&h=20&fit=crop&auto=format`}
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
                Trụ, cụm pano
              </Typography>
            </Box>
            <Box marginY="5px">
              <Typography fontSize="16px" color="#70757a">
                Đồng Khởi - Nguyễn Du (Sở Văn hóa và Thể thao), Phường Bến Nghé,
                Quận 1
              </Typography>
            </Box>
            <Box marginY="5px">
              <Typography style={{ marginRight: "8px" }}>
                Kích thước: 2.5m x 1.2m
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
                <Typography fontWeight="bold">Cổ động chính trị</Typography>
              </Box>
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                <Typography style={{ marginRight: "8px" }}>
                  Phân loại:
                </Typography>
                <Typography fontWeight="bold" display="inline">
                  Đất công/Công viên/Hành lang an toàn giao thông
                </Typography>
              </Box>

              <Box display="flex" flexDirection="row">
                <Typography style={{ marginRight: "8px" }}>
                  Thời hạn hợp đồng:
                </Typography>
                <Typography fontWeight="bold" display="inline">
                  01/01/2023 - 01/01/2025
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
          height="85%"
          padding={3}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography fontSize={20} fontWeight="bold" color="#475569">
              Trụ, cụm pano
            </Typography>
            <Typography fontSize={12} color="#70757a">
              Đồng Khởi - Nguyễn Du (Sở Văn hóa và Thể thao), Phường Bến Nghé,
              Quận 1
            </Typography>
          </Box>
          <Box>
            <ReportForm />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AdsItem;
