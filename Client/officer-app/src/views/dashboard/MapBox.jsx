import { Grid, Typography } from '@mui/material';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

const MapBox = (props) => {
  const [centerPosition, setCenterPosition] = useState({
    lat: 0,
    lng: 0,
    zoom: 15,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyA98VCnr7mnpaKlZcq0RN6JoWlz1PmdKV8',
    libraries: ['places'],
  });


  const originRef = useRef();
  const destinationRef = useRef();

  const calculateRoute = () => {};

  const clearRoute = () => {};

  useEffect(() => {
    setCenterPosition({
      lat: props.togglePosition.lat,
      lng: props.togglePosition.lng,
      zoom: props.togglePosition.zoom,
    });
  }, [props.togglePosition]);

  useEffect(() => {
    let latitude = 0;
    let longtitude = 0;

    props.data.locations.forEach((item, index) => {
      latitude += item.latitude;
      longtitude += item.longtitude;
    });

    setCenterPosition((prev) => {
      return {
        lat: latitude / props.data.locations.length,
        lng: longtitude / props.data.locations.length,
        zoom: 15,
      };
    });
  }, [props.data.locations]);

  if (!isLoaded) {
    return null;
  }

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container alignItems='center' justifyContent='space-between'>
            <Grid item>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={3.5}>
                  <Typography variant='h3'>Map</Typography>
                </Grid>
                <Grid item xs={12} lg={8.5}>
                  {/* <Box
                    p={4}
                    borderRadius='lg'
                    m={4}
                    bgColor='white'
                    boxShadow='-moz-initial'
                    minWidth='container.md'
                    zIndex='1'
                  >
                    <Stack
                      spacing={2}
                      display='flex'
                      flexDirection='row'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <Box flexGrow={1}>
                        <Autocomplete>
                          <Input
                            type='text'
                            placeholder='Origin'
                            ref={originRef}
                          />
                        </Autocomplete>
                      </Box>
                      <Box flexGrow={1}>
                        <Autocomplete>
                          <Input
                            type='text'
                            placeholder='Destination'
                            ref={destinationRef}
                          />
                        </Autocomplete>
                      </Box>
                      <ButtonGroup>
                        <Button
                          colorScheme='pink'
                          type='submit'
                          onClick={calculateRoute}
                        >
                          Calculate Route
                        </Button>
                        <IconButton
                          aria-label='center back'
                          onClick={clearRoute}
                        >
                          <Close />
                        </IconButton>
                      </ButtonGroup>
                    </Stack>
                    <Stack spacing={4} mt={4} justifyContent='space-between'>
                      <Typography>Distance: </Typography>
                      <Typography>Duration: </Typography>
                      <IconButton aria-label='center back' onClick={() => {}}>
                        <NearMe />
                      </IconButton>
                    </Stack>
                  </Box> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            borderRadius: '20px',
          }}
        >
          <div style={{ width: '100%', height: '70vh' }}>
            <GoogleMap
              center={{ lat: centerPosition.lat, lng: centerPosition.lng }}
              zoom={centerPosition.zoom}
              mapContainerStyle={{ width: '100%', height: '100%' }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {props.data.locations.map((location) => (
                <Marker
                  key={location.id}
                  position={{
                    lat: location.latitude,
                    lng: location.longtitude,
                  }}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 12,
                    fillColor: `${location.isSolvedAll ? 'blue': 'red'}`,
                    fillOpacity: 1,
                    strokeWeight: 0,
                  }}
                  label={{
                    text: 'QC',
                    color: 'white',
                  }}
                />
              ))}
            </GoogleMap>
          </div>
        </Grid>
      </Grid>
    </MainCard>
  );
};

MapBox.propTypes = {
  data: PropTypes.shape({
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
        zoom: PropTypes.number,
      })
    ),
  }),
  togglePosition: PropTypes.object,
};

export default MapBox;
