import { ArrowBack } from '@mui/icons-material';
import { Box, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import AdsBoardListBox from './AdsBoardListBox';

const LocationDetailBox = (props) => {
  return (
    <Grid container spacing={1} height='80vh' sx={{ width: '100%' }}>
      <IconButton
        sx={{
          position: 'absolute',
        }}
        onClick={props.onClose}
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
          image={props.locationDetail.image}
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
              {props.locationDetail.ads_type}
            </Typography>
            <Box
              border={1}
              borderColor={props.locationDetail.is_planned ? 'green' : 'red'}
              color={props.locationDetail.is_planned ? 'green' : 'red'}
              borderRadius='10px'
              padding='5px'
            >
              {props.locationDetail.is_planned
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
            <Typography>{props.locationDetail.area_type}</Typography>
            <Typography>
              {props.locationDetail.address}, {props.locationDetail.ward},{' '}
              {props.locationDetail.district}
            </Typography>
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
        <AdsBoardListBox adsBoardsData={props.locationDetail.ads_boards} />
      </Grid>
    </Grid>
  );
};

LocationDetailBox.propTypes = {
  locationDetail: PropTypes.object,
  onClose: PropTypes.func,
};

export default LocationDetailBox;
