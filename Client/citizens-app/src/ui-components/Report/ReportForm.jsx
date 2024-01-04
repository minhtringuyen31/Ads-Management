import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { useState, useRef } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axiosClient from "../../axiosConfig/axiosClient";
import PropTypes from "prop-types";



const validateSchema = Yup.object().shape({
  fullname: Yup.string(),
  email: Yup.string()
    .email("Email không hợp lệ")
    .max(255)
    .required("Yêu cầu nhập email"),
  phoneNumber: Yup.string().max(255).required("Yêu cầu nhập số điện thoại"),
});

const initialValues = {
  fullname: "Nguyễn Văn A",
  email: "nva@gmail.com",
  phoneNumber: "093773333",
  reportType: "",
  content: "",
};

const ReportForm = ({agent, type}) => {
  /**
   * useState
   */
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

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
    const postBody =
      type === "location"
        ? {
            username: values.fullname,
            email: values.email,
            phone_number: values.phoneNumber,
            report_form: values.reportType,
            report_content: values.content,
            type: type,
            location: agent,
          }
        : {
            username: values.fullname,
            email: values.email,
            phone_number: values.phoneNumber,
            report_form: values.reportType,
            report_content: values.content,
            type: type,
            board: agent,
          };

          try {
            const response = await axiosClient.post("report", JSON.stringify(postBody));
            if (response.status == 200) {
              console.log("New Report: ", response.data);
            }
          } catch (error) {
            console.log(error)
          }
    console.log("Report Form: ", postBody);
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
  };

  function onChangeReCaptcha(value) {
    console.log("Captcha value:", value);
  }

  return (
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
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
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
                <FormHelperText error id="standard-weight-helper-text-fullname">
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
                <MenuItem value={"Tố cáo sai phạm"}>Tố cáo sai phạm</MenuItem>
                <MenuItem value={"Đăng ký nội dung"}>Đăng ký nội dung</MenuItem>
                <MenuItem value={"Đóng góp ý kiến"}>Đóng góp ý kiến</MenuItem>
                <MenuItem value={"Giái đáp thắc mắc"}>
                  Giải đáp thắc mắc
                </MenuItem>
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
                accept="image/pn, image/jpg"
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
                sitekey="Your client site key"
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
  );
};

export default ReportForm;

ReportForm.propTypes = {
  agent: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
