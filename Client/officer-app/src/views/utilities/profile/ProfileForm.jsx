import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Typography,
} from "@mui/material";
import instance from "axiosConfig/axios-config";
import { Formik } from "formik";
import { rootApi } from "lib/api";
import { useState } from "react";
import { GetUser, StoreUser } from "store/auth/auth-config";
import AnimateButton from "ui-component/extended/AnimateButton";
import * as Yup from "yup";

const ProfileForm = () => {
  const user = GetUser();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (value, { setStatus, setErrors, resetForm }) => {
    try {
      const response = await instance.post(`${rootApi}/user/${user._id}`, {
        fullname: value.fullname,
        phone: value.phone,
        email: value.email,
      });
      StoreUser(response.data);
      setStatus({ success: true });
      setOpen(true);
      resetForm();
    } catch (error) {
      console.log(error);
      setErrors({ submit: error.message });
      setStatus({ success: false });
      resetForm();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  console.log(user);

  return (
    <>
      <Formik
        initialValues={{
          email: user.email,
          fullname: user.fullname,
          phone: user.phone,
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email không hợp lệ")
            .max(255)
            .required("Email không được để trống"),
          fullname: Yup.string()
            .max(255)
            .required("Họ và tên không được để trống"),
          phone: Yup.string()
            .max(10, "Số điện thoại không hợp lệ")
            .min(10, "Số điện thoại không hợp lệ")
            .required("Số điện thoại không được để trống"),
        })}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-fullname">
                    Họ và tên
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-fullname"
                    type="text"
                    value={values.fullname}
                    name="fullname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fullname && Boolean(errors.fullname)}
                    label="Họ và tên"
                    placeholder="Nhập họ và tên"
                  />
                  {touched.fullname && Boolean(errors.fullname) && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text--bottom"
                    >
                      {errors.fullname}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-phone">
                    Số điện thoại
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-phone"
                    type="number"
                    value={values.phone}
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                  />
                  {touched.phone && Boolean(errors.phone) && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text--bottom"
                    >
                      {errors.phone}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-email">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    type="text"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    label="Email"
                    placeholder="Nhập email"
                  />
                  {touched.email && Boolean(errors.email) && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text--bottom"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    color="primary"
                  >
                    <Typography
                      fontWeight="bold"
                      fontSize="clamp(1rem, 1.2rem, 1.5rem)"
                    >
                      Thay đổi
                    </Typography>
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Thay đổi thông tin thành công"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Thay đổi thông tin thành công
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileForm;
