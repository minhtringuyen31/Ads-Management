import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Field, useFormik, FormikProvider } from "formik";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Autocomplete,
  TextareaAutosize,
  Snackbar,
  Alert,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import MapBox from "../map/MapBox";
import ImageUpload from "../../ImageUpload";

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
  gap: "1rem",
};

// STYLE FOOTER
const FormFooterStyle = {
  display: "flex",
  justifyContent: "flex-end",
  width: "70%",
};

const calculateCenter = (locations) => {
  let totalLat = 0;
  let totalLng = 0;

  locations.forEach((location) => {
    totalLat += location.coordinate.lat;
    totalLng += location.coordinate.lng;
  });

  return {
    lat: totalLat / locations.length,
    lng: totalLng / locations.length,
  };
};

const AddAdsboardProvince = () => {
  const navigate = useNavigate();
  //------------- State init -------------
  //Location
  const [locationInfoList, setlocationInfoList] = useState([]);
  const [locationInfoClick, setLocationInfoClick] = useState({});
  const [mapCenter, setMapCenter] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  //Adsboard
  const [adsBoardType, setAdsBoardType] = useState([]);
  const [selectedAdsBoardType, setselectedAdsBoardType] = useState(null);
  const [startDate, setStartDate] = useState(dayjs("01/01/2021"));
  const [endDate, setEndDate] = useState(dayjs("01/01/2021"));

  //Loading, Alert
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);

  //-------------Handle -------------
  //Alert
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
    navigate("/utils/adsboards");
  };

  const handleCloseFailAlert = () => {
    setShowFailAlert(false);
  };
  //Location
  const openMapModal = () => {
    setIsMapModalOpen(true);
  };
  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };
  useEffect(() => {
    const fetchDataLocation = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://14.225.192.121/locations");
        if (response.status < 300) {
          setlocationInfoList(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching location list", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataLocation();
  }, []);
  useEffect(() => {
    if (locationInfoList.length > 0) {
      const center = calculateCenter(locationInfoList);
      setMapCenter(center);
    }
  }, [locationInfoList]);

  //Adsboard
  useEffect(() => {
    const fetchAdsboardType = async () => {
      try {
        const response = await axios.get("http://14.225.192.121/adsboardtypes");
        setAdsBoardType(response.data.data);
      } catch (error) {
        console.error("Error fetching adsboard type");
      }
    };
    fetchAdsboardType();
  }, []);
  const handleImageUpload = (images) => {
    const imageValues = images.map((image) => image.file);
    formik.setFieldValue("adsboardInfo.image", imageValues);
  };

  console.log("Location list: ", locationInfoList);
  console.log("Location Info Click: ", locationInfoClick._id);

  //New data
  const createFormData = (values) => {
    const formData = new FormData();
    formData.append("location", values._id);
    formData.append("adsboard_type", values.adsboardInfo.adsboard_type);
    formData.append("width", values.adsboardInfo.width);
    formData.append("height", values.adsboardInfo.height);
    formData.append("contract_end_date", values.adsboardInfo.contract_end_date);
    formData.append(
      "contract_start_date",
      values.adsboardInfo.contract_start_date
    );
    values.adsboardInfo.image.forEach((file) => formData.append("image", file));
    formData.append(
      "company[name]",
      values.companyInfo.name
    );
    formData.append("company[address]", values.companyInfo.address);
    formData.append(
      "company[contact_name_person]",
      values.companyInfo.namePeople
    );
    formData.append("company[phone]", values.companyInfo.phoneNumber);
    formData.append("company[email]", values.companyInfo.email);
    formData.append("company[description]", values.companyInfo.description);

    return formData;
  };
  const formik = useFormik({
    initialValues: {
      _id: "",
      adsboardInfo: {
        adsboard_type: "",
        height: "",
        width: "",
        contract_start_date: dayjs("01/01/2021"),
        contract_end_date: dayjs("01/01/2021"),
        image: [],
      },
      companyInfo: {
        name: "",
        address: "",
        description: "",
        namePeople: "",
        phoneNumber: "",
        email: "",
      },
    },
    onSubmit: async (values, { resetForm }) => {
      values._id = locationInfoClick._id || "";
      values.adsboardInfo.adsboard_type = selectedAdsBoardType._id;

      console.log("data: ", values);

      const formData = createFormData(values);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      try {
        const response = await axios.post(
          "http://14.225.192.121/adsboard",
          formData
        );
        if (response.status < 300) {
          resetForm({});
          setShowSuccessAlert(true);
        } else {
          setShowFailAlert(true);
        }
      } catch (error) {
        console.error("Error submitting form: ", error);
        setShowFailAlert(true);
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <>
      {isLoading && (
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
      )}
      <FormikProvider value={formik}>
        <form
          style={ContainerStyle}
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
        >
          {/* Begin: HEADER */}
          <Typography>
            <h2>Cấp phép bảng quảng cáo</h2>
          </Typography>
          {/* End: HEADER */}

          {/* Begin: BODY */}
          <Box style={FormBodyStyle}>
            {/* ------------------ Begin: 1. THÔNG TIN LOCATION ------------------ */}
            <Box style={FormBodyItemStyle}>
              <Typography>
                <h4>Thông tin điểm đặt</h4>
              </Typography>

              <Box style={FormBodyItemContentStyle}>
                <Field
                  component={TextField}
                  required
                  name="address"
                  label="Điểm đặt (click here)"
                  value={locationInfoClick.display_name}
                  defaultValue=""
                  style={{
                    width: "100%",
                    marginRight: "1rem",
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onClick={openMapModal}
                />
                {mapCenter && (
                  <MapBox
                    isOpen={isMapModalOpen}
                    onOpen={openMapModal}
                    onClose={closeMapModal}
                    center={mapCenter}
                    zoom={15}
                    locations={locationInfoList}
                    locationInfoClick={setLocationInfoClick}
                  />
                )}
                <TextField
                  required
                  id="outlined-required"
                  label="Địa chỉ"
                  value={locationInfoClick.address}
                  defaultValue=""
                  style={{
                    width: "100%",
                    marginRight: "1rem",
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    width: "100%",
                  }}
                >
                  <TextField
                    required
                    id="outlined-required"
                    label="Loại vị trí"
                    value={locationInfoClick.location_type?.label}
                    defaultValue=""
                    style={{
                      width: "50%",
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Hình thức quảng cáo"
                    value={locationInfoClick.ads_type?.label}
                    defaultValue=""
                    style={{ width: "50%" }}
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </Box>
            </Box>
            {/* ------------------ End: 1. THÔNG TIN LOCATION ------------------ */}

            {/* ------------------ Begin: 2. THÔNG TIN ADSBOARD ------------------ */}
            <Box style={FormBodyItemStyle}>
              <Typography>
                <h4>Thông tin bảng quảng cáo</h4>
              </Typography>

              <Box style={FormBodyItemContentStyle}>
                {/* BEGIN: Thông tin bảng quảng cáo */}
                <Box>
                  <Autocomplete
                    options={adsBoardType}
                    getOptionLabel={(option) => option.label}
                    value={selectedAdsBoardType}
                    onChange={(_event, newValue) => {
                      setselectedAdsBoardType(newValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    name="adsboardInfo.adsboard_type"
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
                    name="adsboardInfo.height"
                    onChange={formik.handleChange}
                    required
                    id="adsboardInfo.height"
                    label="Chiều cao"
                    defaultValue=""
                    style={{ width: "50%" }}
                  />

                  <Field
                    component={TextField}
                    name="adsboardInfo.width"
                    onChange={formik.handleChange}
                    required
                    id="adsboardInfo.width"
                    label="Chiều rộng"
                    defaultValue=""
                    style={{ width: "50%" }}
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
                      name="adsboardInfo.contract_start_date"
                      onChange={(newValue) => {
                        setStartDate(newValue);
                        formik.setFieldValue(
                          "adsboardInfo.contract_start_date",
                          newValue.toISOString()
                        );
                      }}
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
                          "adsboardInfo.contract_end_date",
                          newValue.toISOString()
                        );
                      }}
                      value={endDate}
                      name="adsboardInfo.contract_end_date"
                    />
                  </LocalizationProvider>
                </Box>

                <Box>
                  <ImageUpload
                    name="adsboardInfo.image"
                    onUpload={handleImageUpload}
                  />
                </Box>
                {/* END: Thông tin bảng quảng cáo */}
              </Box>
            </Box>
            {/* ------------------ End: 2. THÔNG TIN ADSBOARD ------------------ */}

            {/* ------------------ Begin: 3. THÔNG TIN COMPANY ------------------ */}
            <Box style={FormBodyItemStyle}>
              <Typography>
                <h4>Thông tin công ty</h4>
              </Typography>

              <Box style={FormBodyItemContentStyle}>
                <Field
                  component={TextField}
                  required
                  label="Tên công ty"
                  defaultValue=""
                  name="companyInfo.name"
                  onChange={formik.handleChange}
                  id="companyInfo.name"
                />
                <Field
                  component={TextField}
                  required
                  label="Địa chỉ công ty"
                  defaultValue=""
                  name="companyInfo.address"
                  onChange={formik.handleChange}
                  id="companyInfo.address"
                />

                <TextareaAutosize
                  minRows={5}
                  aria-label="Mô tả"
                  placeholder="Mô tả về bảng quảng cáo..."
                  style={{
                    maxWidth: "100%",
                    minWidth: "50%",

                    fontFamily: "'Roboto',sans-serif",
                    border: "1px solid #ccc",
                    borderRadius: "0.75rem",
                    backgroundColor: "#f8fafc",
                    padding: "1rem",
                    fontSize: "14px",
                  }}
                  name="companyInfo.description"
                  onChange={formik.handleChange}
                  id="companyInfo.description"
                />

                <Field
                  component={TextField}
                  required
                  label="Tên người liên lạc"
                  defaultValue=""
                  name="companyInfo.namePeople"
                  onChange={formik.handleChange}
                  id="companyInfo.namePeople"
                />
                <Box style={{ display: "flex", gap: "1rem" }}>
                  <Field
                    component={TextField}
                    required
                    label="Số điện thoại"
                    defaultValue=""
                    style={{
                      width: "50%",
                    }}
                    name="companyInfo.phoneNumber"
                    onChange={formik.handleChange}
                    id="companyInfo.phoneNumber"
                  />
                  <Field
                    component={TextField}
                    required
                    label="Email"
                    defaultValue=""
                    style={{
                      width: "50%",
                    }}
                    name="companyInfo.email"
                    onChange={formik.handleChange}
                    id="companyInfo.email"
                  />
                </Box>
              </Box>
            </Box>
            {/* ------------------ End: 3. THÔNG TIN COMPANY ------------------ */}
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
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={2000}
        onClose={handleCloseSuccessAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSuccessAlert}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Tạo yêu cầu cấp phép thành công
        </Alert>
      </Snackbar>
      <Snackbar
        open={showFailAlert}
        autoHideDuration={1000}
        onClose={handleCloseFailAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseFailAlert}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Tạo yêu cầu cấp phép lỗi!
        </Alert>
      </Snackbar>
    </>
  );
};
export default AddAdsboardProvince;
