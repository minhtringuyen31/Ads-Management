import React from "react";
import { lazy } from "react";

import MainLayout from "../layout/MainLayout/MainLayout";
import Loadable from "ui-component/Loadable";
// import LocationDetail from "views/utilities/LocationDetail";

//utilities routing
const LocationManagement = Loadable(
  lazy(() =>
    import(
      "../views/utilities/list-location-adsboard/location/LocationManagement"
    )
  )
);
const LocationDetail = Loadable(
  lazy(() =>
    import("../views/utilities/list-location-adsboard/location/LocationDetail")
  )
);
const UtilsDriver = Loadable(
  lazy(() =>
    import("../views/utilities/list-location-adsboard/adsboard/BoardManagement")
  )
);
// const UtilsConsultant = Loadable(
//   lazy(() => import("../views/utilities/Consultant"))
// );
// const UtilsSalary = Loadable(lazy(() => import("../views/utilities/Salary")));
const LicenAdsboardList = Loadable(
  lazy(() => import("../views/utilities/list-licen-adsboard/LicenAdsboardList"))
);

// const BussinessEditUnitPrice = Loadable(
//   lazy(() => import("../views/utilities/list-licen-adsboard/LicenAdsboarItem"))
// );

const FormAddLicenAdsboard = Loadable(
  lazy(() =>
    import("../views/utilities/list-licen-adsboard/FormAddLicenAdsboard")
  )
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
          element: <LocationManagement />,
        },
        {
          path: "customer/:locationID",
          element: <LocationDetail />,
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
    // {
    //   path: "utils",
    //   children: [
    //     {
    //       path: "consultant",
    //       element: <UtilsConsultant />,
    //     },
    //   ],
    // },

    {
      path: "bussiness",
      children: [
        {
          path: "unit_price",
          element: <LicenAdsboardList />,
        },
        {
          path: "unit_price/createForm",
          element: <FormAddLicenAdsboard />,
        },
        // {
        //   path: "rules",
        //   element: <FormAddLicenAdsboard />,
        // },
        {
          path: "vehicles",
          element: <BussinessVehicle />,
        },
      ],
    },
  ],
};

export default MainRoutes;
