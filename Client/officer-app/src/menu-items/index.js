import dashboard from "./dashboard";
import utilities from "./utilities";

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  ward_officer: [dashboard.ward_officer, utilities.ward_officer],
  district_officer: [dashboard.district_officer, utilities.district_officer],
  province_officer: [dashboard.province_officer, utilities.province_officer],
};

export default menuItems;
