import PropTypes from 'prop-types';
import { useCallback, useMemo, useReducer } from 'react';
import ReportMapContext from './report-map-context';

const defaultReportMapState = {
  location: {
    lat: 0,
    lng: 0,
    zoom: 0,
  },
  reportsDetail: null,
};

const reportMapReducer = (state, action) => {
  switch (action.type) {
    case 'ZOOM':
      return {
        location: {
          lat: action.data.lat,
          lng: action.data.lng,
          zoom: action.data.zoom,
        },
        reportsDetail: state.reportsDetail,
      };
    case 'LOCATE':
      return {
        location: {
          lat: state.lat,
          lng: state.lng,
          zoom: state.zoom,
        },
        reportsDetail: action.data,
      };
    case 'REMOVE':
      return {
        location: {
          lat: state.lat,
          lng: state.lng,
          zoom: state.zoom,
        },
        reportsDetail: null,
      };
    default:
      return defaultReportMapState;
  }
};

const ReportMapProvider = (props) => {
  const [reportMapState, dispatchReportMapAction] = useReducer(
    reportMapReducer,
    defaultReportMapState
  );

  const setZoomToMap = useCallback(
    (data) => {
      dispatchReportMapAction({ type: 'ZOOM', data: data });
    },
    [dispatchReportMapAction]
  );

  const setReportsDetailData = useCallback(
    (data) => {
      dispatchReportMapAction({ type: 'LOCATE', data: data });
    },
    [dispatchReportMapAction]
  );

  const removeReportsDetailData = useCallback(() => {
    dispatchReportMapAction({ type: 'REMOVE' });
  }, [dispatchReportMapAction]);

  const reportMapContext = useMemo(
    () => ({
      location: reportMapState.location,
      reportsDetail: reportMapState.reportsDetail,
      setZoom: setZoomToMap,
      setReportsDetail: setReportsDetailData,
      removeReportsDetail: removeReportsDetailData,
    }),
    [
      reportMapState.location,
      reportMapState.reportsDetail,
      setZoomToMap,
      setReportsDetailData,
      removeReportsDetailData,
    ]
  );

  return (
    <ReportMapContext.Provider value={reportMapContext}>
      {props.children}
    </ReportMapContext.Provider>
  );
};

ReportMapProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReportMapProvider;
