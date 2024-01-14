//Project import
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import AnthenLayout from '../layout/AuthenLayout/AuthenLayout';

// login option  routing
const AuthLogin3 = Loadable(
  lazy(() => import('../views/pages/authentication/authentication3/Login3'))
);
const ForgotPassword = Loadable(
  lazy(() =>
    import('../views/pages/authentication/forgot-password/ForgotPassword')
  )
);

const AuthenRoutes = {
  path: '/',
  element: <AnthenLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin3 />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/registry',
      element: '',
    },
  ],
};

export default AuthenRoutes;
