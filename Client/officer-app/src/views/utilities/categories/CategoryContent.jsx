import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import AdsBoardTypeList from './ads_board_type/AdsBoardTypeList';
import AdsTypeList from './ads_type/AdsTypeList';
import LocationTypeList from './location_type/LocationTypeList';

const CategoryContent = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={12}>
        <MainCard>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={4}>
              <AdsBoardTypeList />
            </Grid>
            <br />
            <Grid item xs={12} lg={4}>
              <AdsTypeList />
            </Grid>
            <br />
            <Grid item xs={12} lg={4}>
              <LocationTypeList />
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default CategoryContent;
