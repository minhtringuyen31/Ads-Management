// assets
import {
  IconPalette,
  IconShadow,
  IconTypography,
  IconWindmill,
} from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  province_officer: {
    id: 'province_utilities',
    title: 'Utilities',
    type: 'group',
    children: [
      {
        id: 'customer',
        title: 'Danh sách điểm đặt 1',
        type: 'item',
        url: '/utils/customer',
        icon: icons.IconTypography,
        breadcrumbs: false,
      },
      {
        id: 'driver',
        title: 'Danh sách bảng quảng cáo 1',
        type: 'item',
        url: '/utils/driver',
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
        id: 'customer',
        title: 'Danh sách điểm đặt 2',
        type: 'item',
        url: '/utils/customer',
        icon: icons.IconTypography,
        breadcrumbs: false,
      },
      {
        id: 'driver',
        title: 'Danh sách bảng quảng cáo 2',
        type: 'item',
        url: '/utils/driver',
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
        id: 'customer',
        title: 'Danh sách điểm đặt 3',
        type: 'item',
        url: '/utils/customer',
        icon: icons.IconTypography,
        breadcrumbs: false,
      },
      {
        id: 'driver',
        title: 'Danh sách bảng quảng cáo 3',
        type: 'item',
        url: '/utils/driver',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
    ],
  },
};

export default utilities;
