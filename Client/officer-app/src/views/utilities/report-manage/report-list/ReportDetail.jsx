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
import useHttp from 'hooks/use-http';
import { getReportDetail } from 'lib/api';
import { useContext, useEffect, useState } from 'react';
import ReportContext from 'store/report/report-context';
import MainCard from 'ui-component/cards/MainCard';
import ReportForm from './ReportForm';

const ReportDetail = () => {
  const reportCtx = useContext(ReportContext);
  const {
    sendRequest,
    status,
    data: loadedReportDetail,
    error,
  } = useHttp(getReportDetail, true);

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

  useEffect(() => {
    sendRequest(reportCtx.reportDetail);
  }, [sendRequest, reportCtx.reportDetail]);

  if (error) {
    return <p>{error}</p>;
  }

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  if (status === 'completed') {
    console.log(loadedReportDetail);
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
              {loadedReportDetail.image.length === 0 && (
                <MainCard
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Typography>
                    Không có hình ảnh được gửi kèm báo cáo
                  </Typography>
                </MainCard>
              )}
              {loadedReportDetail.image.map((image, index) => {
                return (
                  <ImageListItem key={index}>
                    <img
                      alt='test1'
                      srcSet={`${image}`}
                      src={`${image}`}
                      loading='lazy'
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </MainCard>
        </Grid>
        <Grid item xs={12} lg={formOpen.lg2}>
          <MainCard>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3} sx={{ height: '10vh' }}>
                <Grid item xs={6} lg={6}>
                  <Typography variant='h4' gutterBottom>
                    Nội dung báo cáo
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={6} container justifyContent='flex-end'>
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
                  Họ tên: {loadedReportDetail.username}
                </Typography>
                <Typography variant='subtitle1'>
                  Email: {loadedReportDetail.email}
                </Typography>
                <Typography variant='subtitle1'>
                  Số điện thoại: {loadedReportDetail.phone_number}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant='h6' color='primary' gutterBottom>
                  Thông tin báo cáo
                </Typography>
                <Typography variant='subtitle1'>
                  Loại báo cáo: {loadedReportDetail.report_form.label}
                </Typography>
                <Typography variant='subtitle1'>
                  Địa chỉ:{' '}
                  {loadedReportDetail.type === 'location'
                    ? loadedReportDetail.location.address
                    : loadedReportDetail.board.location.address}
                </Typography>
                <Typography variant='subtitle1'>
                  Hình thức:{' '}
                  {loadedReportDetail.type === 'location'
                    ? 'Báo cáo địa điểm'
                    : 'Báo cáo bảng quảng cáo'}
                </Typography>
                <Typography variant='subtitle1'>
                  Thời gian gửi:{' '}
                  {new Date(loadedReportDetail.createdAt).toLocaleString()}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant='h6' color='primary' gutterBottom>
                  Nội dung
                </Typography>
                <Typography variant='body1' gutterBottom>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: loadedReportDetail.report_content,
                    }}
                  ></div>
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
                  <ReportForm
                    operation={loadedReportDetail.operation}
                    reportStatus={loadedReportDetail.status}
                    reportId={loadedReportDetail._id}
                  />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Slide>
      </Grid>
    );
  }
};

export default ReportDetail;
