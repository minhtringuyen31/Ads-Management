import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "axiosConfig/axios-config";
import axios from "axios";
import * as Yup from "yup";
import { rootApi } from "lib/api";
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

import MapNew from "../map/MapNew";
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

const AddLocationProvince = () => {
  const navigate = useNavigate();

  //------------- State init -------------
  //Location
  const [locationInfoList, setlocationInfoList] = useState([]);
  const [locationInfoClick, setLocationInfoClick] = useState({});
  const [mapCenter, setMapCenter] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  //Loading, Alert
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);

  //Lây danh sách Location Types
  const [locationTypes, setLocationTypes] = useState([]);
  const [selectedLoctionType, setSelectedLocationType] = useState(null);

  //Lấy danh sách Adstype
  const [adsTypes, setAdsTypes] = useState([]);
  const [selectedAdsType, setSelectedAdsType] = useState(null);

  //-------------Handle -------------
  //Location
  const openMapModal = () => {
    setIsMapModalOpen(true);
  };
  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
    navigate("/utils/locations");
  };

  const handleCloseFailAlert = () => {
    setShowFailAlert(false);
  };
  useEffect(() => {
    const fetchDataLocation = async () => {
      setIsLoading(true);
      try {
        const response = await instance.get(`${rootApi}/locations`);
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

    //Mới thêm (!!!)
    if (locationInfoClick.display_name) {
      formik.setFieldValue("address", locationInfoClick.display_name);
    }
  }, [locationInfoClick.display_name, locationInfoList]);
  //Mới thêm (!!!)
  useEffect(() => {
    if (selectedLoctionType) {
      formik.setFieldValue("location_type", selectedLoctionType);
    }
  }, [selectedLoctionType]);
  useEffect(() => {
    if (selectedAdsType) {
      formik.setFieldValue("ads_type", selectedAdsType);
    }
  }, [selectedAdsType]);

  // Fetch location types
  useEffect(() => {
    const fetchLocationTypes = async () => {
      try {
        const response = await axios.get("http://14.225.192.121/locationtypes");
        if (response.status < 300) {
          setLocationTypes(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching location types:", error);
      }
    };
    fetchLocationTypes();
  }, []);

  //Fetch adstype
  useEffect(() => {
    const fetchAdsTypes = async () => {
      try {
        const response = await axios.get("http://14.225.192.121/adstypes");
        if (response.status < 300) {
          setAdsTypes(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching location types:", error);
      }
    };
    fetchAdsTypes();
  }, []);

  const createFormData = (values) => {
    const formData = new FormData();
    formData.append("coordinate[lat]", values.coordinate.lat);
    formData.append("coordinate[lng]", values.coordinate.lng);
    formData.append("address", values.address);
    formData.append("ward", values.ward);
    formData.append("district", values.district);
    formData.append("display_name", values.display_name);
    formData.append("location_type", selectedLoctionType._id);
    formData.append("ads_type", selectedAdsType._id);
    values.image.forEach((file) => formData.append("image", file));

    return formData;
  };

  const formik = useFormik({
    initialValues: {
      coordinate: {},
      address: "",
      ward: "",
      district: "",
      display_name: "",
      location_type: "",
      ads_type: "",
      image: [],
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Điểm đặt không được để trống"),
      display_name: Yup.string().required("Tên hiển thị không được để trống"),
      location_type: Yup.object().required("Loại điểm đặt không được để trống"),
      ads_type: Yup.object().required("Loại quảng cáo không được để trống"),
      // image: Yup.array()
      //   .required("Vui lòng tải lên ít nhất một hình ảnh")
      //   .min(1, "Vui lòng tải lên ít nhất một hình ảnh"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      values.coordinate.lat = locationInfoClick.lat;
      values.coordinate.lng = locationInfoClick.lon;
      values.address = locationInfoClick.display_name;
      values.ward = locationInfoClick.address.quarter;
      values.district = locationInfoClick.address.suburb;

      console.log("Values submit: ", values);

      const formData = createFormData(values);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      try {
        const response = await axios.post(
          "http://14.225.192.121/location",
          formData
        );
        if (response.status < 300) {
          resetForm({});
          setShowSuccessAlert(true);
        } else {
          setShowFailAlert(true);
        }
        console.log("response data: ", response.data.data);
      } catch (error) {
        console.error("Error submitting form", error);
        setShowFailAlert(true);
      } finally {
        setIsLoading(false);
      }
    },
  });

  console.log("Location list: ", locationInfoList);
  //Image
  const handleImageUpload = (images) => {
    const imageValues = images.map((image) => image.file);
    formik.setFieldValue("image", imageValues);
  };

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
            <h2>Thêm điểm đặt mới</h2>
          </Typography>
          {/* End: HEADER */}

          {/* Begin: BODY */}
          <Box style={FormBodyStyle}>
            <Box style={FormBodyItemStyle}>
              <Box style={FormBodyItemContentStyle}>
                <Field
                  component={TextField}
                  // required
                  name="address"
                  label="Điểm đặt (click here)"
                  value={locationInfoClick.display_name}
                  //Mới thêm (!!!)
                  // value={
                  //   formik.values.address || locationInfoClick.display_name
                  // }
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
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
                {mapCenter && (
                  <MapNew
                    isOpen={isMapModalOpen}
                    onOpen={openMapModal}
                    onClose={closeMapModal}
                    center={mapCenter}
                    zoom={15}
                    locations={locationInfoList}
                    locationInfoClick={setLocationInfoClick}
                    onLocationConfirm={(address) => {
                      console.log("Confirmed Address:", address);
                      // Handle the confirmed address here in AddLocationProvince
                    }}
                  />
                )}

                <Field
                  component={TextField}
                  label="Tên hiển thị"
                  //   value={displayName}
                  onChange={(e) => {
                    // setDisplayName(e.target.value);
                    formik.setFieldValue("display_name", e.target.value);
                  }}
                  style={{
                    width: "100%",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={
                    formik.touched.display_name &&
                    Boolean(formik.errors.display_name)
                  }
                  helperText={
                    formik.touched.display_name && formik.errors.display_name
                  }
                />

                <Box>
                  <Autocomplete
                    options={locationTypes}
                    getOptionLabel={(option) => option.label}
                    value={selectedLoctionType}
                    onChange={(_event, newValue) => {
                      setSelectedLocationType(newValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                    name="location_type"
                    renderInput={(params) => (
                      <TextField
                        // required
                        {...params}
                        label="Loại điểm đặt"
                        variant="outlined"
                        style={{ width: "100%" }}
                        error={
                          formik.touched.location_type &&
                          Boolean(formik.errors.location_type)
                        }
                        helperText={
                          formik.touched.location_type &&
                          formik.errors.location_type
                        }
                      />
                    )}
                  ></Autocomplete>
                </Box>

                <Box>
                  <Autocomplete
                    options={adsTypes}
                    getOptionLabel={(option) => option.label}
                    value={selectedAdsType}
                    onChange={(_event, newValue) => {
                      setSelectedAdsType(newValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                    name="ads_type"
                    renderInput={(params) => (
                      <TextField
                        // required
                        {...params}
                        label="Loại quảng cáo"
                        variant="outlined"
                        style={{ width: "100%" }}
                        error={
                          formik.touched.ads_type &&
                          Boolean(formik.errors.ads_type)
                        }
                        helperText={
                          formik.touched.ads_type && formik.errors.ads_type
                        }
                      />
                    )}
                  ></Autocomplete>
                </Box>

                <Box>
                  <ImageUpload name="image" onUpload={handleImageUpload} />
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
          Thêm điểm đặt thành công
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
          Thêm điểm đặt lỗi!
        </Alert>
      </Snackbar>
    </>
  );
};
export default AddLocationProvince;
