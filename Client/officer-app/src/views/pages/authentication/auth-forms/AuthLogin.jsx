import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import useHttp from 'hooks/use-http';
import { login, rootApi } from 'lib/api';
import { AuthenticationActions } from 'redux/auth/authentication-slice';
import { StoreUser } from 'store/auth/auth-config';

// ============================|| FIREBASE - LOGIN ||============================ //

const Login = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();
  const { sendRequest, status, data: loadedAuth, error } = useHttp(login, true);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (value, { setStatus, setErrors }) => {
    try {
      const response = await axios.post(`${rootApi}/auth/login`, {
        loginCredential: value.email,
        password: value.password,
      });
      const data = response.data;

      dispatch(
        AuthenticationActions.login({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );

      StoreUser(data.user);

      navigate('/dashboard');

      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
      setErrors({ submit: 'Thông tin đâng nhập không đúng' });
    }
  };

  if (error) {
    console.log(error);
    return;
  }

  if (status === 'completed') {
  }

  return (
    <>
      <Grid container direction='column' justifyContent='center' spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          ></Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems='center'
          justifyContent='center'
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant='subtitle1'>
              Đăng nhập với tài khoản của bạn
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Email không hợp lệ')
            .max(255)
            .required('Email không được để trống'),
          password: Yup.string()
            .max(255)
            .min(6, 'Mât khẩu phải có ít nhất 6 ký tự')
            .required('Mật khẩu không được để trống'),
        })}
        // onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        //   try {
        //     if (scriptedRef.current) {
        //       setStatus({ success: true });
        //       setSubmitting(false);
        //     }
        //   } catch (err) {
        //     console.error(err);
        //     if (scriptedRef.current) {
        //       setStatus({ success: false });
        //       setErrors({ submit: err.message });
        //       setSubmitting(false);
        //     }
        //   }
        // }}
        onSubmit={(values, { setStatus, setErrors }) => {
          handleSubmit(values, { setStatus, setErrors });
          return false;
        }}
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
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor='outlined-adornment-email-login'>
                Địa chỉ email
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-email-login'
                type='email'
                value={values.email}
                name='email'
                onBlur={handleBlur}
                onChange={handleChange}
                label='Địa chỉ email'
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-email-login'
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor='outlined-adornment-password-login'>
                Mật khẩu
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password-login'
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name='password'
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                      size='large'
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Mật khẩu'
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-password-login'
                >
                  {errors.password}
                </FormHelperText>
              )}
              {errors.submit && (
                <Box>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
            </FormControl>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name='checked'
                    color='primary'
                  />
                }
                label='Remember me'
              />

              <Button
                variant='text'
                onClick={() => navigate('/forgot-password')}
                sx={{
                  '&:hover': {
                    textDecoration: 'underline',
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                <Typography variant='subtitle1' color='secondary'>
                  Quên mật khẩu?
                </Typography>
              </Button>
            </Stack>

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  color='secondary'
                >
                  Đăng nhập
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
