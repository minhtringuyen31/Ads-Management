import React from "react";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Field, useFormik, FormikProvider } from "formik";
import {
  TextField,
  Button,
  Typography,
  Autocomplete,
  TextareaAutosize,
  IconButton,
  Box
} from "@mui/material";

// STYLE CONTAINER
const ContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "2rem",
  paddingTop: "1.5rem",
  paddingBottom: "1.5rem",
  backgroundColor: "#fff",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: "0.75rem",
};

// STYLE BODY
const FormBodyStyle = {
  width: "70%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
};

const FormBodyItemStyle = {
  width: "100%",
  paddingLeft: "3.5rem",
  paddingRight: "3.5rem",
  paddingBottom: "1.25rem",
  paddingTop: "1.25rem",
  alignItems: "center",
  border: "1px solid gray",
  borderRadius: "0.25rem",
};

const FormBodyItemContentStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};

// STYLE FOOTER
const FormFooterStyle = {
  display: "flex",
  justifyContent: "flex-end",
  width: "70%",
};

const FormRequestEditAdsboard = () => {
    return (
      <>
        <FormikProvider>
          <form style={ContainerStyle} encType="multipart/form-data">
            {/* Begin: HEADER */}
            <Typography>
              <h2>Yêu cầu chỉnh sửa bảng quảng cáo</h2>
            </Typography>
            {/* End: HEADER */}

            {/* Begin: BODY */}
            <Box style={FormBodyStyle}>
              <Box style={FormBodyItemStyle}>
                <Box style={FormBodyItemContentStyle}>
                    <Field component={TextField} label="Địa chỉ"/>
                </Box>
              </Box>
            </Box>
            {/* End: BODY */}
          </form>
        </FormikProvider>
      </>
    );
};
export default FormRequestEditAdsboard;