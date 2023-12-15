import { List, Box, Typography } from "@mui/material";
import ReportItem from "./ReportItem";
import { reports } from "../../mockData";

const ReportList = () => {
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box height="50px" display="flex" alignItems="center" paddingLeft="20px">
        <Typography color="#70757a" fontSize="14px">
          3 bài đánh giá
        </Typography>
      </Box>
      <Box height="100%">
        {/* <Box bgcolor="#f1f5f9" height="100%"> */}
        <List>
          {reports.map((item) => (
            <ReportItem key={item.id} item={item} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ReportList;
