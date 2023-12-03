import React from "react";
import { lazy } from "react";

import MainLayout from "../layout/MainLayout/MainLayout";
import Loadable from "ui-component/Loadable";

//utilities routing
const UtilsCustomer = Loadable(
  lazy(() => import("../views/utilities/Customer"))
);
const UtilsDriver = Loadable(lazy(() => import("../views/utilities/Driver")));
const UtilsConsultant = Loadable(
  lazy(() => import("../views/utilities/Consultant"))
);
const UtilsSalary = Loadable(lazy(() => import("../views/utilities/Salary")));
const BussinessUnitPrice = Loadable(
  lazy(() => import("../views/bussiness/unit-price/UnitPrice"))
);
const BussinessEditUnitPrice = Loadable(
  lazy(() => import("../views/bussiness/unit-price/EditUnitPrice"))
);

const BussinessRuleList = Loadable(
  lazy(() => import("../views/bussiness/rules/RuleList"))
);

const BussinessVehicle = Loadable(
  lazy(() => import("../views/bussiness/vehicles/vehicleList"))
);
const Home = Loadable(lazy(() => import("../views/dashboard/DashboardHome")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "dashboard",
      element: <Home />,
    },
    {
      path: "utils",
      children: [
        {
          path: "customer",
          element: <UtilsCustomer />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "driver",
          element: <UtilsDriver />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "consultant",
          element: <UtilsConsultant />,
        },
      ],
    },
    // {
    //   path: "utils",
    //   children: [
    //     {
    //       path: "salary",
    //       element: <UtilsSalary />,
    //     },
    //   ],
    // },

    {
      path: "bussiness",
      children: [
        {
          path: "unit_price",
          element: <BussinessUnitPrice />,
        },
        {
          path: "unit_price/edit",
          element: <BussinessEditUnitPrice />,
        },
        {
          path: "rules",
          element: <BussinessRuleList />,
        },
        {
          path: "vehicles",
          element: <BussinessVehicle />,
        },
      ],
    },
  ],
};

export default MainRoutes;
