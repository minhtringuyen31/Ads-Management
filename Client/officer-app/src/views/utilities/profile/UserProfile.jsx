import { Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import AuthCardWrapper from 'views/pages/authentication/AuthCardWrapper';
import ProfileForm from './ProfileForm';

const UserProfile = () => {
  return (
    <MainCard>
      <Grid
        container
        direction='column'
        justifyContent='flex-end'
        sx={{ minHeight: '50vh' }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            sx={{ minHeight: 'calc(100vh - 200px)' }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems='center'
                  justifyContent='center'
                >
                  <Grid item sx={{ mb: 1 }}>
                    <Typography
                      fontWeight='bold'
                      fontSize='clamp(1rem, 2rem, 2.25rem)'
                    >
                      Thông tin cá nhân
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <ProfileForm />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default UserProfile;
