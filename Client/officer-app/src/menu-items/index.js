import dashboard from './dashboard';
import utilities from './utilities';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  ward_officer: [dashboard, utilities.ward_officer],
  district_officer: [dashboard, utilities.district_officer],
  province_officer: [dashboard, utilities.province_officer],
};

export default menuItems;
