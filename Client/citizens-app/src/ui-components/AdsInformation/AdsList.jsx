import { List, Box, Typography } from "@mui/material";
import AdsItem from "./AdsItem";
import { items } from "../../mockData";

const AdsList = () => {
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box
        height="50px"
        display="flex"
        alignItems="center"
        margin="15px 15px 0px 15px"
      >
        <Typography color="#70757a" fontSize="14px">
          3 bài đánh giá
        </Typography>
      </Box>
      <Box bgcolor="white" height="100%">
        <List>
          {items.map((item) => (
            <AdsItem key={item.id} item={item} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default AdsList;
