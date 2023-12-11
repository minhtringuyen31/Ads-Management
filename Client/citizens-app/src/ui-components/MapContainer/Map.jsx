import { useMemo, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// import dotenv from "dotenv";

// dotenv.config();

const Map = ({ setShape, openDrawer }) => {
  const center = useMemo(() => ({ lat: 10.823099, lng: 106.629662 }), []);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
    googleMapsApiKey: "AIzaSyA98VCnr7mnpaKlZcq0RN6JoWlz1PmdKV8",
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
        position="absolute"
        sx={{
          width: "100%",
          height: "100%",
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
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent="end"
        alignItems="center"
        gap="5px"
        // width="100vw"
        // height="100vh"
        bgcolor="#e2e8f0"
        position={"absolute"}
        right={2}
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
    </Box>
  );
};

export default Map;
