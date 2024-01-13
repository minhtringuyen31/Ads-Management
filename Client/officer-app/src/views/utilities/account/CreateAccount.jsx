import React from "react";
import MainCard from "ui-component/cards/MainCard";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
  MenuItem,
  Select,
  Alert,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const validateSchema = Yup.object().shape({
  fullname: Yup.string(),
  email: Yup.string()
    .email("Email không hợp lệ")
    .max(255)
    .required("Yêu cầu nhập email"),
  phoneNumber: Yup.string().max(255),
  password: Yup.string(),
  role: Yup.string()
    .oneOf(
      ["district_officer", "ward_officer"],
      "Vui lòng chọn phân cấp hợp lệ",
    )
    .required("Yêu cầu chọn vai trò"),
});

const initialValues = {
  fullname: "Nguyễn Văn A",
  email: "",
  phoneNumber: "",
  password: "",
  role: "",
};

const CreateAccount = () => {
  console.log("selected role: ");
  const [snackOpen, setSnackOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = async (values) => {
    const postBody = {
      fullname: values.fullname,
      email: values.email,
      phone: values.phoneNumber,
      password: values.password,
      userRole: values.role,
    };
    console.log("Post Body: ", postBody);
    try {
      const response = await axios.post(
        "http://14.225.192.121/user",
        postBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status < 300) {
        console.log("New Account: ", response);
        renderSnackBar();
        navigate("/utils/account_management");
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

  return (
    <>
      <MainCard title="Tạo mới tài khoản ">
        <Box
          width="60%"
          height="690px"
          display="flex"
          flexDirection="column"
          justifyContent="start"
          paddingX={5}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={handleSubmitForm}
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
                  padding: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FormControl
                  fullWidth
                  error={Boolean(touched.fullname) && errors.fullname}
                  sx={{ marginTop: "20px" }}
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
                  sx={{ marginTop: "25px" }}
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
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  fullWidth
                  error={Boolean(touched.phoneNumber) && errors.phoneNumber}
                  sx={{ marginTop: "25px" }}
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

                <FormControl
                  fullWidth
                  error={Boolean(touched.password) && errors.password}
                  sx={{ marginTop: "25px" }}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Mật khẩu
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type="password"
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Mật khẩu"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth sx={{ marginTop: "25px" }}>
                  <InputLabel htmlFor="outlined-adornment-role">
                    Phân cấp
                  </InputLabel>
                  <Select
                    id="outlined-adornment-role"
                    value={values.role}
                    name="role"
                    label="Phân cấp"
                    onChange={handleChange}
                  >
                    <MenuItem value={"district_officer"}>
                      Cán bộ cấp Quận
                    </MenuItem>
                    <MenuItem value={"ward_officer"}>
                      Cán bộ cấp Phường
                    </MenuItem>
                  </Select>
                  {touched.role && errors.role && (
                    <FormHelperText error id="standard-weight-helper-text-role">
                      {errors.role}
                    </FormHelperText>
                  )}
                </FormControl>

                {/* {selectedRole === "district_officer" && (
                  <FormControl fullWidth sx={{ marginTop: "25px" }}>
                    <InputLabel htmlFor="outlined-adornment-district">
                      Quận
                    </InputLabel>
                    <Select
                      id="outlined-adornment-district"
                      value={values.assignArea}
                      name="assignArea"
                      label="Quận"
                      onChange={handleChange}
                    >
                      {districtList.map((district) => (
                        <MenuItem key={district._id} value={district._id}>
                          {district.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.assignArea && errors.assignArea && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-district"
                      >
                        {errors.assignArea}
                      </FormHelperText>
                    )}
                  </FormControl>
                )} */}

                {/* {selectedRole === "ward_officer" && (
                  <>
                    <FormControl fullWidth sx={{ marginTop: "25px" }}>
                      <InputLabel htmlFor="outlined-adornment-district">
                        Quận
                      </InputLabel>
                      <Select
                        id="outlined-adornment-district"
                        value={values.district}
                        name="district"
                        label="Quận"
                        onChange={(e) => {
                          handleChange(e);
                          setSelectedDistrict(e.target.value); // Update selectedRole
                        }}
                      >
                        {districtList.map((district) => (
                          <MenuItem key={district._id} value={district._id}>
                            {district.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.district && errors.district && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-district"
                        >
                          {errors.district}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl fullWidth sx={{ marginTop: "25px" }}>
                      <InputLabel htmlFor="outlined-adornment-ward">
                        Phường
                      </InputLabel>
                      <Select
                        id="outlined-adornment-ward"
                        value={values.assignArea}
                        name="assignArea"
                        label="Phường"
                        onChange={handleChange}
                      >
                        {wardList.map((ward) => (
                          <MenuItem key={ward._id} value={ward._id}>
                            {ward.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.assignArea && errors.assignArea && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-ward"
                        >
                          {errors.assignArea}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </>
                )} */}
                <Box width="10%" margin={2}>
                  <Button
                    disableElevation
                    // disabled={isSubmitting}
                    fullWidth
                    size="medium"
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Tạo
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </MainCard>
    </>
  );
};

export default CreateAccount;
