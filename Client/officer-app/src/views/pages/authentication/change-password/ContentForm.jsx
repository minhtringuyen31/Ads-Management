import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Typography,
} from '@mui/material';
import instance from 'axiosConfig/axios-config';
import { Formik } from 'formik';
import { rootApi } from 'lib/api';
import { useState } from 'react';
import { GetUser } from 'store/auth/auth-config';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';

const ContentForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const user = GetUser();

  const handleSuccess = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (value, { setStatus, setErrors, resetForm }) => {
    console.log(user);
    try {
      if (value.newPassword !== value.confirmPassword) {
        setErrors({ submit: 'Mật khẩu xác nhận không khớp' });
        setStatus({ success: false });
        return;
      } else if (value.newPassword === value.password) {
        setErrors({ submit: 'Mật khẩu mới không được trùng với mật khẩu cũ' });
        setStatus({ success: false });
        return;
      } else {
        await instance.post(`${rootApi}/change-password`, {
          oldPassword: value.password,
          newPassword: value.newPassword,
        });
        setStatus({ success: true });
        handleSuccess();
        resetForm();
      }
    } catch (error) {
      setStatus({ success: false });
      setErrors({ submit: error.message });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <>
      <Formik
        initialValues={{
          password: '',
          newPassword: '',
          confirmPassword: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .required('Vui lòng nhập mật khẩu cũ')
            .min(6, 'Mật khẩu cũ phải có ít nhất 6 ký tự'),
          newPassword: Yup.string()
            .required('Vui lòng nhập mật khẩu mới')
            .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
          confirmPassword: Yup.string()
            .required('Vui lòng nhập lại mật khẩu mới')
            .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
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
                  <InputLabel htmlFor='outlined-adornment-old-password'>
                    Mật khẩu cũ
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-old-password'
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    label='Mật khẩu cũ'
                    placeholder='Nhập mật khẩu cũ'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          edge='end'
                          size='large'
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.password && Boolean(errors.password) && (
                    <FormHelperText
                      error
                      id='standard-weight-helper-text--bottom'
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='outlined-adornment-new-password'>
                    Mật khẩu mới
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-new-password'
                    type={showNewPassword ? 'text' : 'password'}
                    value={values.newPassword}
                    name='newPassword'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    label='Mật khẩu mới'
                    placeholder='Nhập mật khẩu mới'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowNewPassword}
                          edge='end'
                          size='large'
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.newPassword && Boolean(errors.newPassword) && (
                    <FormHelperText
                      error
                      id='standard-weight-helper-text--bottom'
                    >
                      {errors.newPassword}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='outlined-adornment-confirm-password'>
                    Xác nhận mật khẩu
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-confirm-password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={values.confirmPassword}
                    name='confirmPassword'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    label='Xác nhận mật khẩu'
                    placeholder='Nhập lại mật khẩu mới'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmPassword}
                          edge='end'
                          size='large'
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.confirmPassword &&
                    Boolean(errors.confirmPassword) && (
                      <FormHelperText
                        error
                        id='standard-weight-helper-text--bottom'
                      >
                        {errors.confirmPassword}
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
                    size='large'
                    type='submit'
                    variant='contained'
                    disabled={isSubmitting}
                    color='primary'
                  >
                    <Typography
                      fontWeight='bold'
                      fontSize='clamp(1rem, 1.2rem, 1.5rem)'
                    >
                      Đổi mật khẩu
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
        message='Đổi mật khẩu thành công'
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Đổi mật khẩu thành công
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContentForm;
