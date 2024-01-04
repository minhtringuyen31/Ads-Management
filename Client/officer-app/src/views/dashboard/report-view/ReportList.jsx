import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ReportListItem from './ReportListItem';

const ReportList = (props) => {
  return (
    <Grid
      item
      sx={{
        height: '60vh',
        overflow: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {props.data.map((report) => {
        return (
          <ReportListItem
            key={report._id}
            data={report}
            handleToggle={props.handleToggle}
          />
        );
      })}
    </Grid>
  );
};

ReportList.propTypes = {
  handleToggle: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
      zoom: PropTypes.number,
    })
  ),
};

export default ReportList;
