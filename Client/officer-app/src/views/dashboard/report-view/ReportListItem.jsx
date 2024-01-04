import { ExploreOutlined } from '@mui/icons-material';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import moment from 'moment';
import 'moment/locale/vi';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import MapContext from 'store/dashboard/map-context';
import MainCard from 'ui-component/cards/MainCard';

moment.locale('vi');

const ReportListItem = (props) => {
  const mapCtx = useContext(MapContext);
  const handleClick = () => {
    if (props.data.type === 'board') {
      mapCtx.setZoom({
        lat: props.data.board.location.coordinate.lat,
        lng: props.data.board.location.coordinate.lng,
        zoom: 18,
      });
    } else {
      mapCtx.setZoom({
        lat: props.data.location.coordinate.lat,
        lng: props.data.location.coordinate.lng,
        zoom: 18,
      });
    }
  };

  const getBorderColor = (reportForm) => {
    if (reportForm === 'troubleshooting') {
      return '#a2d2ff';
    } else if (reportForm === 'denounce') {
      return '#ffc8dd';
    } else {
      return '#80ed99';
    }
  };

  const getTitle = (reportForm) => {
    if (reportForm === 'troubleshooting') {
      return 'Giải đáp thắc mắc';
    } else if (reportForm === 'denounce') {
      return 'Báo cáo vi phạm';
    } else {
      return 'Đóng góp ý kiến';
    }
  };

  return (
    <MainCard
      style={{
        border: '2px solid #000000',
        margin: '30px',
        borderColor: getBorderColor(props.data.report_form),
      }}
    >
      <Grid item lg={12} xs={12}>
        <Box sx={{ width: '100%', cursor: 'pointer' }}>
          <Grid sx={{ marginBottom: '10px' }}>
            <Typography variant='h3'>
              {getTitle(props.data.report_form)}
            </Typography>
          </Grid>
          <Grid sx={{ marginBottom: '10px' }}>
            <Typography>{props.data.username}</Typography>
          </Grid>
          <Grid sx={{ marginBottom: '10px' }}>
            <Typography>{props.data.phone_number}</Typography>
          </Grid>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={12} lg={3}>
              <IconButton
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  color: 'black',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  boxShadow: '-moz-initial',
                }}
                onClick={handleClick}
              >
                <ExploreOutlined />
              </IconButton>
            </Grid>
            <Grid item xs={12} lg={9}>
              <Typography fontSize={'12px'} textAlign='right'>
                {moment.utc(props.data.createdAt).fromNow()}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </MainCard>
  );
};

ReportListItem.propTypes = {
  data: PropTypes.object,
};

export default ReportListItem;
