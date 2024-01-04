import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Slide,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { reportTestData } from 'views/dashboard/DashboardData/data';
import Form from './Form';

const ReportDetail = () => {
  const [formOpen, setFormOpen] = useState({
    isOpened: false,
    lg1: 5,
    lg2: 7,
    lg3: 0,
  });

  const handleFormOpen = () => {
    setFormOpen({
      isOpened: true,
      lg1: 3,
      lg2: 5,
      lg3: 4,
    });
  };

  const handleFormClose = () => {
    setFormOpen({
      isOpened: false,
      lg1: 5,
      lg2: 7,
      lg3: 0,
    });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={formOpen.lg1}>
        <MainCard>
          <ImageList
            sx={{
              width: '100%',
              height: '70vh',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '12px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
              borderRadius: '10px',
            }}
            cols={1}
          >
            <ImageListItem key={1}>
              <img
                alt='test1'
                srcSet={`${reportTestData.reports[0].images[0]}`}
                src={`${reportTestData.reports[0].images[0]}`}
                loading='lazy'
              />
            </ImageListItem>
            <ImageListItem key={2}>
              <img
                alt='test2'
                srcSet={`${reportTestData.reports[0].images[1]}`}
                src={`${reportTestData.reports[0].images[1]}`}
                loading='lazy'
              />
            </ImageListItem>
          </ImageList>
        </MainCard>
      </Grid>
      <Grid item xs={12} lg={formOpen.lg2}>
        <MainCard>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3} sx={{ height: '10vh' }}>
              <Grid item xs={12} lg={6}>
                <Typography variant='h4' gutterBottom>
                  Nội dung báo cáo
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6} container justifyContent='flex-end'>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#115293',
                    },
                    padding: '10px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    height: '30px',
                  }}
                  onClick={handleFormOpen}
                >
                  Xử lý báo cáo
                </Button>
              </Grid>
            </Grid>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <Typography variant='h6' color='primary' gutterBottom>
                Thông tin người gửi
              </Typography>
              <Typography variant='subtitle1'>
                Họ tên: {reportTestData.reports[0].username}
              </Typography>
              <Typography variant='subtitle1'>
                Email: {reportTestData.reports[0].email}
              </Typography>
              <Typography variant='subtitle1'>
                Số điện thoại: {reportTestData.reports[0].phone_number}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant='h6' color='primary' gutterBottom>
                Thông tin báo cáo
              </Typography>
              <Typography variant='subtitle1'>
                Loại báo cáo: {reportTestData.reports[0].report_form}
              </Typography>
              <Typography variant='subtitle1'>
                Địa chỉ: {reportTestData.reports[0].related_to}
              </Typography>
              <Typography variant='subtitle1'>
                Báo cáo liên quan đến: {reportTestData.reports[0].type}
              </Typography>

              <Typography variant='subtitle1'>
                Operation: {reportTestData.reports[0].operation}
              </Typography>
              <Typography variant='subtitle1'>
                Thời gian gửi:{' '}
                {new Date(
                  reportTestData.reports[0].created_at
                ).toLocaleString()}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant='h6' color='primary' gutterBottom>
                Nội dung
              </Typography>
              <Typography variant='body1' gutterBottom>
                {reportTestData.reports[0].report_content
                  .split('\n')
                  .map((line) => (
                    <Fragment key={line}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
              </Typography>
            </Box>
          </Box>
        </MainCard>
      </Grid>
      <Slide
        direction={formOpen.isOpened ? 'left' : 'right'}
        in={formOpen.isOpened}
        mountOnEnter
        unmountOnExit
      >
        <Grid item xs={12} lg={formOpen.lg3}>
          <MainCard>
            <Grid container spacing={1} height='80vh' sx={{ width: '100%' }}>
              <IconButton
                sx={{
                  position: 'absolute',
                }}
                onClick={handleFormClose}
              >
                <CloseIcon />
              </IconButton>
              <Grid
                item
                lg={12}
                xs={12}
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
              >
                <Typography
                  variant='h3'
                  style={{
                    marginBottom: '10px',
                  }}
                >
                  Form phản hồi
                </Typography>
                <br />
                <Form />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Slide>
    </Grid>
  );
};

export default ReportDetail;
