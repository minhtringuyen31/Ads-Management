import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, Typography } from '@mui/material';
import useHttp from 'hooks/use-http';
import { getAllReports } from 'lib/api';
import { useEffect, useState } from 'react';
import ReportList from './ReportList';

const ReportReviewBox = (props) => {
  const [value, setValue] = useState('not-solved');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    sendRequest,
    status,
    data: loadedReports,
    error,
  } = useHttp(getAllReports, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (error) {
    return null;
  }

  if (status === 'completed') {
    const pendingData = loadedReports.filter(
      (report) => report.status === 'pending'
    );
    const solvedData = loadedReports.filter(
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
                  <Tab label='Chưa giải quyết' value='not-solved' />
                  <Tab label='Đã giải quyết' value='solved' />
                </TabList>
              </Box>
              <TabPanel
                value='not-solved'
                sx={{
                  padding: 0,
                  width: '100%',
                }}
              >
                <ReportList data={pendingData} />
              </TabPanel>
              <TabPanel
                value='solved'
                sx={{
                  padding: 0,
                  width: '100%',
                }}
              >
                <ReportList data={solvedData} />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    );
  }
};

export default ReportReviewBox;
