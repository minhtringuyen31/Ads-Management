import { Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MapContext from 'store/dashboard/map-context';
import MainCard from 'ui-component/cards/MainCard';
import {
  adsBoardTestData,
  districtTestData,
  locationTestData,
  reportTestData,
  wardTestData,
} from './DashboardData/data';
import LocationDetailBox from './location-view/LocationDetailBox';
import MapBox from './map-view/MapBox';
import ReportReviewBox from './report-view/ReportReviewBox';

const DashboardContent = () => {
  const mapCtx = useContext(MapContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const locationDetailData = (id) => {
    const locationDetail = locationTestData.locations.filter(
      (location) => location.id === id
    )[0];
    const ward = wardTestData.wards.filter(
      (ward) => ward.id === locationDetail.ward_id
    )[0];
    const district = districtTestData.districts.filter(
      (district) => district.id === ward.district_id
    )[0];
    const ads_boards = adsBoardTestData.ads_boards.filter(
      (ads_board) => ads_board.location_id === id
    );
    return {
      ...locationDetail,
      ward: ward.name,
      district: district.name,
      ads_boards: ads_boards,
    };
  };

  const reportData = {
    reports: reportTestData.reports.map((report) => {
      if (report.type === 'location') {
        const data = locationTestData.locations.filter(
          (location) => location.id === report.related_to
        )[0];
        return {
          ...report,
          lat: data.latitude,
          lng: data.longtitude,
        };
      } else {
        const ads_board_location = adsBoardTestData.ads_boards.filter(
          (ads_board) => ads_board.id === report.related_to
        );
        const data = locationTestData.locations.filter(
          (location) => location.id === ads_board_location[0].location_id
        )[0];
        return {
          ...report,
          lat: data.latitude,
          lng: data.longtitude,
        };
      }
    }),
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} lg={8}>
        <MapBox
          isLoading={isLoading}
          data={locationTestData}
          reportData={reportTestData}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={12} md={6} sm={6} xs={12}>
            <MainCard>
              {mapCtx.locationDetail ? (
                <LocationDetailBox
                  locationDetail={locationDetailData(mapCtx.locationDetail)}
                />
              ) : (
                <ReportReviewBox data={reportData} />
              )}
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardContent;
