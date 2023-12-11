import { Box, Button } from "@mui/material";

const Map = ({ setShape, openDrawer }) => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  /** @type React.MutableRefObject<HTMLInputElement> */ const { isLoaded } =
    useLoadScript({
      googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
    });

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
    <Box>
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

      <Box
        sx={{
          width: "100%",
          height: "550px",
        }}
      >
        {isLoaded ? (
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Map;
