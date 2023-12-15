import { Box, Typography, Button, Divider } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const LocationInformation = () => (
  <Box
    position="relative"
    display="flex"
    flexDirection="column"
    // justifyContent="space-between"
    sx={{ height: "100%" }}
  >
    <img
      src="https://tourscanner.com/blog/wp-content/uploads/2022/06/fun-things-to-do-in-Ho-Chi-Minh-City-Vietnam.jpg"
      width="100%"
      height="225px"
    ></img>
    <Box margin="10px">
      <Typography variant="h6">Tòa nhà Bitexco</Typography>
      <Divider />
      <Box display="flex" alignItems="center" marginTop="5px">
        <LocationOnIcon />
        <Typography
          sx={{
            fontSize: "12px",
          }}
        >
          Bến Nghé, Quận 1, Thành phố Hồ Chí Minh
        </Typography>
      </Box>
    </Box>
    <Box
      display="flex"
      position="absolute"
      bottom="10px"
      marginX="auto"
      justifyContent="center"
      width="100%"
    >
      <Button
        variant="outlined"
        startIcon={<ReportIcon />}
        color="error"
        sx={{
          fontWeight: "bold",
        }}
      >
        Báo cáo vi phạm
      </Button>
    </Box>
  </Box>
);

export default LocationInformation;
