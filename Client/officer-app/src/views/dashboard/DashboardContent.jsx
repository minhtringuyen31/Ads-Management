import { Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MapContext from 'store/dashboard/map-context';
import MainCard from 'ui-component/cards/MainCard';
import LocationDetailBox from './location-view/LocationDetailBox';
import MapBox from './map-view/MapBox';

const DashboardContent = () => {
  const mapCtx = useContext(MapContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={7.5}>
        <MapBox />
      </Grid>
      <Grid item xs={12} lg={4.5}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={12} md={6} sm={6} xs={12}>
            <MainCard>
              {mapCtx.locationDetail ? (
                <LocationDetailBox />
              ) : (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    minHeight: '75vh',
                  }}
                >
                  <Typography variant='h4'>
                    Chọn một địa điểm để xem thông tin
                  </Typography>
                </Grid>
              )}
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardContent;
