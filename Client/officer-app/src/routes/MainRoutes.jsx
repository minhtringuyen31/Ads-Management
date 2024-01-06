import { lazy } from 'react';

import Loadable from 'ui-component/Loadable';
import CategoryManage from 'views/utilities/categories/CategoryManage';
import MainLayout from '../layout/MainLayout/MainLayout';

//utilities routing
const UtilsCustomer = Loadable(
  lazy(() => import('../views/utilities/Customer'))
);
const UtilsDriver = Loadable(lazy(() => import('../views/utilities/Driver')));
const UtilsConsultant = Loadable(
  lazy(() => import('../views/utilities/Consultant'))
);
const Home = Loadable(lazy(() => import('../views/dashboard/DashboardHome')));

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
          path: 'customer',
          element: <UtilsCustomer />,
        },
      ],
    },
    {
      path: 'utils',
      children: [
        {
          path: 'driver',
          element: <UtilsDriver />,
        },
      ],
    },
    {
      path: 'utils',
      children: [
        {
          path: 'consultant',
          element: <UtilsConsultant />,
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
          ],
        },
        {
          path: 'category',
          children: [
            {
              path: 'list',
              element: <CategoryManage />,
            },
            // {
            //   path: 'detail',
            //   element: <ReportDetail />,
            // },
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
