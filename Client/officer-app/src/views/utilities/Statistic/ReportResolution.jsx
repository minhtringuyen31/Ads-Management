import {
  Avatar,
  Box,
  Chip,
  Divider,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";

import React from "react";
import { useLocation } from "react-router";
import MainCard from "ui-component/cards/MainCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CropLandscapeIcon from "@mui/icons-material/CropLandscape";

const ReportResolution = () => {
  const location = useLocation();
  const { state: report } = location;
  const item = report;
  console.log("Report: ", item);

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
    <MainCard title="Chi tiết báo cáo">
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          flexDirection="row"
          boxShadow={2}
          padding={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" flexDirection="column">
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

          {item.type === "board" ? (
            <Chip
              variant="filled"
              color="primary"
              icon={<CropLandscapeIcon />}
              label="Bảng QC"
              sx={{
                fontWeight: "bold",
              }}
            />
          ) : (
            <Chip
              variant="filled"
              color="error"
              icon={<LocationOnIcon />}
              label="Địa điểm"
              sx={{
                fontWeight: "bold",
              }}
            />
          )}
        </Box>
        <Box display="flex" flexDirection="row">
          <Box
            display="flex"
            flexDirection="column"
            boxShadow={2}
            padding={2}
            marginTop="10px"
            width="50%"
          >
            <Typography fontSize={16} fontWeight="bold" color="#374151">
              Thông tin báo cáo
            </Typography>
            <Box marginY={2}>
              <Divider />
            </Box>
            <Box display="flex" flexDirection=" row" alignItems="center">
              <Avatar width sx={{ bgcolor: "#bfdbfe" }}>
                A
              </Avatar>
              <Box flex="flex" flexDirection="column" marginLeft="10px">
                <Typography fontSize={16} fontWeight="bold">
                  {item.username}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box marginX={5} marginY={1}>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography fontSize={14} color="#70757a" marginRight={1}>
                    Email:{" "}
                  </Typography>
                  <Typography fontSize={16}>{item.email}</Typography>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography fontSize={14} color="#70757a" marginRight={1}>
                    Số điện thoại:{" "}
                  </Typography>
                  <Typography fontSize={16}>{item.phone_number}</Typography>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography fontSize={14} color="#70757a" marginRight={1}>
                    Thời điểm báo cáo:{" "}
                  </Typography>
                  <Typography fontSize={16}>
                    {formatDate(item.createdAt)}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography fontSize={14} color="#70757a" marginRight={1}>
                    Hình thức báo cáo:{" "}
                  </Typography>
                  <Typography fontSize={16}>
                    {item.report_form.label}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography fontSize={14} color="#70757a" marginRight={1}>
                    Nội dung:{" "}
                  </Typography>
                  <Typography
                    fontSize={16}
                    component="div"
                    dangerouslySetInnerHTML={{ __html: item.report_content }}
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <ImageList sx={{ width: "100%", height: "auto" }} cols={2}>
                {item.image.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={image}
                      alt={image}
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
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            boxShadow={2}
            padding={2}
            marginTop="10px"
            width="50%"
          >
            <Typography fontSize={16} fontWeight="bold" color="#374151">
              Thông tin phản hồi
            </Typography>
            <Box marginY={2}>
              <Divider />
            </Box>
            {item.status === "completed" && (
              <>
                <Box display="flex" flexDirection=" row" alignItems="center">
                  <Avatar width sx={{ bgcolor: "#bfdbfe" }}>
                    A
                  </Avatar>
                  <Box flex="flex" flexDirection="column" marginLeft="10px">
                    <Typography fontSize={16} fontWeight="bold">
                      {item.operation.user.fullname}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Box marginX={5} marginY={1}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Typography fontSize={14} color="#70757a" marginRight={1}>
                        Chức vụ:
                      </Typography>
                      <Typography fontSize={16}>
                        {" "}
                        {item.operation.user.userRole === "ward_officer"
                          ? "Cán bô Phường"
                          : "Cán bộ Quận"}
                      </Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Typography fontSize={14} color="#70757a" marginRight={1}>
                        Thời điểm phản hổi:
                      </Typography>
                      <Typography fontSize={16}>
                        {formatDate(item.updatedAt)}
                      </Typography>
                    </Box>
                    <Box display="flex" flexDirection="column">
                      <Typography fontSize={14} color="#70757a" marginRight={1}>
                        Nội dung
                      </Typography>
                      <Typography
                        fontSize={16}
                        component="div"
                        dangerouslySetInnerHTML={{
                          __html: item.operation.content,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </MainCard>
  );
};

export default ReportResolution;
