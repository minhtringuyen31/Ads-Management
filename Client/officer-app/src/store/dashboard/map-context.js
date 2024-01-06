import React from 'react';

const MapContext = React.createContext({
  location: {
    lat: 0,
    lng: 0,
    zoom: 0,
  },
  locationDetail: null,
  setZoom: (data) => {},
  setLocationDetail: (data) => {},
  removeLocationDetail: () => {},
});

export default MapContext;
