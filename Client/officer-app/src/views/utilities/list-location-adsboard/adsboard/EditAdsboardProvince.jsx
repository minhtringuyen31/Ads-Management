import React from "react";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageUpload from "../../ImageUpload";
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
  const navigate = useNavigate();
  const adsboard = useLocation();
  const adsboardID = adsboard.state?.adsboardID;
  const [adsboardData, setAdsboardData] = useState({});

  //Check loading
  const [isLoading, setIsLoading] = useState(true);

  //Lấy danh sách adsboard_type
  const [adsboardTypes, setAdsBoardTypes] = useState([]);
  const [selectedAdsboardType, setSelectedAdsboardType] = useState(null);

  // In ParentComponent
  const imageUploadRef = useRef();
  // Ảnh
  const [existingImages, setExistingImages] = useState([]); // State for managing existing images from locationData
  // const [newImages, setNewImages] = useState([]); // State for managing new images uploaded via ImageUpload component

  //Showw Alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
    navigate("/utils/adsboards");
  };
  const handleCloseFailAlert = () => {
    setShowFailAlert(false);
  };

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
          formik.setFieldValue("_id", fetchedAdsboardData._id ?? "");
          formik.setFieldValue(
            "adsboard_type",
            fetchedAdsboardData.adsboard_type._id ?? ""
          );
          formik.setFieldValue("height", fetchedAdsboardData.height ?? "");
          formik.setFieldValue("width", fetchedAdsboardData.width ?? "");
          formik.setFieldValue(
            "start_date",
            fetchedAdsboardData.contract_start_date ??
              dayjs("01/01/2021").toISOString()
          );
          formik.setFieldValue(
            "end_date",
            fetchedAdsboardData.contract_end_date ??
              dayjs("01/01/2021").toISOString()
          );
          formik.setFieldValue("image", fetchedAdsboardData.image ?? []);

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

          if (fetchedAdsboardData.image) {
            // setNewImages(fetchedAdsboardData.image);
            setExistingImages(fetchedAdsboardData.image);
            console.log(fetchedAdsboardData.image);
          }
        }
      } catch (error) {
        console.error("Error fetching adsboard data", error);
      }
    };
    if (adsboardTypes.length > 0) {
      fetchAdsboardData();
    }
  }, [adsboardID, adsboardTypes]);

  //New data
  const createFormData = (values) => {
    const formData = new FormData();
    formData.append("_id", values._id);
    // formData.append("location[_id]", values.locationID);
    formData.append("adsboard_type", values.adsboard_type);
    formData.append("width", values.width);
    formData.append("height", values.height);
    formData.append("contract_start_date", values.start_date);
    formData.append("contract_end_date", values.end_date);

    values.image.forEach((file) => formData.append("image", file));

    return formData;
  };

  const formik = useFormik({
    initialValues: {
      _id: adsboardData._id ?? "",
      //   locationID: adsboardData.location._id || "",
      adsboard_type: adsboardData.adsboard_type ?? "",
      height: adsboardData.height ?? 0,
      width: adsboardData.width ?? 0,
      start_date:
        adsboardData.contract_start_date || dayjs("01/01/2021").toISOString(),
      end_date:
        adsboardData.contract_end_date || dayjs("01/01/2021").toISOString(),
      image: [],
    },
    onSubmit: async (values, { resetForm }) => {
      // values.id = adsboardData._id || "";
      // if (values.adsboard_type === "") {
      //   values.adsboard_type = adsboardData.adsboard_type._id || "";
      // }
      // if (values.height === 0) {
      //   values.height = adsboardData.height || "";
      // }
      // if (values.width === 0) {
      //   values.width = adsboardData.width || "";
      // }
      // if (values.start_date) {
      //   // Nếu start_date là một đối tượng dayjs, chuyển nó sang chuỗi ISO
      //   if (dayjs.isDayjs(values.start_date)) {
      //     values.start_date = values.start_date.toISOString();
      //   } else if (values.start_date === dayjs("01/01/2021").toISOString()) {
      //     // Nếu start_date là giá trị mặc định, sử dụng giá trị từ dữ liệu đã có
      //     values.start_date = adsboardData.contract_start_date;
      //   }
      // }

      // if (values.end_date) {
      //   // Nếu start_date là một đối tượng dayjs, chuyển nó sang chuỗi ISO
      //   if (dayjs.isDayjs(values.end_date)) {
      //     values.end_date = values.end_date.toISOString();
      //   } else if (values.end_date === dayjs("01/01/2021").toISOString()) {
      //     // Nếu start_date là giá trị mặc định, sử dụng giá trị từ dữ liệu đã có
      //     values.end_date = adsboardData.contract_end_date;
      //   }
      // }
      // if (values.image.length === 0) {
      //   values.image = adsboardData.image || [];
      // }
      console.log("Values: ", values);
      const formData = createFormData(values);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      try {
        const response = await axios.put(
          `http://14.225.192.121/adsboard/${adsboardID}`,
          formData
        );
        if (response.status < 300) {
          resetForm({});
          setShowSuccessAlert(true);
        }
      } catch (error) {
        console.error("Error submitting form", error);
        setShowFailAlert(true);
      }
    },
  });

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
            enableReinitialize={true}
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
                          formik.setFieldValue("start_date", newValue);
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
                          formik.setFieldValue("end_date", newValue);
                        }}
                        value={endDate}
                      />
                    </LocalizationProvider>
                  </Box>

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
      )}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={1000}
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
          Chỉnh sửa bảng quảng cáo thành công
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
          Chỉnh sửa bảng quảng cáo lỗi!
        </Alert>
      </Snackbar>
    </>
  );
};
export default FormRequestEditAdsboard;
