import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import MainCard from "ui-component/cards/MainCard";

const ReportResolution = () => {
  const location = useLocation();
  const { state: report } = location;
  const item = report;
  console.log("Report: ", item);
  return (
    <MainCard title="Chi tiết báo cáo">
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" boxShadow={2} padding={2}>
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
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          boxShadow={2}
          padding={2}
          marginTop="15px"
        >
          <Box display="flex" flexDirection=" row" alignItems="center">
            <Avatar width sx={{ bgcolor: "#bfdbfe" }}>
              A
            </Avatar>
            <Box flex="flex" flexDirection="column" marginLeft="10px">
              <Typography>{item.username}</Typography>
              <Typography fontSize={12} color="#70757a">
                5 ngày trước
                {/* {<TimeAgo timestamp={item.createdAt} />} */}
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
      </Box>
    </MainCard>
  );
};

export default ReportResolution;
