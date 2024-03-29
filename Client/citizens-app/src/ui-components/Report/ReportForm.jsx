import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axiosClient from "../../axiosConfig/axiosClient";
import PropTypes from "prop-types";
import axios from "axios";

/**
 * Validate Report Form Schema
 */
const validateSchema = Yup.object().shape({
  fullname: Yup.string(),
  email: Yup.string()
    .email("Email không hợp lệ")
    .max(255)
    .required("Yêu cầu nhập email"),
  phoneNumber: Yup.string().max(255).required("Yêu cầu nhập số điện thoại"),
});

/**
 * Default Input Value
 */
const initialValues = {
  fullname: "",
  email: "",
  phoneNumber: "",
  reportType: "",
  content: "",
  image: [],
};

const ReportForm = ({ agent, type, handleCloseModal }) => {
  /**
   * useState
   */
  const [previews, setPreviews] = useState([]);
  const [reportTypes, setReportTypes] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);

  /**
   * useRef
   */
  const fileInputRef = useRef(null);
  const formikRef = useRef(null);

  /**
   * @return {void}
   */
  const handleBrowseImgBtnClick = () => {
    fileInputRef.current.click();
  };

  /**
   * @param {*} values
   * @param {*} type
   * @param {*} agent
   * @return {void}
   */
  const handleSubmitReportForm = async (values) => {
    const postBody = {
      username: values.fullname,
      email: values.email,
      phone_number: values.phoneNumber,
      report_form: values.reportType,
      report_content: values.content,
      type: type,
      image: values.image,
    };
    switch (type) {
      case "location":
        postBody.location = agent;
        break;
      case "board":
        postBody.board = agent;
        break;
      case "random":
        postBody.random = agent;
        break;
      default:
        console.log("Not found area");
        return <div>Not found area</div>;
    }
    console.log("Post: ", postBody);

    try {
      const formData = new FormData();
      formData.append("username", values.fullname);
      formData.append("email", values.email);
      formData.append("phone_number", values.phoneNumber);
      formData.append("report_form", values.reportType);
      formData.append("report_content", values.content);
      formData.append("type", type);
      console.log("Image: ", values.image);
      values.image.forEach((file) => {
        console.log("File: ", file);
        formData.append("image", file);
      });
      switch (type) {
        case "location":
          formData.append("location", agent);
          break;
        case "board":
          formData.append("board", agent);
          break;
        case "random":
          formData.append("random", JSON.stringify(agent));
          break;
        default:
          console.log("Not found area");
          return <div>Not found area</div>;
      }
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);

        if (pair[0] === "image") {
          console.log("Image information: ", pair[1]);
        }
      }
      const response = await axios.post(
        "http://14.225.192.121/report",
        formData,
      );
      console.log("Reponse", response);
      if (response.status < 300) {
        console.log("New Report: ", response);
        const savedReports = JSON.parse(localStorage.getItem("reports")) || [];
        savedReports.push(response.data.data._id);
        localStorage.setItem("reports", JSON.stringify(savedReports));
        handleCloseModal();
        renderSnackBar();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderSnackBar = () => {
    console.log("Open snackbar");
    return (
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Tạo mới báo cáo thành công!
        </Alert>
      </Snackbar>
    );
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  /**
   * @param {*} event
   * @return {void}
   */
  const handleBrowseImageChange = (event) => {
    console.log("Browse Files");
    const selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      const selectedFile = selectedFiles[i];
      console.log(`Selected file ${i + 1}:`, selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviews((prevPreviews) => [...prevPreviews, fileReader.result]);
      };
      fileReader.readAsDataURL(selectedFile);
    }

    const files = Array.from(event.target.files);
    const mappedFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    console.log("mapped file: ", formikRef);
    const imageValues = mappedFiles.map((image) => image.file);
    formikRef.current.setFieldValue("image", imageValues);
  };

  function onChangeReCaptcha(value) {
    console.log("Captcha value:", value);
  }

  /**
   * useeEffect
   */
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosClient.get("reporttypes");
        if (response.status == 200) {
          console.log("Report Type: ", response.data);
          setReportTypes(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  console.log("Snackbar Open: ", snackOpen);
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        padding={2}
        justifyContent="center"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={handleSubmitReportForm}
          innerRef={formikRef}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            setFieldValue,
          }) => (
            <form
              noValidate
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormControl
                fullWidth
                error={Boolean(touched.fullname) && errors.fullname}
                sx={{ marginTop: "10px" }}
              >
                <InputLabel htmlFor="outlined-adornment-fullname">
                  Họ và tên
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-fullname"
                  type="text"
                  value={values.fullname}
                  name="fullname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Họ và tên"
                  inputProps={{}}
                />
                {touched.fullname && errors.fullname && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-fullname"
                  >
                    {errors.fullname}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.email) && errors.email}
                sx={{ marginTop: "15px" }}
              >
                <InputLabel htmlFor="outlined-adornment-email">
                  Địa chỉ email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Địa chỉ email"
                  inputProps={{}}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email">
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.phoneNumber) && errors.phoneNumber}
                sx={{ marginTop: "15px" }}
              >
                <InputLabel htmlFor="outlined-adornment-phoneNumber">
                  Số điện thoại
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-phoneNumber"
                  type="tel"
                  value={values.phoneNumber}
                  name="phoneNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Số điện thoại"
                  inputProps={{}}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-phoneNumber"
                  >
                    {errors.phoneNumber}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ marginTop: "15px" }}>
                <InputLabel htmlFor="outlined-adornment-report-type">
                  Hình thức báo cáo
                </InputLabel>
                <Select
                  id="outlined-adornment-report-type"
                  value={values.reportType}
                  name="reportType"
                  label="Hình thức báo cáo"
                  onChange={handleChange}
                >
                  {reportTypes.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.label}
                    </MenuItem>
                  ))}

                  {/* <MenuItem value={"denounce"}>Tố cáo sai phạm</MenuItem>
                <MenuItem value={"register"}>Đăng ký nội dung</MenuItem>
                <MenuItem value={"feedback"}>Đóng góp ý kiến</MenuItem>
                <MenuItem value={"question"}>Giải đáp thắc mắc</MenuItem> */}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.content) && errors.content}
                sx={{ marginTop: "15px" }}
              >
                <Field name="content">
                  {({ field, form }) => (
                    <div>
                      <CKEditor
                        editor={ClassicEditor}
                        data={field.value}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          form.setFieldValue("content", data);
                        }}
                      />
                      {touched.content && errors.content && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-content"
                        >
                          {errors.content}
                        </FormHelperText>
                      )}
                    </div>
                  )}
                </Field>
              </FormControl>

              {/* <ImageUploader /> */}
              <Box width="80%" marginTop={2}>
                <Button
                  variant="outlined"
                  startIcon={<AddAPhotoIcon />}
                  sx={{
                    width: "100%",
                    height: "30px",
                    textTransform: "none",
                    fontSize: 14,
                    fontWeight: "bold",
                    borderRadius: "20px",
                  }}
                  onClick={handleBrowseImgBtnClick}
                >
                  Thêm ảnh vào bài báo cáo
                </Button>

                <input
                  id="file-input"
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpg"
                  hidden
                  onChange={handleBrowseImageChange}
                  multiple
                />
                <Box marginTop={1} display="flex" flexDirection="row" gap={1}>
                  {/* <img
                  srcSet={`${preview}?w=90&h=90&fit=crop&auto=format&dpr=2 2x`}
                  src={`${preview}?w=90&h=90&fit=crop&auto=format`}
                  alt="report-image"
                  loading="lazy"
                /> */}
                  {previews.map((item, index) => (
                    <Box key={index}>
                      <img
                        src={item}
                        alt={`Preview ${index}`}
                        style={{ width: 90, height: 90 }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box marginTop={1}>
                <ReCAPTCHA
                  sitekey="6LdgjE8pAAAAAP4Qczupn9QwAODIiGKhJO8VmO9y"
                  onChange={onChangeReCaptcha}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                gap={2}
                sx={{
                  mt: 2,
                  justifyContent: "flex-end",
                  position: "absolute",
                  bottom: 20,
                  right: 20,
                }}
              >
                <Button
                  disableElevation
                  // disabled={isSubmitting}
                  fullWidth
                  size="small"
                  variant="outlined"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleCloseModal()}
                >
                  Hủy
                </Button>
                <Button
                  disableElevation
                  // disabled={isSubmitting}
                  fullWidth
                  size="small"
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Đăng
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ReportForm;

ReportForm.propTypes = {
  agent: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};
