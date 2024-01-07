import { lazy } from 'react';

import Loadable from 'ui-component/Loadable';
import MainLayout from '../layout/MainLayout/MainLayout';

// import LocationDetail from "views/utilities/LocationDetail";

//utilities routing
const LocationManagement = Loadable(
  lazy(() =>
    import(
      '../views/utilities/list-location-adsboard/location/LocationManagement'
    )
  )
);
const CategoryManage = Loadable(
  lazy(() => import('../views/utilities/categories/CategoryManage'))
);
const DistrictMangement = Loadable(
  lazy(() => import('../views/utilities/district-manage/DistrictMangement'))
);
const LocationDetail = Loadable(
  lazy(() =>
    import('../views/utilities/list-location-adsboard/location/LocationDetail')
  )
);
const RequestEditLocation = Loadable(
  lazy(() => 
    import('../views/utilities/list-location-adsboard/location/FormRequestEditLocation')
  )
);

const BoardManagement = Loadable(
  lazy(() =>
    import('../views/utilities/list-location-adsboard/adsboard/BoardManagement')
  )
);

const LicenAdsboardList = Loadable(
  lazy(() => import('../views/utilities/list-licen-adsboard/LicenAdsboardList'))
);

const Home = Loadable(lazy(() => import('../views/dashboard/DashboardHome')));

const FormAddLicenAdsboard = Loadable(
  lazy(() =>
    import('../views/utilities/list-licen-adsboard/FormAddLicenAdsboard')
  )
);
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
          path: 'locations',
          element: <LocationManagement />,
        },
        {
          path: 'location/:locationID',
          element: <LocationDetail />,
        },
        {
          path: 'location/request_edit_form',
          element: <RequestEditLocation />,
        }
      ],
    },
    {
      path: 'utils',
      children: [
        {
          path: 'adsboards',
          element: <BoardManagement />,
        },
      ],
    },
    {
      path: 'utils',
      children: [
        {
          path: 'authorize_requests',
          element: <LicenAdsboardList />,
        },
        {
          path: 'authorize_request/create_form',
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
          path: 'district',
          children: [
            {
              path: 'list',
              element: <DistrictMangement />,
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
