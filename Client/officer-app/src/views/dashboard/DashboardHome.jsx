import React from "react";
import { useState, useEffect } from "react";
import TotalRevene from "./TotalRevenue";
import TotalBooking from "./TotalBooking";
import TotalCustomer from "./TotalCustomer";

import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";

// material-ui
import { Grid, Typography, Stack, Button, Box } from "@mui/material";
import MonthlyBarChart from "./MonthlyBarChart";
import TotalRevenue from "./TotalRevenue";

const DashboardHome = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const [slot, setSlot] = useState("week");
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} lg={8}>
        <MonthlyBarChart isLoading={isLoading} />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={12} md={6} sm={6} xs={12}>
            <TotalRevenue isLoading={isLoading} />
          </Grid>
          <Grid item lg={12} md={6} sm={6} xs={12}>
            <TotalBooking isLoading={isLoading} />
          </Grid>
          <Grid item lg={12} md={6} sm={6} xs={12}>
            <TotalCustomer isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardHome;
