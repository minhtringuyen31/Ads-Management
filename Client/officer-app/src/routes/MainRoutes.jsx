import { lazy } from "react";

import Loadable from "ui-component/Loadable";
import MainLayout from "../layout/MainLayout/MainLayout";
import { GetUser } from "store/auth/auth-config";

// import LocationDetail from "views/utilities/LocationDetail";

//utilities routing
const LocationManagement = Loadable(
  lazy(() =>
    import(
      "../views/utilities/list-location-adsboard/location/LocationManagement"
    ),
  ),
);
const CategoryManage = Loadable(
  lazy(() => import("../views/utilities/categories/CategoryManage")),
);
const DistrictMangement = Loadable(
  lazy(() => import("../views/utilities/district-manage/DistrictMangement")),
);
const LocationDetail = Loadable(
  lazy(() =>
    import("../views/utilities/list-location-adsboard/location/LocationDetail"),
  ),
);
const RequestEditLocation = Loadable(
  lazy(() =>
    import(
      "../views/utilities/list-location-adsboard/request_edit/FormRequestEditLocation"
    ),
  ),
);

const BoardManagement = Loadable(
  lazy(() =>
    import(
      "../views/utilities/list-location-adsboard/adsboard/BoardManagement"
    ),
  ),
);
const AddAdsboardProvince = Loadable(
  lazy(() =>
    import(
      "../views/utilities/list-location-adsboard/adsboard/AddAdsboardProvince"
    ),
  ),
);
const AddLocationProvince = Loadable(
  lazy(() =>
    import(
      "../views/utilities/list-location-adsboard/location/AddLocationProvince"
    ),
  ),
);
const EditAdsboardProvince = Loadable(
  lazy(() =>
    import(
      "../views/utilities/list-location-adsboard/adsboard/EditAdsboardProvince"
    ),
  ),
);

const EditLocationProvince = Loadable(
  lazy(() =>
    import(
      "../views/utilities/list-location-adsboard/location/EditLocationProvince"
    ),
  ),
);

const RequestEditAdsboard = Loadable(
  lazy(() =>
    import(
      "../views/utilities/list-location-adsboard/request_edit/FormRequestEditAdsboard"
    ),
  ),
);

const LicenAdsboardList = Loadable(
  lazy(() =>
    import("../views/utilities/list-licen-adsboard/LicenAdsboardList"),
  ),
);

const Home = Loadable(lazy(() => import("../views/dashboard/DashboardHome")));

const FormAddLicenAdsboard = Loadable(
  lazy(() =>
    import("../views/utilities/list-licen-adsboard/FormAddLicenAdsboard"),
  ),
);
const ReportList = Loadable(
  lazy(() => import("../views/utilities/report-manage/report-list/ReportList")),
);
const ReportDetail = Loadable(
  lazy(() =>
    import("../views/utilities/report-manage/report-list/ReportDetail"),
  ),
);
const AuthorizeRequestList = Loadable(
  lazy(() =>
    import("../views/utilities/authorize_request/AuthorizeRequestList"),
  ),
);
const AuthorizeRequestDetail = Loadable(
  lazy(() =>
    import("../views/utilities/authorize_request/AuthorizeRequestDetail"),
  ),
);

const AccountManagement = Loadable(
  lazy(() => import("../views/utilities/account/AccountManagement")),
);

const CreateAccount = Loadable(
  lazy(() => import("../views/utilities/account/CreateAccount")),
);

const AssignRole = Loadable(
  lazy(() => import("../views/utilities/account/AssignRole")),
);

const DetailAccount = Loadable(
  lazy(() => import("../views/utilities/account/DetailAccount")),
);

const StatisticReport = Loadable(
  lazy(() => import("../views/utilities/Statistic/ReportStatistic")),
);

const ReportResolution = Loadable(
  lazy(() => import("../views/utilities/Statistic/ReportResolution")),
);

const EditRequestList = Loadable(
  lazy(() =>
    import(
      "../views/utilities/list-location-adsboard/request_edit/RequestEditList"
    ),
  ),
);
const EditRequestDetail = Loadable(
  lazy(() =>
    import(
      "../views/utilities/list-location-adsboard/request_edit/RequestEditDetail"
    ),
  ),
);
const ChangePassword = Loadable(
  lazy(() =>
    import("../views/pages/authentication/change-password/ChangePassword"),
  ),
);

const ReportMap = Loadable(
  lazy(() => import("../views/utilities/report-manage/report-map/ReportMap")),
);

const UserProfile = Loadable(
  lazy(() => import("../views/utilities/profile/UserProfile")),
);

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "map",
      element: <Home />,
    },
    {
      path: "dashboard",
      element: <StatisticReport />,
    },
    {
      path: "utils",
      children: [
        {
          path: "locations",
          element: <LocationManagement />,
        },
        {
          path: "location/:locationID",
          element: <LocationDetail />,
        },
        {
          path: "location/request_edit_form",
          element: <RequestEditLocation />,
        },
        {
          path: "profile",
          element: <UserProfile />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "adsboards",
          element: <BoardManagement />,
        },
        {
          path: "adsboard/new_adsboard",
          element: <AddAdsboardProvince />,
        },
        {
          path: "location/edit_location",
          element: <EditLocationProvince />,
        },
        {
          path: "location/new_location",
          element: <AddLocationProvince />,
        },
        {
          path: "adsboard/edit_adsboard",
          element: <EditAdsboardProvince />,
        },
        {
          path: "adsboard/request_edit_form",
          element: <RequestEditAdsboard />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "authorize_requests",
          element: <LicenAdsboardList />,
        },
        {
          path: "authorize_request/create_form",
          element: <FormAddLicenAdsboard />,
        },
        {
          path: "edit_requests",
          element: <EditRequestList />,
        },
        {
          path: "edit_request_detail",
          element: <EditRequestDetail />,
        },
      ],
    },

    {
      path: "utils",
      children: [
        {
          path: "report",
          children: [
            {
              path: "list",
              element: <ReportList />,
            },
            {
              path: "detail",
              element: <ReportDetail />,
            },
            {
              path: "map",
              element: <ReportMap />,
            },
          ],
        },
        {
          path: "category",
          children: [
            {
              path: "list",
              element: <CategoryManage />,
            },
          ],
        },
        {
          path: "district",
          children: [
            {
              path: "list",
              element: <DistrictMangement />,
            },
          ],
        },
        {
          path: "authorize",
          children: [
            {
              path: "list",
              element: <AuthorizeRequestList />,
            },
            {
              path: "detail",
              element: <AuthorizeRequestDetail />,
            },
          ],
        },
        {
          path: "profile",
          children: [
            {
              path: "change_password",
              element: <ChangePassword />,
            },
          ],
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "account_management",
          element: <AccountManagement />,
        },
        {
          path: "create_account",
          element: <CreateAccount />,
        },
        {
          path: "assign_role",
          element: <AssignRole />,
        },
        {
          path: "account_detail",
          element: <DetailAccount />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "statistic",
          element: <StatisticReport />,
        },
        {
          path: "report_resolution",
          element: <ReportResolution />,
        },
      ],
    },
  ],
};

export default MainRoutes;
