import MapProvider from 'store/dashboard/MapProvider';
import DashboardContent from './DashboardContent';

const DashboardHome = () => {
  return (
    <MapProvider>
      <DashboardContent />
    </MapProvider>
  );
};

export default DashboardHome;
