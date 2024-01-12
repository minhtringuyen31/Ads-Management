import React from "react";
import { useState, useEffect } from "react";
import TotalReport from "./TotalReport";
import ApprovedReport from "./ApprovedReport";
import NotYetApprovedReport from "./NotYetApprovedReport";

import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";

// material-ui
import {
  Grid,
  Typography,
  Stack,
  Button,
  Box,
  Table,
  TableHead,
  useTheme,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import BarChart from "./BarChart";
import axios from "axios";
import instance from "axiosConfig/axios-config";

const ReportStatistic = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [totalReport, setTotalReport] = useState(0);
  const [totalApprovedReport, setTotalApprovedrReport] = useState(0);
  const [approvedCountArray, setApprovedCountArray] = useState([]);
  const [pendingCountArray, setPendingCountArray] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.get("/reports");
        console.log("Report List: ", response.data);
        setReports(response.data.data);
        setTotalReport(response.data.data.length);

        const filteredArr = response.data.data.filter(
          (item) => item.operation !== undefined && item.operation !== null,
        );
        setTotalApprovedrReport(filteredArr.length);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const allDistricts = [
      "Quận 1",
      "Quận 2",
      "Quận 3",
      "Quận 4",
      "Quận 5",
      "Quận 6",
      "Quận 7",
      "Quận 8",
      "Quận 9",
      "Quận 10",
      "Quận Bình Thạnh",
      "Quận Tân Bình",
    ];
    const districtStatusCounts = {};
    allDistricts.forEach((district) => {
      districtStatusCounts[district] = { processed: 0, pending: 0 };
    });
    reports.forEach((item) => {
      const districtLabel = item.district.label;

      if (districtStatusCounts[districtLabel] !== undefined) {
        if (item.operation !== undefined && item.operation !== null) {
          districtStatusCounts[districtLabel].processed++;
        } else {
          districtStatusCounts[districtLabel].pending++;
        }
      }
    });
    const resultArray = Object.keys(districtStatusCounts).map(
      (districtLabel) => ({
        district: districtLabel,
        processed: districtStatusCounts[districtLabel].processed,
        pending: districtStatusCounts[districtLabel].pending,
      }),
    );
    console.log(resultArray);

    const processedCountsArray = resultArray.map((item) => item.processed);
    const pendingCountsArray = resultArray.map((item) => item.pending);

    console.log("Approved Report Count Array:", processedCountsArray);
    console.log("Pending Report Count Array:", pendingCountsArray);
    setApprovedCountArray(processedCountsArray);
    setPendingCountArray(pendingCountsArray);
  }, [reports]);

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} lg={8}>
          <BarChart
            isLoading={isLoading}
            approvedCountArray={approvedCountArray}
            pendingCountsArray={pendingCountArray}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={12} md={6} sm={6} xs={12}>
              <TotalReport isLoading={isLoading} value={totalReport} />
            </Grid>
            <Grid item lg={12} md={6} sm={6} xs={12}>
              <ApprovedReport
                isLoading={isLoading}
                value={totalApprovedReport}
              />
            </Grid>
            <Grid item lg={12} md={6} sm={6} xs={12}>
              <NotYetApprovedReport
                isLoading={isLoading}
                value={totalReport - totalApprovedReport}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box marginTop={2}>
        <MainCard title="Danh sách báo cáo">
          <Box className="data-grid-container">
            <Table>
              <TableHead
                sx={{
                  backgroundColor: theme.palette.primary.light,
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    STT
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Người báo cáo
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Số điện thoại
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Đối tượng báo cáo
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Loại báo cáo
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Khu vực
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Phường
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Tình trạng
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {accounts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((account, index) => (
                    <TableRow
                      key={account._id}
                      onClick={() => handleRowAccountClicked(account)}
                      hover
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{account.fullname}</TableCell>
                      <TableCell>{account.email}</TableCell>
                      <TableCell>{account.phone}</TableCell>
                      <TableCell>{}</TableCell>
                      <TableCell>
                        {renderOfficerRole(account.userRole)}
                      </TableCell>
                      <TableCell>{renderAssignedArea(account)}</TableCell>
                    </TableRow>
                  ))} */}
                {reports.map((item, index) => (
                  <TableRow
                    key={item._id}
                    // onClick={() => handleRowReportClicked(item)}
                    hover
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.fullname}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </MainCard>
      </Box>
    </>
  );
};

export default ReportStatistic;
