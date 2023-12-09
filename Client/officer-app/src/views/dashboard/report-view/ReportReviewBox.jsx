import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
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
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid
        item
        lg={12}
        xs={12}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Typography variant='h2'>Báo cáo gần đây</Typography>
      </Grid>
      <Grid item lg={12} xs={12}>
        <Box sx={{ width: '100%', height: '70vh' }}>
          <TabContext
            value={value}
            sx={{
              width: '100%',
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} centered>
                <Tab label='Chưa giải quyết' value='not-resolved' />
                <Tab label='Đã giải quyết' value='solved' />
              </TabList>
            </Box>
            <TabPanel
              value='not-resolved'
              sx={{
                padding: 0,
                width: '100%',
              }}
            >
              <ReportList
                data={notResolvedData}
                handleToggle={props.handleToggle}
              />
            </TabPanel>
            <TabPanel
              value='solved'
              sx={{
                padding: 0,
                width: '100%',
              }}
            >
              <ReportList data={solvedData} handleToggle={props.handleToggle} />
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
};

ReportReviewBox.propTypes = {
  data: PropTypes.object,
  handleToggle: PropTypes.func,
};

export default ReportReviewBox;
