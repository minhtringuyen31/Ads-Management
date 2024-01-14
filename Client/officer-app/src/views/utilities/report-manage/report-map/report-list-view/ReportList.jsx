import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ReportItem from './ReportItem';

const ReportList = (props) => {
  return (
    <Grid
      item
      sx={{
        width: '100%',
        height: '70vh',
        overflow: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {props.reportListData.map((report) => {
        return <ReportItem key={report._id} data={report} />;
      })}
    </Grid>
  );
};

ReportList.propTypes = {
  reportListData: PropTypes.object,
};

export default ReportList;
