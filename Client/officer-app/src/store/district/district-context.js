import React from 'react';

const DistrictContext = React.createContext({
  districtId: null,
  districtName: null,
  setDistrictId: (data) => {},
  removeDistrictId: () => {},
});

export default DistrictContext;
