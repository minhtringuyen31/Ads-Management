// assets
import { IconBrandChrome, IconHelp, IconMotorbike } from "@tabler/icons";

// constant
const icons = { IconBrandChrome, IconHelp, IconMotorbike };

const bussiness = {
  id: "bussiness",
  type: "group",
  children: [
    {
      id: "unit-price",
      title: "Unit Price",
      type: "item",
      url: "/bussiness/unit_price",
      icon: icons.IconHelp,
      breadcrumbs: false,
    },
    {
      id: "rules",
      title: "Rules",
      type: "item",
      url: "/bussiness/rules",
      icon: icons.IconBrandChrome,
      breadcrumbs: false,
    },
    // {
    //   id: "vehicles",
    //   title: "Vehicles",
    //   type: "item",
    //   url: "/bussiness/vehicles",
    //   icon: icons.IconMotorbike,
    //   breadcrumbs: false,
    // },
  ],
};

export default bussiness;
