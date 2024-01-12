import { ArrowBack } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import ReportMapContext from 'store/report-map/report-map-context';
import ReportList from './ReportList';

const ReportListBox = (props) => {
  const reportMapCtx = useContext(ReportMapContext);
  const handleClick = () => {
    reportMapCtx.removeReportsDetail();
  };

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
      >
        <Typography variant='h3'>Danh sách các báo cáo</Typography>
      </Grid>
      <Grid
        item
        lg={12}
        xs={12}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <ReportList reportListData={reportMapCtx.reportsDetail} />
      </Grid>
    </Grid>
  );
};

ReportList.propTypes = {
  reportListData: PropTypes.array,
};

export default ReportListBox;
