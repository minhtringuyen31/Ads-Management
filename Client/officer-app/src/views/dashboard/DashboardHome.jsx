import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import { Grid } from '@mui/material';
import { locationTestData, reportTestData } from './DashboardData/data';
import MapBox from './MapBox';
import ReportReviewBox from './ReportReviewBox';

const DashboardHome = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const [togglePosition, setTogglePosition] = useState({
    lat: 0,
    lng: 0,
    zoom: 18,
  });

  const handleTogglePosition = (positionIndex) => {
    const toggleLocation = locationTestData.locations.filter(
      (location) => location.id === positionIndex
    )[0];
    console.log(toggleLocation);
    setTogglePosition({
      lat: toggleLocation.latitude,
      lng: toggleLocation.longtitude,
      zoom: 18,
    });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} lg={8}>
        <MapBox
          isLoading={isLoading}
          data={locationTestData}
          reportData={reportTestData}
          togglePosition={togglePosition}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={12} md={6} sm={6} xs={12}>
            <ReportReviewBox
              data={reportTestData}
              handleToggle={handleTogglePosition}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardHome;
