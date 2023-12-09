import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
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

const DashboardHome = () => {
  const [isLoading, setLoading] = useState(true);
  const [openLocationDetail, setOpenLocationDetail] = useState(null);
  useEffect(() => {
    setLoading(false);
    setOpenLocationDetail(null);
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

  const handleOpenLocationDetail = (id) => {
    setOpenLocationDetail(id);
  };

  const handleCloseLocationDetail = () => {
    setOpenLocationDetail(null);
  };

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

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} lg={8}>
        <MapBox
          isLoading={isLoading}
          data={locationTestData}
          reportData={reportTestData}
          togglePosition={togglePosition}
          onOpenDetail={handleOpenLocationDetail}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={12} md={6} sm={6} xs={12}>
            <MainCard>
              {console.log(openLocationDetail)}
              {openLocationDetail ? (
                <LocationDetailBox
                  locationDetail={locationDetailData(openLocationDetail)}
                  onClose={handleCloseLocationDetail}
                />
              ) : (
                <ReportReviewBox
                  data={reportTestData}
                  handleToggle={handleTogglePosition}
                />
              )}
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardHome;
