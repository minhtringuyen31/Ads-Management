import { ArrowBack } from '@mui/icons-material';
import { Box, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import useHttp from 'hooks/use-http';
import { getLocationDetail } from 'lib/api';
import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import MapContext from 'store/dashboard/map-context';
import AdsBoardListBox from './AdsBoardListBox';

const LocationDetailBox = (props) => {
  const mapCtx = useContext(MapContext);
  const handleClick = () => {
    mapCtx.removeLocationDetail();
  };

  const {
    sendRequest,
    status,
    data: loadedLocationDetail,
    error,
  } = useHttp(getLocationDetail, true);

  useEffect(() => {
    sendRequest(mapCtx.locationDetail);
  }, [sendRequest, mapCtx.locationDetail]);

  if (error) {
    return null;
  }

  if (status === 'completed') {
    return (
      <Grid container spacing={1} height='80vh' sx={{ width: '100%' }}>
        <IconButton
          sx={{
            position: 'absolute',
          }}
          onClick={handleClick}
        >
          <ArrowBack />
        </IconButton>
        <Grid
          item
          lg={12}
          xs={12}
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          marginBottom='20px'
        >
          <Typography
            variant='h3'
            style={{
              marginBottom: '10px',
            }}
          >
            Thông tin địa điểm
          </Typography>

          <CardMedia
            component='img'
            height='140'
            sx={{ width: '80%' }}
            image={loadedLocationDetail.image[0]}
            alt='Location Image'
            style={{
              borderRadius: '10px',
            }}
          />
        </Grid>
        <Box marginX='20px'>
          <Grid container spacing={1}>
            <Grid
              item
              lg={12}
              xs={12}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              gap='10px'
            >
              <Typography variant='h4'>
                {loadedLocationDetail.ads_type.label}
              </Typography>
              <Box
                border={1}
                borderColor={loadedLocationDetail.is_planned ? 'green' : 'red'}
                color={loadedLocationDetail.is_planned ? 'green' : 'red'}
                borderRadius='10px'
                padding='5px'
              >
                {loadedLocationDetail.is_planned
                  ? 'Đã quy hoạch'
                  : 'Chưa quy hoạch'}
              </Box>
            </Grid>
            <Grid
              item
              lg={12}
              xs={12}
              display='flex'
              flexDirection='column'
              gap='5px'
            >
              <Typography>
                {loadedLocationDetail.location_type.label}
              </Typography>
              <Typography>{loadedLocationDetail.address}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid
          item
          lg={12}
          xs={12}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <AdsBoardListBox adsBoardsData={loadedLocationDetail.adsboards} />
        </Grid>
      </Grid>
    );
  }
};

AdsBoardListBox.propTypes = {
  adsBoardsData: PropTypes.array, // Change this to expect an array
};

export default LocationDetailBox;
