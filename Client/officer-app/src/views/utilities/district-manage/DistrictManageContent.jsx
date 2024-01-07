import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import DistrictList from './district/DistrictList';
import WardList from './ward/WardList';

const DistrictManageContent = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <MainCard>
          <DistrictList />
        </MainCard>
      </Grid>
      <Grid item xs={12} lg={6}>
        <MainCard>
          <WardList />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DistrictManageContent;
