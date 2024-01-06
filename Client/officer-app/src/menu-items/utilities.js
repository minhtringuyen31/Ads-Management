// assets
import {
  IconPalette,
  IconShadow,
  IconTypography,
  IconWindmill,
  IconLocation,
} from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconLocation,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  province_officer: {
    id: 'province_utilities',
    title: 'Utilities',
    type: 'group',
    children: [
      {
        id: 'districts',
        title: 'Danh sách quận',
        type: 'item',
        url: '/utils/districts',
        icon: icons.IconTypography,
        breadcrumbs: false,
      },
      {
        id: 'wards',
        title: 'Danh sách quận',
        type: 'item',
        url: '/utils/wards',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
      {
        id: 'location',
        title: 'Danh sách điểm đặt',
        type: 'item',
        url: '/utils/locations',
        icon: icons.IconLocation,
        breadcrumbs: false,
      },
      {
        id: 'adsboards',
        title: 'Danh sách bảng quảng cáo',
        type: 'item',
        url: '/utils/adsboards',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
      {
        id: 'location_edit_requests',
        title: 'Danh sách yêu cầu chỉnh sửa điểm đặt',
        type: 'item',
        url: '/utils/location_edit_requests',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
      {
        id: 'board_edit_requests',
        title: 'Danh sách yêu cầu chỉnh sửa bảng quảng cáo',
        type: 'item',
        url: '/utils/board_edit_requests',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
      {
        id: 'authorize_requests',
        title: 'Danh sách cấp phép',
        type: 'item',
        url: '/utils/authorize_requests',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
      {
        id: 'area_assignment',
        title: 'Phân công khu vực',
        type: 'item',
        url: '/utils/area_assignment',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
    ],
  },
  district_officer: {
    id: 'district_utilities',
    title: 'Utilities',
    type: 'group',
    children: [
      {
        id: 'location',
        title: 'Danh sách điểm đặt',
        type: 'item',
        url: '/utils/locations',
        icon: icons.IconTypography,
        breadcrumbs: false,
      },
      {
        id: 'adsboards',
        title: 'Danh sách bảng quảng cáo',
        type: 'item',
        url: '/utils/adsboards',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
      {
        id: 'report',
        title: 'Danh sách báo cáo',
        type: 'item',
        url: '/utils/reports',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
      {
        id: 'authorize_requests',
        title: 'Danh sách cấp phép',
        type: 'item',
        url: '/utils/authorize_requests',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
    ],
  },
  ward_officer: {
    id: 'ward_utilities',
    title: 'Utilities',
    type: 'group',
    children: [
      {
        id: 'location',
        title: 'Danh sách điểm đặt',
        type: 'item',
        url: '/utils/locations',
        icon: icons.IconTypography,
        breadcrumbs: false,
      },
      {
        id: 'adsboards',
        title: 'Danh sách bảng quảng cáo',
        type: 'item',
        url: '/utils/adsboards',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
      {
        id: 'report',
        title: 'Danh sách báo cáo',
        type: 'item',
        url: '/utils/reports',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
      {
        id: 'authorize_requests',
        title: 'Danh sách cấp phép',
        type: 'item',
        url: '/utils/authorize_requests',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
    ],
  },
};

export default utilities;
