import {
  Box,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { reportTestData } from 'views/dashboard/DashboardData/data';

const ReportDetail = () => {
  const [status, setStatus] = useState(reportTestData.reports[0].status);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const updateStatus = () => {
    // Update the status in your data here
    console.log(`Updated status: ${status}`);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={5}>
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
      <Grid item xs={12} lg={7}>
        <MainCard>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3} sx={{ height: '10vh' }}>
              <Grid item xs={12} lg={6}>
                <Typography variant='h4' gutterBottom>
                  Nội dung báo cáo
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6} container justifyContent='flex-end'>
                <Select
                  value={status}
                  onChange={handleStatusChange}
                  sx={{ height: '30px' }}
                >
                  <MenuItem value={'pending'}>Pending</MenuItem>
                  <MenuItem value={'solved'}>Solved</MenuItem>
                  <MenuItem value={'not_solved'}>Not Solved</MenuItem>
                </Select>
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
                  .map((line, index) => (
                    <Fragment key={index}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
              </Typography>
            </Box>
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default ReportDetail;
