import { List, Box, Typography } from "@mui/material";
import ReportItem from "./ReportItem";
import { reports } from "../../mockData";
import axiosClient from "../../axiosConfig/axiosClient";
import { useEffect, useState } from "react";

const ReportList = () => {
  const [reportIds, setReporIds] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem("reports")) || [];
    setReporIds(savedReports);
  }, []);

  useEffect(() => {
    const fetchReportData = async (reportId) => {
      try {
        const response = await axiosClient(`report/${reportId}`);
        if (response.status == 200) {
          setReports((prevReports) => [...prevReports, response.data.data]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchReports = async () => {
      for (const reportId of reportIds) {
        fetchReportData(reportId);
      }
    };

    fetchReports();
  }, [reportIds]);

  console.log("Report List: ",reports)
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box height="50px" display="flex" alignItems="center" paddingLeft="20px">
        <Typography color="#70757a" fontSize="14px">
          {reports.length} bài báo cáo
        </Typography>
      </Box>
      <Box height="100%">
        {/* <Box bgcolor="#f1f5f9" height="100%"> */}
        <List>
          {reports.map((item) => (
            <ReportItem key={item._id} item={item} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ReportList;
