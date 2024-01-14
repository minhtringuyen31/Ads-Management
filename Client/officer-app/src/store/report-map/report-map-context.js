import React from 'react';

const ReportMapContext = React.createContext({
  location: {
    lat: 0,
    lng: 0,
    zoom: 0,
  },
  reportsDetail: null,
  setZoom: (data) => {},
  setReportsDetail: (data) => {},
  removeReportsDetail: () => {},
});

export default ReportMapContext;
