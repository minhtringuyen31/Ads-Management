import React from 'react';

const ReportContext = React.createContext({
  reportDetail: null,
  setReportDetail: (data) => {},
  removeReportDetail: () => {},
});

export default ReportContext;
