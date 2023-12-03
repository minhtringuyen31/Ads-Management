import React from "react";
import { Grid } from "@mui/material";
import VehicleCard from "./VehicleCard";
import { faker } from "@faker-js/faker";
import { gridSpacing } from "store/constant";

const vehicleList = () => {
  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={6} lg={8}>
          <VehicleCard
            title="Vehicle Types"
            list={[...Array(5)].map((_, index) => ({
              id: faker.datatype.uuid(),
              title: faker.name.jobTitle(),
              description: faker.name.jobTitle(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default vehicleList;
