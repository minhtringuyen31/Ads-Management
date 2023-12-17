import PropTypes from 'prop-types';
import { useMemo, useReducer } from 'react';
import MapContext from './map-context';
import { useCallback } from 'react';

const defaultMapState = {
  location: {
    lat: 0,
    lng: 0,
    zoom: 0,
  },
  locationDetail: null,
};

const mapReducer = (state, action) => {
  switch (action.type) {
    case 'ZOOM':
      return {
        location: {
          lat: action.data.lat,
          lng: action.data.lng,
          zoom: action.data.zoom,
        },
        locationDetail: state.locationDetail,
      };
    case 'LOCATE':
      return {
        location: {
          lat: state.lat,
          lng: state.lng,
          zoom: state.zoom,
        },
        locationDetail: action.data,
      };
    case 'REMOVE':
      return {
        location: {
          lat: state.lat,
          lng: state.lng,
          zoom: state.zoom,
        },
        locationDetail: null,
      };
    default:
      return defaultMapState;
  }
};

const MapProvider = (props) => {
  const [mapState, dispatchMapAction] = useReducer(mapReducer, defaultMapState);

  // const setZoomToMap = (data) => {
  //   dispatchMapAction({ type: 'ZOOM', data: data });
  // };
  // const setLocationDetailData = (data) => {
  //   dispatchMapAction({ type: 'LOCATE', data: data });
  // };
  // const removeLocationDetailData = () => {
  //   dispatchMapAction({ type: 'REMOVE' });
  // };

  const setZoomToMap = useCallback((data) => {
    dispatchMapAction({ type: 'ZOOM', data: data });
  }, [dispatchMapAction]);

  const setLocationDetailData = useCallback((data) => {
    dispatchMapAction({ type: 'LOCATE', data: data });
  }, [dispatchMapAction]);

  const removeLocationDetailData = useCallback(() => {
    dispatchMapAction({ type: 'REMOVE' });
  }, [dispatchMapAction]);

  // const mapContext = {
  //   location: mapState.location,
  //   locationDetail: mapState.locationDetail,
  //   setZoom: setZoomToMap,
  //   setLocationDetail: setLocationDetailData,
  //   removeLocationDetail: removeLocationDetailData,
  // };

  const mapContext = useMemo(
    () => ({
      location: mapState.location,
      locationDetail: mapState.locationDetail,
      setZoom: setZoomToMap,
      setLocationDetail: setLocationDetailData,
      removeLocationDetail: removeLocationDetailData,
    }),
    [
      mapState.location,
      mapState.locationDetail,
      setZoomToMap,
      setLocationDetailData,
      removeLocationDetailData,
    ]
  );

  return (
    <MapContext.Provider value={mapContext}>
      {props.children}
    </MapContext.Provider>
  );
};

MapProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MapProvider;
