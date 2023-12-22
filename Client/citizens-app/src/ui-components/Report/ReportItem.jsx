import {
  Box,
  Divider,
  Typography,
  Avatar,
  Button,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useEffect } from "react";

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

const ReportItem = () => {
  return (
    <Box
      margin="10px"
      bgcolor="white"
      padding="25px"
      borderRadius="20px"
      style={boxStyle}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column">
          <Typography fontSize="16px" fontWeight="bold">
            Trại Heo Ala
          </Typography>
          <Typography fontSize="14px" color="#70757a" marginY="2px">
            Tổ 1, Ấp 2, Lâm San, Cẩm Mỹ, Đồng Nai
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
            >
              CHI TIẾT ĐỊA ĐIỂM
            </Button>
          </Box>
        </Box>
        <Box>
          <Avatar src="/assets/tieu.jpg" sx={{ width: 60, height: 60 }} />
        </Box>
      </Box>
      <Divider />
      <Box display="flex" flexDirection="column" marginTop="10px">
        <Box display="flex" flexDirection=" row" alignItems="center">
          <Avatar width sx={{ bgcolor: "#bfdbfe" }}>
            A
          </Avatar>
          <Box flex="flex" flexDirection="column" marginLeft="10px">
            <Typography>Nguyễn Võ Minh Trí</Typography>
            <Typography fontSize={12} color="#70757a">
              5 ngày trước
            </Typography>
          </Box>
        </Box>
        <Box marginTop="10px">
          <Typography>
            Cơ sở đưa các thông tin sai sự thật về hình thức kinh doanh.
          </Typography>
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
  );
};

export default ReportItem;
