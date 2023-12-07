import { Box, Button } from "@mui/material";

const Map = ({ setShape, openDrawer }) => {
  const handleButtonClicked = (value) => () => {
    switch (value) {
      case 1:
        setShape(1);
        openDrawer();
        break;
      case 2:
        setShape(2);
        openDrawer();
        break;
      case 3:
        setShape(3);
        openDrawer();
        break;
      default:
        break;
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="5px"
      width="100vw"
      height="100vh"
      bgcolor="#e2e8f0"
    >
      <Button variant="outlined" onClick={handleButtonClicked(1)}>
        Location
      </Button>
      <Button variant="contained" onClick={handleButtonClicked(2)}>
        Report
      </Button>
      <Button variant="outlined" onClick={handleButtonClicked(3)}>
        Ads Panel
      </Button>
    </Box>
  );
};

export default Map;
