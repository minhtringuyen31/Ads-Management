import { Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import noticeImage from "../../assets/notice-image.png";
import { useState } from "react";
import NoticeDetailModal from "../Modal/NoticeDetailModal";

const NotificationItem = () => {
  const [isNoticeDetailModal, setNoticeDetailModal] = useState(false);

  const handleNoticeItemClicked = () => {
    console.log("Open Notice Modal");
    setNoticeDetailModal(!isNoticeDetailModal);
  };

  const handleCloseModal = () => {
    setNoticeDetailModal(false);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        paddingY={2}
        sx={{
          "&:hover": {
            color: "gray",
            backgroundColor: "lightblue",
          },
          cursor: "pointer",
        }}
        onClick={() => handleNoticeItemClicked()}
      >
        <Box
          width="20%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img src={noticeImage} width="50%" height="70%" />
        </Box>
        <Box width="80%">
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography
              fontSize="16px"
              fontWeight={550}
              color="#4b5563"
              marginRight={1}
            >
              Báo cáo đã được xử lý
            </Typography>
            <CheckCircleOutlineIcon color="success" />
          </Box>
          <Typography fontSize="14px" color="#94a3b8">
            Phường 13, Quận Bình Thạnh, TP Hồ Chí Minh
          </Typography>
          <Typography marginTop={1} fontSize="10px" color="#94a3b8">
            2 phút trước
          </Typography>
        </Box>
      </Box>
      <NoticeDetailModal
        reportId={""}
        isModalOpen={isNoticeDetailModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default NotificationItem;
