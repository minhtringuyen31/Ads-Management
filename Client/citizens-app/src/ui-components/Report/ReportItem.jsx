import {
  Box,
  Divider,
  Typography,
  Avatar,
  Button,
  ImageList,
  ImageListItem,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ReportOffRounded } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import { formatDistanceToNow } from "date-fns";
import OIP from "../../assets/OIP.jpg";
import NoticeDetailModal from "../Modal/NoticeDetailModal";

const imageList = [
  {
    img: "https://tourscanner.com/blog/wp-content/uploads/2022/06/fun-things-to-do-in-Ho-Chi-Minh-City-Vietnam.jpg",
  },
  {
    img: "https://tourscanner.com/blog/wp-content/uploads/2022/06/fun-things-to-do-in-Ho-Chi-Minh-City-Vietnam.jpg",
  },
];

const boxStyle = {
  margin: "10px",
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid",
  borderColor: "#cbd5e1",
};

const TimeAgo = ({ timestamp }) => {
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  return <span>{timeAgo}</span>;
};
const ReportItem = ({ item }) => {
  const [isReportDetailModal, setReportDetailModal] = useState(false);

  const handleReportItemClicked = () => {
    console.log("Open Notice Modal");
    setReportDetailModal(!isReportDetailModal);
  };

  const handleCloseModal = () => {
    setReportDetailModal(false);
  };

  return (
    <>
      <Box
        margin="10px"
        bgcolor="white"
        padding="25px"
        borderRadius="20px"
        boxShadow={1}
        style={boxStyle}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="column">
            <Box width="80%" marginBottom={1}>
              {item.status === "pending" ? (
                <Chip
                  icon={<PendingIcon />}
                  label="Báo cáo đang chờ xử lý"
                  color="secondary"
                />
              ) : (
                <Chip
                  icon={<CheckCircleIcon />}
                  label="Báo cáo đã được xử lý"
                  color="success"
                />
              )}
            </Box>
            <Typography fontSize="16px" fontWeight="bold">
              {item.type === "board"
                ? item.board.adsboard_type.label
                : item.random.name}
            </Typography>
            <Typography fontSize="14px" color="#70757a" marginY="2px">
              {item.type === "board"
                ? item.board.location.address
                : item.random.display_name}
            </Typography>

            <Box marginBottom="10px">
              <Button
                variant="text"
                color="primary"
                sx={{
                  fontSize: "13px",
                  fontWeight: "Bold",
                  padding: "0px",
                }}
                onClick={() => handleReportItemClicked()}
              >
                CHI TIẾT
              </Button>
            </Box>
          </Box>
          <Box>
            <Avatar
              src={item.type === "board" ? item.board.image : OIP}
              sx={{ width: 60, height: 60 }}
            />
          </Box>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" marginTop="10px">
          <Box display="flex" flexDirection=" row" alignItems="center">
            <Avatar width sx={{ bgcolor: "#bfdbfe" }}>
              A
            </Avatar>
            <Box flex="flex" flexDirection="column" marginLeft="10px">
              <Typography>{item.username}</Typography>
              <Typography fontSize={12} color="#70757a">
                5 ngày trước {<TimeAgo timestamp={item.createdAt} />}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" marginTop="10px">
            <Typography fontSize={14} color="#70757a" marginRight={1}>
              Hình thức báo cáo:
            </Typography>
            <Typography fontSize={14}>{item.report_form.label}</Typography>
          </Box>
          <Box marginTop="5px">
            <Typography fontSize={14} color="#70757a">
              Nội dung:{" "}
            </Typography>
            <Typography
              fontSize={14}
              component="div"
              dangerouslySetInnerHTML={{ __html: item.report_content }}
            />
          </Box>
        </Box>
        <Box marginTop={1}>
          <ImageList sx={{ width: 200, height: 90 }} cols={2}>
            {imageList.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=90&h=90&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=90&h=90&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Box>
      <NoticeDetailModal
        reportId={item._id}
        isModalOpen={isReportDetailModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default ReportItem;

ReportItem.propTypes = {
  item: PropTypes.object.isRequired,
};
