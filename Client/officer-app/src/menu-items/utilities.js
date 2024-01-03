// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
} from "@tabler/icons";

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: "utilities",
  title: "Utilities",
  type: "group",
  children: [
    {
      id: "customer",
      title: "Danh sách điểm đặt",
      type: "item",
      url: "/utils/customer",
      icon: icons.IconTypography,
      breadcrumbs: false,
    },
    {
      id: "driver",
      title: "Danh sách bảng quảng cáo",
      type: "item",
      url: "/utils/driver",
      icon: icons.IconPalette,
      breadcrumbs: false,
    },
  ],
};

export default utilities;
