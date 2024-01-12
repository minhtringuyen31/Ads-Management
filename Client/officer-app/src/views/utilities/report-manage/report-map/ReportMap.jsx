import ReportMapProvider from 'store/report-map/ReportMapProvider';
import ReportContent from './ReportMapContent';

const ReportMap = () => {
  return (
    <ReportMapProvider>
      <ReportContent />
    </ReportMapProvider>
  );
};

export default ReportMap;
