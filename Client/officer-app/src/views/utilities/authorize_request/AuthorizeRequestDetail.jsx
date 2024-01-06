import {
  Button,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import useHttp from 'hooks/use-http';
import { getAllAuthorizeRequest } from 'lib/api';
import { useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';

const AuthorizeRequestDetail = () => {
  const {
    sendRequest,
    status,
    data: loadedAuthorizeRequest,
    error,
  } = useHttp(getAllAuthorizeRequest, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (error) {
    return <div>Có lỗi xảy ra</div>;
  }

  if (status === 'pending') {
    return <div>Đang tải dữ liệu</div>;
  }

  if (status === 'completed' && loadedAuthorizeRequest !== null) {
    console.log(loadedAuthorizeRequest);
    return (
      <Grid container spacing={1}>
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
              {loadedAuthorizeRequest.new_ads_board.image.map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    alt={item.id}
                    srcSet={`${item}`}
                    src={`${item}`}
                    loading='lazy'
                  />
                </ImageListItem>
              ))}
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
                    onClick={() => {}}
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
                <Typography variant='subtitle1'>Họ tên:</Typography>
                <Typography variant='subtitle1'>Email:</Typography>
                <Typography variant='subtitle1'>Số điện thoại:</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant='h6' color='primary' gutterBottom>
                  Thông tin báo cáo
                </Typography>
                <Typography variant='subtitle1'>Loại báo cáo:</Typography>
                <Typography variant='subtitle1'>Địa chỉ:</Typography>
                <Typography variant='subtitle1'>
                  Báo cáo liên quan đến:
                </Typography>

                <Typography variant='subtitle1'>Operation:</Typography>
                <Typography variant='subtitle1'>
                  Thời gian gửi:{' '}
                  {new Date('2021-10-10T14:48:00.000Z').toLocaleString()}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant='h6' color='primary' gutterBottom>
                  Nội dung
                </Typography>
                <Typography variant='body1' gutterBottom>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur corporis id mollitia commodi pariatur soluta,
                  ullam sint itaque vel cum eum vitae distinctio aperiam facere
                  dolore quas, adipisci perspiciatis quibusdam.
                </Typography>
              </Box>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    );
  }
};

export default AuthorizeRequestDetail;
