import PropTypes from 'prop-types';
import { useCallback, useMemo, useReducer } from 'react';
import ReportContext from './report-context';

const defaultReportState = {
  reportDetail: null,
};

const reportReducer = (state, action) => {
  switch (action.type) {
    case 'REPORT':
      return {
        reportDetail: action.data,
      };
    case 'REMOVE':
      return {
        reportDetail: null,
      };
    default:
      return defaultReportState;
  }
};

const ReportProvider = (props) => {
  const [reportState, dispatchReportAction] = useReducer(
    reportReducer,
    defaultReportState
  );

  const setReportDetailData = useCallback(
    (data) => {
      dispatchReportAction({ type: 'REPORT', data: data });
    },
    [dispatchReportAction]
  );

  const removeReportDetailData = useCallback(() => {
    dispatchReportAction({ type: 'REMOVE' });
  }, [dispatchReportAction]);

  const reportContext = useMemo(() => {
    return {
      reportDetail: reportState.reportDetail,
      setReportDetail: setReportDetailData,
      removeReportDetail: removeReportDetailData,
    };
  }, [reportState.reportDetail, setReportDetailData, removeReportDetailData]);

  return (
    <ReportContext.Provider value={reportContext}>
      {props.children}
    </ReportContext.Provider>
  );
};

ReportProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReportProvider;
