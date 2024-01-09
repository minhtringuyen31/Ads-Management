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
  Box,
  CircularProgress,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
  const adsboard = useLocation();
  const adsboardID = adsboard.state?.adsboardID;
  const [adsboardData, setAdsboardData] = useState({});

  //Check loading
  const [isLoading, setIsLoading] = useState(true);

  //Lấy danh sách adsboard_type
  const [adsboardTypes, setAdsBoardTypes] = useState([]);
  const [selectedAdsboardType, setSelectedAdsboardType] = useState(null);

  //Width, height
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  //StartDate, EndDate
  const [startDate, setStartDate] = useState(dayjs("01/01/2021").toISOString());
  const [endDate, setEndDate] = useState(dayjs("01/01/2021").toISOString());

  //Fetch adsboard_types
  useEffect(() => {
    const fetchAdsboardTypes = async () => {
      try {
        const response = await axios.get("http://14.225.192.121/adsboardtypes");
        if (response.status < 300) {
          setAdsBoardTypes(
            response.data.data.map((type) => ({
              _id: type._id,
              label: type.label,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching adsboard types: ", error);
      }
    };
    fetchAdsboardTypes();
  }, []);

  // Fetch adsboard data
  useEffect(() => {
    const fetchAdsboardData = async () => {
      try {
        const response = await axios.get(
          `http://14.225.192.121/adsboard/${adsboardID}`
        );

        if (response.status < 300) {
          const fetchedAdsboardData = response.data.data;
          setAdsboardData(fetchedAdsboardData);
          setIsLoading(false);

          if (fetchedAdsboardData.adsboard_type) {
            const defaultAdsboardType = adsboardTypes.find(
              (type) => type.label === fetchedAdsboardData.adsboard_type.label
            );
            setSelectedAdsboardType(defaultAdsboardType || "");
          }

          //Set width and height
          setWidth(fetchedAdsboardData.width || 0);
          setHeight(fetchedAdsboardData.height || 0);

          //Set startDate and endDate
          setStartDate(
            dayjs(fetchedAdsboardData.contract_start_date) ||
              dayjs("01/01/2021")
          );
          setEndDate(
            dayjs(fetchedAdsboardData.contract_end_date) || dayjs("01/01/2021")
          );
        }
      } catch (error) {
        console.error("Error fetching adsboard data", error);
      }
    };
    if (adsboardTypes.length > 0) {
      fetchAdsboardData();
    }
  }, [adsboardID, adsboardTypes]);

  const formik = useFormik({
    initialValues: {
      id: adsboardData._id ?? "",
      adsboard_type: adsboardData.adsboard_type ?? "",
      height: adsboardData.height ?? 0,
      width: adsboardData.width ?? 0,
      start_date:
        adsboardData.contract_start_date ?? dayjs("01/01/2021").toISOString(),
      end_date:
        adsboardData.contract_end_date ?? dayjs("01/01/2021").toISOString(),
    },
    onSubmit: async (values, { resetForm }) => {
      values.id = adsboardData._id || "";
      if (values.adsboard_type === "") {
        values.adsboard_type = adsboardData.adsboard_type;
      }
      if (values.height === 0) {
        values.height = adsboardData.height;
      }
      if (values.width === 0) {
        values.width = adsboardData.width;
      }
      if (values.start_date === dayjs("01/01/2021")) {
        values.start_date = dayjs(
          adsboardData.contract_start_date
        ).toISOString();
      }
      if (values.end_date === dayjs("01/01/2021")) {
        values.end_date = adsboardData.contract_end_date;
      }

      console.log("Data submit: ", values);
    },
  });

  return (
    <>
      {isLoading === true ? (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1500,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <FormikProvider value={formik}>
          <form
            style={ContainerStyle}
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
            {/* Begin: HEADER */}
            <Typography>
              <h2>Yêu cầu chỉnh sửa bảng quảng cáo</h2>
            </Typography>
            {/* End: HEADER */}

            {/* Begin: BODY */}
            <Box style={FormBodyStyle}>
              <Box style={FormBodyItemStyle}>
                <Box style={FormBodyItemContentStyle}>
                  <Field
                    component={TextField}
                    label="Địa chỉ"
                    value={adsboardData.location.address ?? ""}
                    name="address"
                  />
                  <Box>
                    <Autocomplete
                      options={adsboardTypes}
                      getOptionLabel={(option) => option.label}
                      onChange={(_event, newValue) => {
                        setSelectedAdsboardType(newValue);
                        formik.setFieldValue("adsboard_type", newValue);
                        console.log("New adsboard_type: ", newValue);
                      }}
                      value={selectedAdsboardType}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label="Loại bảng quảng cáo"
                          variant="outlined"
                          style={{ width: "100%" }}
                        />
                      )}
                    />
                  </Box>

                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      gap: "1rem",
                    }}
                  >
                    <Field
                      component={TextField}
                      name="height"
                      onChange={(e) => {
                        setHeight(e.target.value);
                        formik.setFieldValue("height", e.target.value);
                      }}
                      required
                      // id="adsboardInfo.height"
                      label="Chiều cao"
                      defaultValue=""
                      style={{ width: "50%" }}
                      value={height}
                    />

                    <Field
                      required
                      component={TextField}
                      name="width"
                      onChange={(e) => {
                        setWidth(e.target.value);
                        formik.setFieldValue("width", e.target.value);
                      }}
                      // id="adsboardInfo.width"
                      label="Chiều rộng"
                      defaultValue=""
                      style={{ width: "50%" }}
                      value={width}
                    />
                  </Box>

                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "1rem",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        required
                        label="Bắt đầu hợp đồng"
                        sx={{
                          width: 1 / 2,
                        }}
                        format="DD/MM/YYYY"
                        onChange={(newValue) => {
                          setStartDate(newValue);
                          formik.setFieldValue(
                            "start_date",
                            newValue.toISOString()
                          );
                        }}
                        // id="adsboardInfo.start_date"
                        // onChange={(newValue) => {
                        //   setStartDate(newValue);
                        // }}
                        value={startDate}
                      />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Kết thúc hợp đồng"
                        required
                        sx={{
                          width: 1 / 2,
                        }}
                        format="DD/MM/YYYY"
                        onChange={(newValue) => {
                          setEndDate(newValue);
                          formik.setFieldValue(
                            "end_date",
                            newValue.toISOString()
                          );
                        }}
                        value={endDate}
                        // id="adsboardInfo.end_date"
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* End: BODY */}

            {/* Begin: FOOTER */}
            <Box style={FormFooterStyle}>
              <Button type="submit" size="large" variant="contained">
                Xác nhận
              </Button>
            </Box>
            {/* End: FOOTER */}
          </form>
        </FormikProvider>
      )}
    </>
  );
};
export default FormRequestEditAdsboard;
