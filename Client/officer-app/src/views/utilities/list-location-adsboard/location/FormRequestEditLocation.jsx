import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Field, useFormik, FormikProvider } from "formik";
import {
  TextField,
  Button,
  Box,
  Typography,
  // Snackbar,
  // Alert,
  // CircularProgress,
  Autocomplete,
  TextareaAutosize,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageUpload from "../../ImageUpload";
// import { TextareaAutosize } from "@mui/base/TextareaAutosize";
// import Autocomplete from "@mui/material/Autocomplete";

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
  const locationID = location.state?.locationID;
  const [locationData, setLocationData] = useState({});

  //Lây danh sách Location Types
  const [locationTypes, setLocationTypes] = useState([]);
  const [selectedLoctionType, setSelectedLocationType] = useState(null);

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
        // if (fetchedLocationData.image) {
        //   // Sao chép hình ảnh hiện tại vào newImages
        //   const initialImages = fetchedLocationData.image.map((url) => ({
        //     preview: url, // Giả sử 'url' là đường dẫn URL của hình ảnh
        //   }));
        //   setNewImages(initialImages);
        // }
        if (fetchLocationData.image) {
          setNewImages(fetchLocationData.image);
          setExistingImages(fetchLocationData.image);
          console.log(fetchLocationData.image);
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
  // const handleImageUpload = (uploadedImages) => {
  //   // Kết hợp hình ảnh mới với hình ảnh hiện tại
  //   setNewImages((prevImages) => [...prevImages, ...uploadedImages]);
  //   // setNewImages(uploadedImages);
  // };
  // Xử lý xóa hình ảnh từ newImages
  // const handleRemoveImage = (imageToRemove) => {
  //   setNewImages((prevImages) =>
  //     prevImages.filter((image) => image.preview !== imageToRemove.preview)
  //   );
  //   URL.revokeObjectURL(imageToRemove.preview); // Giải phóng bộ nhớ
  // };

  // //Tạo data
  // const createFormData = (values) => {
  //   const formData = new FormData();
  // }
  // const formik = useFormik({
  //   initialValues: {
  //     locationid: locationData._id,
  //     location_type: locationData.location_type._id,
  //     ads_type: locationData.ads_type._id,
  //     image: locationData.image,
  //     is_planned: locationData.is_planned,
  //     display_name: locationData.display_name,
  //   },
  //   onSubmit: async (values) => {
  //     const respone = await axios.post("http://14.225.192.121/editRequest");
  //   },
  // });

  // const locationTypeOptions = locationTypes.map((type) => ({
  //   _id: type._id,
  //   label: type.label,
  // }));

  return (
    <>
      <FormikProvider>
        <form style={ContainerStyle}>
          {/* Begin: HEADER */}
          <Typography>
            <h2>Yêu cầu chỉnh sửa điểm đặt</h2>
          </Typography>
          {/* End: HEADER */}

          {/* Begin: BODY */}
          <Box style={FormBodyStyle}>
            <Box style={FormBodyItemStyle}>
              <Box style={FormBodyItemContentStyle}>
                <TextField
                  // component={TextField}
                  label="Địa chỉ"
                  value={locationData.address}
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
                <TextField
                  // component={TextField}
                  label="Tên hiển thị"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
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
    </>
  );
};
export default FormRequestEditLocation;
