// assets
import { IconDashboard } from "@tabler/icons";

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  province_officer: {
    id: "dashboard",
    title: "",
    type: "group",
    children: [
      {
        id: "default",
        title: "Trang chủ",
        type: "item",
        url: "/utils/statistic",
        icon: icons.IconDashboard,
        breadcrumbs: false,
      },
    ],
  },
  district_officer: {
    id: "dashboard",
    title: "",
    type: "group",
    children: [
      {
        id: "default",
        title: "Trang chủ",
        type: "item",
        url: "/map",
        icon: icons.IconDashboard,
        breadcrumbs: false,
      },
    ],
  },
  ward_officer: {
    id: "dashboard",
    title: "",
    type: "group",
    children: [
      {
        id: "default",
        title: "Trang chủ",
        type: "item",
        url: "/map",
        icon: icons.IconDashboard,
        breadcrumbs: false,
      },
    ],
  },
};

export default dashboard;
