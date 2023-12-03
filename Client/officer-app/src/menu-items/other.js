// assets
import { IconBrandChrome, IconHelp } from "@tabler/icons";

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: "sample-docs-roadmap",
  type: "group",
  children: [
    // {
    //   id: "salary",
    //   title: "Salary",
    //   type: "item",
    //   url: "/utils/salary",
    //   icon: icons.IconBrandChrome,
    //   breadcrumbs: false,
    // },
    {
      id: "unit-price",
      title: "Unit Price",
      type: "item",
      url: "/utils/unit-price",
      icon: icons.IconHelp,
      breadcrumbs: false,
    },
  ],
};

export default other;
