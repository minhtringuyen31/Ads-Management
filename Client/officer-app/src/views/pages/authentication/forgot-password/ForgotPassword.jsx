import { useTheme } from '@emotion/react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { rootApi } from 'lib/api';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthWrapper1 from '../AuthWrapper1';

const steps = ['Nhập email', 'Kiểm tra OTP ', 'Nhập mật khẩu mới'];

const ForgotPassword = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [activeStep, setActiveStep] = useState(0);
  const navigator = useNavigate();
  const [error, setError] = useState(null);
  const emailRef = useRef();
  const otpRef = useRef();
  const newPasswordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  const handleStep0 = async () => {
    try {
      if (emailRef.current.value === '') {
        setError('Vui lòng nhập email');
      } else if (emailRef.current.value.includes('@')) {
        setEmail(emailRef.current.value);

        await axios.post(`${rootApi}/forgot-password`, {
          email: emailRef.current.value,
        });
        setError(null);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        throw new Error('Email không hợp lệ');
      }
    } catch (error) {
      throw new Error('Email không hợp lệ');
    }
  };

  const handleStep1 = async () => {
    try {
      if (otpRef.current.value === '') {
        setError('Vui lòng nhập mã OTP');
      } else if (otpRef.current.value.length === 6) {
        await axios.post(`${rootApi}/otp-check`, {
          email: email,
          otp: otpRef.current.value,
        });
        setError(null);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        throw new Error('Mã OTP phải có 6 chữ số');
      }
    } catch (error) {
      throw new Error('Mã OTP không hợp lệ');
    }
  };

  const handleStep2 = async () => {
    try {
      if (newPasswordRef.current.value === '') {
        setError('Vui lòng nhập mật khẩu mới');
      } else if (newPasswordRef.current.value.length >= 6) {
        await axios.post(`${rootApi}/recovery`, {
          email: email,
          newPassword: newPasswordRef.current.value,
        });
        setError(null);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        navigator('/login');
      } else {
        setError('Mật khẩu phải có ít nhất 6 ký tự');
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const handleNext = async () => {
    try {
      switch (activeStep) {
        case 0:
          await handleStep0();
          break;
        case 1:
          await handleStep1();
          break;
        case 2:
          await handleStep2();
          break;
        default:
          break;
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleBackToLogin = () => {
    navigator('/login');
  };

  return (
    <AuthWrapper1>
      <Grid
        container
        direction='column'
        justifyContent='flex-end'
        sx={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            sx={{ minHeight: 'calc(100vh - 68px)' }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper
                sx={{
                  maxWidth: { xs: 700, lg: 800 },
                }}
              >
                <Grid
                  container
                  spacing={3}
                  alignItems='center'
                  justifyContent='center'
                >
                  <Grid
                    container
                    item
                    spacing={2}
                    alignItems='center'
                    justifyContent='center'
                    xs={12}
                  >
                    <Grid item sx={{ mb: 3 }}>
                      <Typography
                        fontWeight='bold'
                        fontSize='clamp(1rem, 2rem, 2.25rem)'
                        color={theme.palette.secondary.dark}
                      >
                        RideNow
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        container
                        direction={matchDownSM ? 'column-reverse' : 'row'}
                        alignItems='center'
                        justifyContent='center'
                      >
                        <Grid item>
                          <Stack
                            alignItems='center'
                            justifyContent='center'
                            spacing={1}
                          >
                            <Typography
                              color={theme.palette.secondary.main}
                              gutterBottom
                              variant={matchDownSM ? 'h3' : 'h2'}
                            >
                              Quên mật khẩu
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                          return (
                            <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                            </Step>
                          );
                        })}
                      </Stepper>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        direction='column'
                        alignItems='center'
                        xs={12}
                      >
                        {activeStep === 0 && (
                          <>
                            <Grid item xs={12}>
                              <Typography
                                color={theme.palette.secondary.main}
                                gutterBottom
                                variant={matchDownSM ? 'h3' : 'h2'}
                              >
                                Nhập email
                              </Typography>
                            </Grid>
                            <Box sx={{ height: 20 }} />
                            <Grid item xs={12} width='100%'>
                              <OutlinedInput
                                name='email'
                                inputRef={emailRef}
                                fullWidth
                                placeholder='Nhập email của bạn'
                                type='email'
                              />
                            </Grid>
                          </>
                        )}
                        {activeStep === 1 && (
                          <>
                            <Grid item xs={12}>
                              <Typography
                                color={theme.palette.secondary.main}
                                gutterBottom
                                variant={matchDownSM ? 'h3' : 'h2'}
                              >
                                Xác nhận OTP
                              </Typography>
                            </Grid>
                            <Box sx={{ height: 20 }} />
                            <Grid item xs={12} width='100%'>
                              <OutlinedInput
                                name='otp'
                                inputRef={otpRef}
                                fullWidth
                                placeholder='Nhập mã OTP'
                                type='text'
                              />
                            </Grid>
                          </>
                        )}
                        {activeStep === 2 && (
                          <>
                            <Grid item xs={12}>
                              <Typography
                                color={theme.palette.secondary.main}
                                gutterBottom
                                variant={matchDownSM ? 'h3' : 'h2'}
                              >
                                Nhập mật khẩu mới
                              </Typography>
                            </Grid>
                            <Box sx={{ height: 20 }} />
                            <Grid item xs={12} width='100%'>
                              <OutlinedInput
                                name='newPassword'
                                inputRef={newPasswordRef}
                                fullWidth
                                placeholder='Nhập mật khẩu mới'
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                  <InputAdornment position='end'>
                                    <IconButton
                                      aria-label='toggle password visibility'
                                      onClick={handleClickShowPassword}
                                      edge='end'
                                      size='large'
                                    >
                                      {showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                            </Grid>
                          </>
                        )}
                        {error && (
                          <Grid item xs={12}>
                            <Typography
                              color={theme.palette.error.main}
                              gutterBottom
                              variant='h6'
                            >
                              {error}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                      <Box sx={{ height: 20 }} />
                      <Grid item container xs={12}>
                        <Grid item xs={6} lg={6}>
                          <Button
                            color='inherit'
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            variant='outlined'
                          >
                            Quay lại
                          </Button>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          lg={6}
                          display='flex'
                          justifyContent='flex-end'
                        >
                          <Button
                            onClick={handleNext}
                            variant='outlined'
                            type='submit'
                          >
                            {activeStep === steps.length ? 'Đăng nhập' : 'Tiếp'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Button
                      variant='contained'
                      color='primary'
                      sx={{
                        backgroundColor: '#1976d2',
                        '&:hover': {
                          backgroundColor: '#115293',
                        },
                        fontSize: '16px',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        height: '30px',
                      }}
                      onClick={handleBackToLogin}
                    >
                      Quay lại trang đăng nhập
                    </Button>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default ForgotPassword;
