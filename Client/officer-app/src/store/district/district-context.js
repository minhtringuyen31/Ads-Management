import React from 'react';

const DistrictContext = React.createContext({
  districtId: null,
  setDistrictId: (data) => {},
  removeDistrictId: () => {},
});

export default DistrictContext;
