import React from "react";
import { useState, useEffect } from "react";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";

// material-ui
import { Grid, Typography, Stack, Button, Box } from "@mui/material";
import PriceCard from "./PriceCard";

const data = [
  {
    _id: "1",
    vehicleType: "MotorBike",
    baseFare: "2500",
    distanceFare: "11000",
  },
  {
    _id: "2",
    vehicleType: "Car 4 Seats",
    baseFare: "3000",
    distanceFare: "29000",
  },
  {
    _id: "3",
    vehicleType: "Car 7 Seats",
    baseFare: "3000",
    distanceFare: "34000",
  },
];

const UnitPrice = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <MainCard title="Unit Price Management">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            {data.map((price) => {
              return (
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <PriceCard data={price} isLoading={isLoading} />
                </Grid>
              );
            })}
            <Grid item lg={4} md={6} sm={6} xs={12}>
              {/* <TotalOrderLineChartCard isLoading={isLoading} /> */}
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  {/* <TotalIncomeDarkCard isLoading={isLoading} /> */}
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  {/* <TotalIncomeLightCard isLoading={isLoading} /> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
            </Grid>
            <Grid item xs={12} md={4}>
              {/* <PopularCard isLoading={isLoading} /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default UnitPrice;
