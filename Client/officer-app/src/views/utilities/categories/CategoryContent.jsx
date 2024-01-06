import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import AdsBoardTypeList from './ads_board_type/AdsBoardTypeList';
import AdsTypeList from './ads_type/AdsTypeList';
import DistrictList from './district/DistrictList';
import LocationTypeList from './location_type/LocationTypeList';
import WardList from './ward/WardList';

const CategoryContent = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Grid item xs={6} lg={12}>
          <MainCard>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <DistrictList />
              </Grid>
              <Grid item xs={12} lg={6}>
                <WardList />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <br />
        <Grid item xs={6} lg={12}>
          <MainCard>
            <AdsBoardTypeList />
          </MainCard>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Grid item xs={6} lg={12}>
          <MainCard>
            <AdsTypeList />
          </MainCard>
        </Grid>
        <br />
        <Grid item xs={6} lg={12}>
          <MainCard>
            <LocationTypeList />
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CategoryContent;
