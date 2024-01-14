import {
  Avatar,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axiosClient from "../../axiosConfig/axiosClient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",

  boxShadow: 24,
  borderRadius: 10,
};
const imageList = [
  {
    img: "https://tourscanner.com/blog/wp-content/uploads/2022/06/fun-things-to-do-in-Ho-Chi-Minh-City-Vietnam.jpg",
  },
  {
    img: "https://tourscanner.com/blog/wp-content/uploads/2022/06/fun-things-to-do-in-Ho-Chi-Minh-City-Vietnam.jpg",
  },
];

const NoticeDetailModal = ({ report, isModalOpen, handleCloseModal }) => {
  console.log("Report: ", report);
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;

    return formattedDate;
  };
  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display="flex"
        flexDirection="column"
        style={style}
        width="30%"
        height="90%"
        alignItems="center"
        padding={3}
        sx={{ backgroundColor: "#f1f5f9" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          marginBottom={1}
          textAlign="center"
        >
          <Typography fontSize={20} fontWeight="bold" color="#475569">
            Sân bay Quốc tế Tân Sơn Nhất
          </Typography>
          <Typography fontSize={12} color="#70757a">
            Sân bay Quốc tế Tân Sơn Nhất, Hẻm 417/23/46 Quang Trung, Phường 10,
            Quận Gò Vấp, Thành phố Hồ Chí Minh, 71409, Việt Nam
          </Typography>
        </Box>
        <Divider sx={{ color: "black" }} />
        <Box
          width="100%"
          height="88%"
          // maxHeight="400px"
          display="flex"
          flexDirection="column"
          //   padding={2}
          marginTop={2}
          borderRadius={2}
          boxShadow={1}
          sx={{
            backgroundColor: "white",
          }}
        >
          <Typography
            marginY={1}
            marginLeft={2}
            fontWeight="bold"
            color="#374151"
          >
            Thông tin báo cáo
          </Typography>
          <Divider />
          <Box
            display="flex"
            flexDirection=" row"
            alignItems="center"
            marginTop={2}
            marginX={2}
          >
            <Avatar width sx={{ bgcolor: "#bfdbfe" }}>
              A
            </Avatar>
            <Box flex="flex" flexDirection="column" marginLeft="10px">
              <Typography>{report.username}</Typography>
            </Box>
          </Box>
          <Box marginTop={1} marginX={2}>
            <Box display="flex" flexDirection="row">
              <Typography fontSize={14} color="#70757a" marginRight={1}>
                Email:{" "}
              </Typography>
              <Typography>{report.email}</Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography fontSize={14} color="#70757a" marginRight={1}>
                Số điện thoại:
              </Typography>
              <Typography>{report.phone_number}</Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography fontSize={14} color="#70757a" marginRight={1}>
                Thời điểm báo cáo:
              </Typography>
              <Typography>{formatDate(report.createdAt)}</Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <Typography fontSize={14} color="#70757a" marginRight={1}>
                Hình thức đánh giá:
              </Typography>
              <Typography>{report.report_form.label}</Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography fontSize={14} color="#70757a" marginRight={1}>
                Nội dung:
              </Typography>
              <Typography
                fontSize={16}
                component="div"
                dangerouslySetInnerHTML={{
                  __html: report.report_content,
                }}
              />
            </Box>
          </Box>
          <Box>
            <ImageList sx={{ width: "100%", height: "200px" }} cols={2}>
              {report.image.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    src={item}
                    alt={item}
                    loading="lazy"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      width: "100%",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <Divider />
          <Typography
            marginY={1}
            marginLeft={2}
            fontWeight="bold"
            color="#374151"
          >
            Thông tin phản hồi
          </Typography>
          <Divider />
          {report.status === "completed" ? (
            <>
              <Box
                display="flex"
                flexDirection=" row"
                alignItems="center"
                marginTop={2}
                marginX={2}
              >
                <Avatar width sx={{ bgcolor: "#bfdbfe" }}>
                  A
                </Avatar>
                <Box flex="flex" flexDirection="column" marginLeft="10px">
                  <Typography>{report.operation.user.fullname}</Typography>
                </Box>
              </Box>
              <Box marginTop={1} marginX={2}>
                <Box display="flex" flexDirection="row">
                  <Typography fontSize={14} color="#70757a" marginRight={1}>
                    Chức vụ:{" "}
                  </Typography>
                  <Typography>
                    {report.operation.user.userRole === "ward_officer"
                      ? "Cán bộ Phường"
                      : "Cán bộ Quận"}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Typography fontSize={14} color="#70757a" marginRight={1}>
                    Thời điểm phản hồi:{" "}
                  </Typography>
                  <Typography>{formatDate(report.updatedAt)}</Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography fontSize={14} color="#70757a" marginRight={1}>
                    Nội dung:{" "}
                  </Typography>
                  <Typography
                    fontSize={16}
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: report.operation.content,
                    }}
                  />
                </Box>
              </Box>
            </>
          ) : (
            <Box margin={2}>Báo cáo chưa được xử lý</Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default NoticeDetailModal;

NoticeDetailModal.propTypes = {
  report: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};
