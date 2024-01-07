import DistrictProvider from 'store/district/DistrictProvider';
import DistrictManageContent from './DistrictManageContent';

const DistrictMangement = () => {
  return (
    <DistrictProvider>
      <DistrictManageContent />;
    </DistrictProvider>
  );
};

export default DistrictMangement;
