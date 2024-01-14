// material-ui
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import AuthCardWrapper from "../AuthCardWrapper";
import AuthWrapper1 from "../AuthWrapper1";
import AuthLogin from "../auth-forms/AuthLogin";

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AuthWrapper1>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sx={{ mb: 3 }}>
                    <Typography
                      fontWeight="bold"
                      fontSize="clamp(1rem, 2rem, 2.25rem)"
                      color={theme.palette.secondary.dark}
                      // onClick={() => navigate("/home")}
                      // sx={{
                      //   "&:hover": {
                      //     color: primaryLight,
                      //     cursor: "pointer",
                      //   },
                      // }}
                    >
                      Quản lý quảng cáo
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems='center'
                          justifyContent='center'
                          spacing={1}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? 'h3' : 'h2'}
                          >
                            Chào mừng trở lại
                          </Typography>
                          <Typography
                            variant='caption'
                            fontSize='16px'
                            textAlign={matchDownSM ? 'center' : 'inherit'}
                          >
                            Nhập thông tin để đăng nhập
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid> */}
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      xs={12}
                    ></Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
