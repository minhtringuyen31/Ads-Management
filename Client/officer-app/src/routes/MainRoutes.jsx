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
    import(
      '../views/utilities/list-location-adsboard/request_edit/FormRequestEditLocation'
    )
  )
);

const BoardManagement = Loadable(
  lazy(() =>
    import('../views/utilities/list-location-adsboard/adsboard/BoardManagement')
  )
);
const AddAdsboardProvince = Loadable(
  lazy(() =>
    import(
      '../views/utilities/list-location-adsboard/adsboard/AddAdsboardProvince'
    )
  )
);
const EditAdsboardProvince = Loadable(
  lazy(() =>
    import(
      '../views/utilities/list-location-adsboard/adsboard/EditAdsboardProvince'
    )
  )
);
const RequestEditAdsboard = Loadable(
  lazy(() =>
    import(
      '../views/utilities/list-location-adsboard/request_edit/FormRequestEditAdsboard'
    )
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
  lazy(() => import('../views/utilities/report-manage/report-list/ReportList'))
);
const ReportDetail = Loadable(
  lazy(() =>
    import('../views/utilities/report-manage/report-list/ReportDetail')
  )
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
const EditRequestList = Loadable(
  lazy(() =>
    import(
      '../views/utilities/list-location-adsboard/request_edit/RequestEditList'
    )
  )
);
const EditRequestDetail = Loadable(
  lazy(() =>
    import(
      '../views/utilities/list-location-adsboard/request_edit/RequestEditDetail'
    )
  )
);
const ChangePassword = Loadable(
  lazy(() =>
    import('../views/pages/authentication/change-password/ChangePassword')
  )
);

const ReportMap = Loadable(
  lazy(() => import('../views/utilities/report-manage/report-map/ReportMap'))
);

const UserProfile = Loadable(
  lazy(() => import('../views/utilities/profile/UserProfile'))
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
        },
        {
          path: 'profile',
          element: <UserProfile />,
        },
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
          path: 'edit_requests',
          element: <EditRequestList />,
        },
        {
          path: 'edit_request_detail',
          element: <EditRequestDetail />,
        },
      ],
    },

    {
      path: 'utils',
      children: [
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
            {
              path: 'map',
              element: <ReportMap />,
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
        {
          path: 'profile',
          children: [
            {
              path: 'change_password',
              element: <ChangePassword />,
            },
          ],
        },
      ],
    },
  ],
};

export default MainRoutes;
