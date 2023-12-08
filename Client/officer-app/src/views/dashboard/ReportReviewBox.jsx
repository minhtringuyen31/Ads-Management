import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import ReportList from './ReportList';

const ReportReviewBox = (props) => {
  const [value, setValue] = useState('not-resolved');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(typeof props.handleToggle);

  const notResolvedData = props.data.reports.filter(
    (report) => report.status === 'not_resolved'
  );
  const solvedData = props.data.reports.filter(
    (report) => report.status === 'solved'
  );

  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid
          item
          lg={12}
          xs={12}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Typography variant='h2'>Latest Report</Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Box sx={{ width: '100%', height: '70vh' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} centered>
                  <Tab label='NOT RESOLVED' value='not-resolved' />
                  <Tab label='SOLVED' value='solved' />
                </TabList>
              </Box>
              <TabPanel value='not-resolved'>
                <ReportList
                  data={notResolvedData}
                  handleToggle={props.handleToggle}
                />
              </TabPanel>
              <TabPanel value='solved'>
                <ReportList
                  data={solvedData}
                  handleToggle={props.handleToggle}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
};

ReportReviewBox.propTypes = {
  data: PropTypes.object,
  handleToggle: PropTypes.func,
};

export default ReportReviewBox;
