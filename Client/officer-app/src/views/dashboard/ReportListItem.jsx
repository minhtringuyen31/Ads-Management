import { ExploreOutlined } from '@mui/icons-material';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';
import MainCard from 'ui-component/cards/MainCard';
import { adsBoardTestData } from './DashboardData/data';

const ReportListItem = (props) => {
  const handleClick = () => {
    if (props.data.report_form === 'location') {
      props.handleToggle(props.data.related_to);
    } else {
      const location = adsBoardTestData.ads_boards.filter(
        (ads_board) => ads_board.id === props.data.related_to
      );
      props.handleToggle(location[0].location_id);
    }
  };
  
  const getBackgroundColor = (reportForm) => {
    if (reportForm === 'troubleshooting') {
      return '#a2d2ff';
    } else if (reportForm === 'report') {
      return '#ffc8dd';
    } else {
      return '#80ed99';
    }
  };

  const getTitle = (reportForm) => {
    if (reportForm === 'troubleshooting') {
      return 'Giải đáp thắc mắc';
    } else if (reportForm === 'report') {
      return 'Báo cáo vi phạm';
    } else {
      return 'Đóng góp ý kiến';
    }
  };
  return (
    <MainCard
      style={{
        margin: '30px',
        borderWidth: 'thick',
        borderColor: 'black',
        backgroundColor: getBackgroundColor(props.data.report_form),
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
                {moment.utc(props.data.created_at).fromNow()}
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
  handleToggle: PropTypes.func,
};

export default ReportListItem;
