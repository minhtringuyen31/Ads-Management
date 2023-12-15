import { useState } from "react";
import React from "react";
import { Modal, Box, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",

  boxShadow: 24,
  borderRadius: 10,
};

const ReportModal = ({ content, openReportModal, closeModal, isModalOpen }) => {
  const [reportModelOpen, setReportModalOpen] = useState(isModalOpen);

  return (
    <Modal
      open={reportModelOpen}
      onClose={closeModal}
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
            Trụ, cụm pano
          </Typography>
          <Typography fontSize={12} color="#70757a">
            Đồng Khởi - Nguyễn Du (Sở Văn hóa và Thể thao), Phường Bến Nghé,
            Quận 1
          </Typography>
        </Box>
        <Box>{/* <ReportForm /> */}</Box>
      </Box>
    </Modal>
  );
};

export default ReportModal;
