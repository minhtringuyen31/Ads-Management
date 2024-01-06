import { lazy } from 'react';

import MainLayout from "../layout/MainLayout/MainLayout";
import Loadable from "ui-component/Loadable";
import CategoryManage from 'views/utilities/categories/CategoryManage';

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

const BoardManagement = Loadable(
  lazy(() =>
    import("../views/utilities/list-location-adsboard/adsboard/BoardManagement")
  )
);

const LicenAdsboardList = Loadable(
  lazy(() => import("../views/utilities/list-licen-adsboard/LicenAdsboardList"))
);

const Home = Loadable(lazy(() => import('../views/dashboard/DashboardHome')));

const FormAddLicenAdsboard = Loadable(
  lazy(() =>
    import("../views/utilities/list-licen-adsboard/FormAddLicenAdsboard")
  )
)
const ReportList = Loadable(
  lazy(() => import('../views/utilities/report-manage/ReportList'))
);
const ReportDetail = Loadable(
  lazy(() => import('../views/utilities/report-manage/ReportDetail'))
);
const AuthorizeRequestList = Loadable(
  lazy(() =>
    import('../views/utilities/authorize_request/AuthorizeRequestList')
  )
);
const AuthorizeRequestDetail = Loadable(
  lazy(() =>
    import('../views/utilities/authorize_request/AuthorizeRequestDetail')
  )
);

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      element: <Home />,
    },
    {
      path: 'utils',
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
      path: 'utils',
      children: [
        {
          path: 'driver',
          element: <BoardManagement />,
        },
      ],
    },
    {
      path: 'utils',
      children: [
        {
          path: "unit_price",
          element: <LicenAdsboardList />,
        },
        {
          path: "unit_price/createForm",
          element: <FormAddLicenAdsboard />,
        },
        {
          path: 'report',
          children: [
            {
              path: 'list',
              element: <ReportList />,
            },
            {
              path: 'detail',
              element: <ReportDetail />,
            },
          ],
        },
        {
          path: 'category',
          children: [
            {
              path: 'list',
              element: <CategoryManage />,
            },
          ],
        },
        {
          path: 'authorize',
          children: [
            {
              path: 'list',
              element: <AuthorizeRequestList />,
            },
            {
              path: 'detail',
              element: <AuthorizeRequestDetail />,
            },
          ],
        },
      ],
    },
  ],
};

export default MainRoutes;
