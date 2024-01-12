import React from "react";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Field, useFormik, FormikProvider } from "formik";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  // CircularProgress,
  Autocomplete,
  TextareaAutosize,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
  gap: "1.5rem",
};

// STYLE FOOTER
const FormFooterStyle = {
  display: "flex",
  justifyContent: "flex-end",
  width: "70%",
};

const planningOptions = [
  { label: "Đã quy hoạch", value: true },
  { label: "Chưa quy hoạch", value: false },
];
const FormRequestEditLocation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationID = location.state?.locationID;
  const [locationData, setLocationData] = useState({});

  //Lây danh sách Location Types
  const [locationTypes, setLocationTypes] = useState([]);
  const [selectedLoctionType, setSelectedLocationType] = useState(null);

  // In ParentComponent
  const imageUploadRef = useRef();

  //Lấy danh sách Ads tpye
  const [adsTypes, setAdsTypes] = useState([]);
  const [selectedAdsType, setSelectedAdsType] = useState(null);

  //Tình trạng quy hoạch (label hiển thị)
  const [selectedPlanningStatus, setSelectedPlanningStatus] = useState(null);

  //Display name
  const [displayName, setDisplayName] = useState("");

  // Ảnh
  const [existingImages, setExistingImages] = useState([]); // State for managing existing images from locationData
  const [newImages, setNewImages] = useState([]); // State for managing new images uploaded via ImageUpload component

  //Showw Alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
    navigate("/utils/edit_requests");
  };
  const handleCloseFailAlert = () => {
    setShowFailAlert(false);
  };

  // Fetch location types
  useEffect(() => {
    const fetchLocationTypes = async () => {
      try {
        const response = await axios.get("http://14.225.192.121/locationtypes");
        setLocationTypes(
          response.data.data.map((type) => ({
            _id: type._id,
            label: type.label,
          }))
        );
      } catch (error) {
        console.error("Error fetching location types:", error);
      }
    };
    fetchLocationTypes();
  }, []);

  //Fetch ads types
  useEffect(() => {
    const fetchAdsTypes = async () => {
      try {
        const response = await axios.get("http://14.225.192.121/adstypes");
        setAdsTypes(
          response.data.data.map((type) => ({
            _id: type._id,
            label: type.label,
          }))
        );
      } catch (error) {
        console.error("Error fetching ads types: ", error);
      }
    };
    fetchAdsTypes();
  }, []);

  // Fetch location data and update selectedLocationType
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(
          `http://14.225.192.121/location/${locationID}`
        );
        const fetchedLocationData = response.data.data;
        setLocationData(fetchedLocationData);

        // Update selectedLocationType
        if (fetchedLocationData.location_type) {
          const defaultLocationType = locationTypes.find(
            (type) => type.label === fetchedLocationData.location_type.label
          );
          setSelectedLocationType(defaultLocationType || null);
        }

        // Update selectedAdsType
        if (fetchedLocationData.ads_type) {
          const defaultAdsType = adsTypes.find(
            (type) => type.label === fetchedLocationData.ads_type.label
          );
          setSelectedAdsType(defaultAdsType || null);
        }

        // Update planningStatus
        const planningStatusOption = planningOptions.find(
          (option) => option.value === fetchedLocationData.is_planned
        );
        setSelectedPlanningStatus(planningStatusOption);

        // Set the display name
        setDisplayName(fetchedLocationData.display_name || "");

        // Copy image into new_image
        if (fetchedLocationData.image) {
          setNewImages(fetchedLocationData.image);
          setExistingImages(fetchedLocationData.image);
          console.log(fetchedLocationData.image);
        }
      } catch (error) {
        console.error("Error fetching location data", error);
      }
    };

    if (locationID && locationTypes.length > 0 && adsTypes.length > 0) {
      fetchLocationData();
    }
  }, [locationID, locationTypes, adsTypes]);

  // Images
  // Xử lý khi có hình ảnh mới được tải lên từ ImageUpload
  const handleImageUpload = (uploadedImages) => {
    console.log("Ảnh nè: ", uploadedImages);
    const ImageUpload = [];
    uploadedImages.map((image) => {
      // setExistingImages((prevImages) => [...prevImages, image.preview]);
      ImageUpload.push(image.preview);
    });

    // // Kết hợp hình ảnh mới với hình ảnh hiện tại
    setExistingImages(Array.from(new Set([...existingImages, ...ImageUpload])));

    const imageValues = uploadedImages.map((image) => image.file);
    formik.setFieldValue("image", imageValues);
    // setNewImages(uploadedImages);
  };

  // Xử lý xóa hình ảnh từ newImages
  const handleRemoveImage = (imageToRemove) => {
    console.log(imageToRemove);
    const newexistingImages = existingImages.filter(
      (image) => image !== imageToRemove
    );
    setExistingImages(Array.from(new Set(newexistingImages)));
    imageUploadRef.current.handleRemoveImageByUrl(imageToRemove);
  };

  // New data
  const createFormData = (values) => {
    const formData = new FormData();
    formData.append("type", values.type);
    formData.append("newInformation[id]", values.id);
    formData.append("newInformation[display_name]", values.display_name);
    formData.append("newInformation[coordinate][lat]", values.coordinate.lat);
    formData.append("newInformation[coordinate][lng]", values.coordinate.lng);
    formData.append("newInformation[address]", values.address);
    formData.append("newInformation[ward]", values.ward._id);
    formData.append("newInformation[district]", values.district._id);
    formData.append("newInformation[location_type]", values.location_type);
    formData.append("newInformation[ads_type]", values.ads_type);
    formData.append("newInformation[is_planned]", values.is_planned);
    values.image.forEach((file) =>
      formData.append("newInformation[image]", file)
    );
    formData.append("reason", "Yêu cầu");

    return formData;
  };

  const formik = useFormik({
    initialValues: {
      id: locationData._id ?? "",
      coordinate: locationData.coordinate ?? {},
      address: locationData.address ?? "",
      ward: locationData.ward ?? "",
      district: locationData.district ?? "",

      location_type: locationData.location_type ?? "",
      ads_type: locationData.ads_type ?? "",
      image: [],
      is_planned: locationData.is_planned ?? "",
      display_name: locationData.display_name ?? "",
      reason: "",
      type: "location",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log("Values:", values);
      console.log("Location data: ", locationData);
      values.id = locationData._id || "";
      values.coordinate = locationData.coordinate || {};
      values.address = locationData.address || "";
      values.ward = locationData.ward || "";
      values.district = locationData.district || "";

      if (values.location_type === "") {
        values.location_type = locationData.location_type._id || "";
      }
      if (values.ads_type === "") {
        values.ads_type = locationData.ads_type._id || "";
      }
      if (values.image.length === 0) {
        values.image = locationData.image || [];
      }
      if (values.is_planned === "") {
        values.is_planned = locationData.is_planned || "";
      }
      if (values.display_name === "") {
        values.display_name = locationData.display_name || "";
      }
      // console.log(locationData);
      const formData = createFormData(values);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      try {
        const response = await axios.post(
          "http://14.225.192.121/editRequest",
          formData
        );
        if (response.status < 300) {
          console.log("Data response success: ", response.data.data);
          resetForm({});
          setShowSuccessAlert(true);
        } else {
          console.log("Data response fail: ", response.data.data);
          setShowFailAlert(true);
        }
      } catch (error) {
        console.error("Error submitting form", error);
        setShowFailAlert(true);
      }
    },
  });

  return (
    <>
      <FormikProvider value={formik}>
        <form
          style={ContainerStyle}
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
        >
          {/* Begin: HEADER */}
          <Typography>
            <h2>Yêu cầu chỉnh sửa điểm đặt</h2>
          </Typography>
          {/* End: HEADER */}

          {/* Begin: BODY */}
          <Box style={FormBodyStyle}>
            <Box style={FormBodyItemStyle}>
              <Box style={FormBodyItemContentStyle}>
                <Field
                  component={TextField}
                  label="Địa chỉ"
                  value={locationData.address}
                  name="address"
                  onChange={(e) =>
                    formik.setFieldValue("address", e.target.value)
                  }
                  onSubmit={(e) =>
                    formik.setFieldValue("address", locationData.address)
                  }
                  style={{
                    width: "100%",
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Field
                  component={TextField}
                  label="Tên hiển thị"
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                    formik.setFieldValue("display_name", e.target.value);
                  }}
                  style={{
                    width: "100%",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Box>
                  <Autocomplete
                    options={locationTypes}
                    getOptionLabel={(option) => option.label}
                    onChange={(_event, newValue) => {
                      setSelectedLocationType(newValue);
                      formik.setFieldValue("location_type", newValue._id);
                    }}
                    value={selectedLoctionType}
                    // isOptionEqualToValue={(option, value) =>
                    //   option.id === value.id
                    // }
                    // name="adsboardInfo.adsboard_type"
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Loại vị trí"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    )}
                  />
                </Box>
                {/* <Box display="flex" flexDirection="column" gap={2}>
                  <ImageUpload onUpload={handleImageUpload} />
                  <Box sx={{ height: "6.5rem"}}>
                    {newImages.map((image, index) => (
                      <Box
                        key={index}
                        position="relative"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "1px dashed gray",
                          borderRadius: "0.25rem",
                          width: "6.5rem",
                          height: "6.5rem",
                        }}
                      >
                        <img
                          src={image.preview}
                          alt={`Image ${index}`}
                          style={{
                            width: "6rem",
                            height: "6rem",
                            borderRadius: "0.25rem",
                          }}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveImage(image)}
                          sx={{ position: "absolute", top: 0, right: 0 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box> */}
                <Box>
                  <Autocomplete
                    options={adsTypes}
                    getOptionLabel={(option) => option.label}
                    onChange={(_event, newValue) => {
                      setSelectedAdsType(newValue);
                      formik.setFieldValue("ads_type", newValue._id);
                    }}
                    value={selectedAdsType}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Loại quảng cáo"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    )}
                  />
                </Box>
                <Box>
                  <Autocomplete
                    options={planningOptions}
                    getOptionLabel={(option) => option.label}
                    onChange={(_event, newValue) => {
                      setSelectedPlanningStatus(newValue);
                      formik.setFieldValue("is_planned", newValue.value);
                    }}
                    value={selectedPlanningStatus}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Tình trạng quy hoạch"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    )}
                  />
                </Box>
                <TextareaAutosize
                  minRows={5}
                  aria-label="Lí do"
                  placeholder="Lí do chỉnh sửa điểm đặt"
                  onChange={(e) =>
                    formik.setFieldValue("reason", e.target.value)
                  }
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
                  // name="companyInfo.description"
                  // onChange={formik.handleChange}
                  // id="companyInfo.description"
                />
                <Typography>
                  <h4>Hình ảnh điểm đặt</h4>
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  {existingImages.map((image, index) => (
                    <Box
                      key={index}
                      position="relative"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px dashed gray",
                        borderRadius: "0.25rem",
                        width: "6.5rem",
                        height: "6.5rem",
                      }}
                    >
                      <img
                        src={image}
                        alt={`Image ${index}`}
                        style={{
                          width: "6rem",
                          height: "6rem",
                          borderRadius: "0.25rem",
                        }}
                      />
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveImage(image)}
                        sx={{ position: "absolute", top: 0, right: 0 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
                <ImageUpload
                  ref={imageUploadRef}
                  onUpload={handleImageUpload}
                  showImages={false}
                  name="image"
                />
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
export default FormRequestEditLocation;
