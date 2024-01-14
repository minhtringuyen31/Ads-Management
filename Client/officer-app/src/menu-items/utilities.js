// assets
import {
  IconClipboardText,
  IconList,
  IconLocation,
  IconMap2,
  IconMapPins,
  IconPalette,
  IconShadow,
  IconTypography,
  IconWindmill,
  IconMapPin,
  IconArtboard,
  IconAt,
} from "@tabler/icons";
import PortraitIcon from "@mui/icons-material/Portrait";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

// constant
const icons = {
  IconList,
  IconMapPins,
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconMapPin,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  province_officer: {
    id: "province_utilities",
    title: "",
    type: "group",
    children: [
      {
        id: "districts",
        title: "Danh sách quận, phường",
        type: "item",
        url: "/utils/district/list",
        icon: icons.IconMapPins,
        breadcrumbs: false,
      },
      {
        id: "category",
        title: "Danh sách các danh mục",
        type: "item",
        url: "/utils/category/list",
        icon: icons.IconList,
        breadcrumbs: false,
      },

      {
        id: "location",
        title: "Danh sách điểm đặt",
        type: "item",
        url: "/utils/locations",
        icon: icons.IconMapPin,
        breadcrumbs: false,
      },
      {
        id: "adsboards",
        title: "Danh sách bảng quảng cáo",
        type: "item",
        url: "/utils/adsboards",
        icon: AirplayOutlinedIcon,
        breadcrumbs: false,
      },
      {
        id: "location_edit_requests",
        title: "Danh sách yêu cầu chỉnh sửa",
        type: "item",
        url: "/utils/edit_requests",
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
      {
        id: "authorize_requests",
        title: "Danh sách cấp phép",
        type: "item",
        url: "/utils/authorize_requests",
        icon: AssignmentTurnedInOutlinedIcon,
      },
      {
        id: "area_assignment",
        title: "Phân công khu vực",
        type: "item",
        url: "/utils/area_assignment",
        icon: MapsHomeWorkOutlinedIcon,
        breadcrumbs: false,
      },
      {
        id: "account",
        title: "Quản lí tài khoản",
        type: "item",
        url: "utils/account_management",
        icon: PortraitIcon,
        breadcrumbs: false,
      },
      {
        id: "statistic",
        title: "Thống kê báo cáo",
        type: "item",
        url: "/utils/statistic",
        icon: AutoGraphIcon,
        breadcrumbs: false,
      },
    ],
  },
  district_officer: {
    id: "district_utilities",
    title: "",
    type: "group",
    children: [
      {
        id: "location",
        title: "Danh sách điểm đặt",
        type: "item",
        url: "/utils/locations",
        icon: icons.IconMapPin,
        breadcrumbs: false,
      },
      {
        id: "adsboards",
        title: "Danh sách bảng quảng cáo",
        type: "item",
        url: "/utils/adsboards",
        icon: AirplayOutlinedIcon,
        breadcrumbs: false,
      },
      {
        id: "report-map",
        title: "Bản đồ báo cáo",
        type: "item",
        url: "/utils/report/map",
        icon: icons.IconMap2,
        breadcrumbs: false,
      },
      {
        id: "report",
        title: "Danh sách báo cáo",
        type: "item",
        url: "/utils/report/list",
        icon: ReportGmailerrorredOutlinedIcon,
        breadcrumbs: false,
      },
      {
        id: "location_edit_requests",
        title: "Danh sách yêu cầu chỉnh sửa",
        type: "item",
        url: "/utils/edit_requests",
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
      {
        id: "authorize_requests",
        title: "Danh sách cấp phép",
        type: "item",
        url: "/utils/authorize_requests",
        icon: AssignmentTurnedInOutlinedIcon,
        breadcrumbs: false,
      },
    ],
  },
  ward_officer: {
    id: "ward_utilities",
    title: "",
    type: "group",
    children: [
      {
        id: "location",
        title: "Danh sách điểm đặt",
        type: "item",
        url: "/utils/locations",
        icon: icons.IconMapPin,
        breadcrumbs: false,
      },
      {
        id: "adsboards",
        title: "Danh sách bảng quảng cáo",
        type: "item",
        url: "/utils/adsboards",
        icon: AirplayOutlinedIcon,
        breadcrumbs: false,
      },
      {
        id: "report-map",
        title: "Bản đồ báo cáo",
        type: "item",
        url: "/utils/report/map",
        icon: MapOutlinedIcon,
        breadcrumbs: false,
      },
      {
        id: "report",
        title: "Danh sách báo cáo",
        type: "item",
        url: "/utils/report/list",
        icon: ReportGmailerrorredOutlinedIcon,
        breadcrumbs: false,
      },
      {
        id: "location_edit_requests",
        title: "Danh sách yêu cầu chỉnh sửa",
        type: "item",
        url: "/utils/edit_requests",
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
      {
        id: "authorize_requests",
        title: "Danh sách cấp phép",
        type: "item",
        url: "/utils/authorize_requests",
        icon: AssignmentTurnedInOutlinedIcon,
        breadcrumbs: false,
      },
    ],
  },
};

export default utilities;
