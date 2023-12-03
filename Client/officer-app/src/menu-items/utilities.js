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
      title: "Customer",
      type: "item",
      url: "/utils/customer",
      icon: icons.IconTypography,
      breadcrumbs: false,
    },
    {
      id: "driver",
      title: "Driver",
      type: "item",
      url: "/utils/driver",
      icon: icons.IconPalette,
      breadcrumbs: false,
    },
    // {
    //   id: "consultant",
    //   title: "Consultant",
    //   type: "item",
    //   url: "/utils/consultant",
    //   icon: icons.IconShadow,
    //   breadcrumbs: false,
    // },
    // {
    //   id: 'icons',
    //   title: 'Icons',
    //   type: 'collapse',
    //   icon: icons.IconWindmill,
    //   children: [
    //     {
    //       id: 'tabler-icons',
    //       title: 'Tabler Icons',
    //       type: 'item',
    //       url: '/icons/tabler-icons',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'material-icons',
    //       title: 'Material Icons',
    //       type: 'item',
    //       external: true,
    //       target: '_blank',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       breadcrumbs: false
    //     }
    //   ]
    // }
  ],
};

export default utilities;
