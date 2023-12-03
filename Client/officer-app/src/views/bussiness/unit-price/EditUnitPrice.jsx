import React from "react";
import { useState, useEffect, useRef } from "react";
import axiosClient from "axiosConfig/axiosClient";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { Formik } from "formik";
import MainCard from "ui-component/cards/MainCard";
import { Grid, Typography, Button, InputAdornment } from "@mui/material";
import { gridSpacing } from "store/constant";
import AnimateButton from "ui-component/extended/AnimateButton";

const EditUnitPrice = () => {
  const location = useLocation();
  const unitPrice = location.state.data;
  const formikRef = useRef();
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    const postBody = {
      _id: unitPrice._id,
      vehicleType: unitPrice.vehicleType,
      baseFare: values.baseFare,
      distanceFare: values.distanceFare,
    };
    try {
      const response = await axiosClient.post(
        "/unit_prices",
        JSON.stringify(postBody)
      );
      console.log("Update Reponse: ", response.data);
      if (response.data.status === 200) {
        navigate("/bussiness/unit_price");
      }
    } catch (error) {
      console.log("Error Update Unit Price: ", error);
    }
  };
  return (
    <MainCard title="Edit Unit Price">
      <Grid item lg={11}>
        <Typography align="left" variant="h4">
          About
        </Typography>
        <Typography
          align="left"
          variant="h1"
          sx={{ fontWeight: "bold", mb: "20px" }}
        >
          {unitPrice.vehicleType} Unit Price
        </Typography>
      </Grid>
      <Box>
        <Formik
          innerRef={formikRef}
          onSubmit={handleFormSubmit}
          initialValues={unitPrice}
          //   validationSchema={bookingSchema}
        >
          {({
            touched,
            values,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={gridSpacing} lg={12}>
                <Grid item lg={5}>
                  <TextField
                    label="Base Fare"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.baseFare}
                    name="baseFare"
                    error={
                      Boolean(touched.baseFare) && Boolean(errors.baseFare)
                    }
                    helperText={touched.baseFare && errors.baseFare}
                    fullWidth
                    sx={{
                      mb: "20px",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">VND</InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    label="Distance Fare"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.distanceFare}
                    name="distanceFare"
                    error={
                      Boolean(touched.distanceFare) &&
                      Boolean(errors.distanceFare)
                    }
                    helperText={touched.distanceFare && errors.distanceFare}
                    fullWidth
                    sx={{
                      mb: "5px",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">VND</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container lg={12}>
                <Grid item lg={4}>
                  <AnimateButton
                    sx={{
                      display: "flex",
                      justifyContent: "center", // Căn giữa theo chiều ngang
                    }}
                  >
                    <Button
                      disableElevation
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      sx={{
                        mt: "10px",
                        width: "200px",
                      }}
                    >
                      Submit Change
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </MainCard>
  );
};

export default EditUnitPrice;
