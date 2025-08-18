import React, {lazy} from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loadable from "../utils/Loadable";
import {Layout} from "../_metronic/layout";
import AdminInit from "./AdminInit";
import {ADMIN_ROLE, RESULT_MANAGER_ROLE, SUPER_ADMIN_ROLE, SUPERVISOR_ROLE} from "../enums/constant";
import {ErrorPage1} from "./Admin/modules/ErrorsExamples/ErrorPage1";
import {DashboardPage} from "./Admin/pages/DashboardPage";
import {AllNotificationPage} from "./Admin/pages/AllNotificationPage";
import {LocationPage} from "./Admin/pages/LocationPage";
import {CameraPage} from "./Admin/pages/CameraPage";
import AllCameraPage from "./Admin/pages/AllCameraPage";
import AllCameraLogPage from "./Admin/pages/AllCameraLogPage";
import AllCameraStatusPage from "./Admin/pages/AllCameraStatusPage";
import {ModelCategoriesTabPage} from "./Admin/pages/ModelCategoriesTabPage";
import {Supervisor} from "./Admin/pages/SupervisorPage";
import MyResultsTabPage from "./Admin/pages/MyResultsTabPage";
import SubscriptionTabPage from "./Admin/pages/SubscriptionTabPage";
import MyEventsTabPage from "./Admin/pages/MyEventsTabPage";
import { BuilderPage } from  "./Admin/pages/BuilderPage";
import { ComplaintPage } from "./Admin/pages/ComplaintPage";
import { EmployeePage } from "./Admin/pages/EmployeePage";
import { AttendancePage } from "./Admin/pages/AttendancePage";
import { ViolationPage } from "./Admin/pages/ViolationPage";
import { FeedbackPage } from "./Admin/modules/Feedback/components/FeedbackPage";

import MyResultsManagerTabPage from "./ResultManager/pages/MyResultsTabPage";
import MyEventsResultManagerTabPage from "./ResultManager/pages/MyEventsTabPage";
import MyEventsViewTabPage from "./ResultManager/pages/MyEventsViewTabPage";
import MyNotificationTabPage from "./ResultManager/pages/MyNotificationTabPage";
import LogoResultTabPage from "./ResultManager/pages/LogoResultTabPage";


import { MyResultPage } from "./SuperAdmin/modules/MyResult/MyResultTable/MyResultPage";
import Device from "./SuperAdmin/modules/Device";
import ModelType from "./SuperAdmin/modules/ModelType";
import FrameworkDetails from "./SuperAdmin/modules/FrameworkDetails";
import DeploymentType from "./SuperAdmin/modules/DeploymentType";
import InferJobs from "./SuperAdmin/modules/InferJobs";
import DeploymentDetails from "./SuperAdmin/modules/DeploymentDetails";
import DeployedDetails from "./SuperAdmin/modules/DeployedDetails";
import AIModel from "./SuperAdmin/modules/AIModel";
import CompanyServicePage from "./SuperAdmin/modules/CompanyService";
import NotificationSendPage from "./SuperAdmin/modules/NotificationSend";

import Locations from "./SuperAdminNew/modules/Location";
import Cameras from "./SuperAdminNew/modules/Camera";
import AddSupervisor from "./SuperAdminNew/modules/AddSupervisor";
import Subscription from "./SuperAdminNew/modules/Subscriptions";
import AllCamera from "./SuperAdminNew/modules/AllCamera";
import AllCameraStatus from "./SuperAdminNew/modules/AllCameraStatus";
import AllCameraLog from "./SuperAdminNew/modules/AllCameraLogs";
import CompanyUser from "./SuperAdminNew/modules/CompanyUser";
import CompanyUserAddPage from "./SuperAdminNew/modules/CompanyUser/components/companyUser-details-edit-dialog/CompanyUserAddPage";
import ConfiguredUserDialog from "./SuperAdminNew/modules/CompanyUser/components/companyUser-details-edit-dialog/ConfiguredUserDialog";
import SubscriptionModelCompanyUser from "./SuperAdminNew/modules/SubscriptionModelCompanyUser";
import CameraLabelMapping from "./SuperAdminNew/modules/CameraLabelMapping";
import FrameUploader from "./SuperAdminNew/modules/FrameUploader";


// Lazy load components
const Logout = Loadable(lazy(() => import("./Admin/modules/Auth/pages/Logout")));

// Role-based route component that gets user role from context
const RoleBasedRoute = ({ adminComponent, resultManagerComponent,superAdminComponent}) => {
    const { useSelector } = require('react-redux');
    const { userRole } = useSelector(({ auth }) => ({
        userRole: auth.user?.roles?.length && auth.user.roles[0]?.role,
    }));

    if (userRole === ADMIN_ROLE) {
        return adminComponent;
    } else if (userRole === RESULT_MANAGER_ROLE) {
        return resultManagerComponent;
    } else if (userRole === SUPER_ADMIN_ROLE) {
        return superAdminComponent;
    }
    return null;
};

const protectedRoute = (role, component) => (
    <ProtectedRoute routeRole={role}>{component}</ProtectedRoute>
);

// Admin Routes
const adminRoutes = [
    // Dashboard
    {
        path: "/admin/dashboard",
        element: protectedRoute([ADMIN_ROLE], <DashboardPage/>)
    },
    {
        path: "/dashboard",
        element: protectedRoute([SUPER_ADMIN_ROLE], <DashboardPage/>)
    },
    // Camera related routes
    {
        path: "/admin/cameras",
        element: protectedRoute([ADMIN_ROLE], <CameraPage/>)
    },
    {
        path: "/admin/allCamera",
        element: protectedRoute([ADMIN_ROLE], <AllCameraPage/>)
    },
    {
        path: "/admin/camera-logs",
        element: protectedRoute([ADMIN_ROLE], <AllCameraLogPage/>)
    },
    {
        path: "/admin/camera-status",
        element: protectedRoute([ADMIN_ROLE], <AllCameraStatusPage/>)
    },
    //
    // Model Categories
    {
        path: "/admin/model-categories",
        element: protectedRoute([ADMIN_ROLE], <ModelCategoriesTabPage/>)
    },
    
    // Subscriptions
    {
        path: "/admin/subscriptions",
        element: protectedRoute([ADMIN_ROLE], <SubscriptionTabPage/>)
    },
    {
        path: "/admin/subscriptions/deployedJobsPage",
        element: protectedRoute([ADMIN_ROLE], <SubscriptionTabPage/>)
    },
    {
        path: "/admin/subscriptions/deploymentJobsPage",
        element: protectedRoute([ADMIN_ROLE], <SubscriptionTabPage/>)
    },
    {
        path: "/my-events",
        element: protectedRoute([ADMIN_ROLE], <MyEventsTabPage/>)
    },
    //result manager
    {
        path: "/my-results/*",
        element: protectedRoute([ADMIN_ROLE, RESULT_MANAGER_ROLE], 
            <RoleBasedRoute 
                adminComponent={<MyResultsTabPage />}
                resultManagerComponent={<MyResultsManagerTabPage />}
            />
        )
    },
    {
        path: "/myResult",
        element: protectedRoute([SUPER_ADMIN_ROLE], <MyResultPage/>)
    },
    {
        path: "/events/*",
        element: protectedRoute([RESULT_MANAGER_ROLE], <MyEventsResultManagerTabPage/>)
    },
    {
        path: "/eventsList/*",
        element: protectedRoute([RESULT_MANAGER_ROLE], <MyEventsViewTabPage/>)
    },
    {
        path: "/notificationAlert",
        element: protectedRoute([RESULT_MANAGER_ROLE], <MyNotificationTabPage/>)
    },
    {
        path: "/logo-results",
        element: protectedRoute([RESULT_MANAGER_ROLE], <LogoResultTabPage/>)
    },
    
    // Builder
    {
        path: "/admin/builder",
        element: protectedRoute([ADMIN_ROLE], <BuilderPage/>)
    },
    
    // Locations
    {
        path: "/admin/locations/*",
        element: protectedRoute([ADMIN_ROLE], <LocationPage/>)
    },
    
    // Complaints and Feedback
    {
        path: "/complaints",
        element: protectedRoute([ADMIN_ROLE], <ComplaintPage/>)
    },
    {
        path: "/feedbacks",
        element: protectedRoute([ADMIN_ROLE], <FeedbackPage/>)
    },
    
    // Supervisor
    {
        path: "/admin/addSupervisor",
        element: protectedRoute([ADMIN_ROLE], <Supervisor/>)
    },
    //
    // Employee Management
    {
        path: "/admin/employee",
        element: protectedRoute([ADMIN_ROLE], <EmployeePage/>)
    },
    {
        path: "/admin/attendance",
        element: protectedRoute([ADMIN_ROLE], <AttendancePage/>)
    },
    {
        path: "/admin/violation",
        element: protectedRoute([ADMIN_ROLE], <ViolationPage/>)
    },
    
    // Notifications
    {
        path: "/allNotification",
        element: protectedRoute([ADMIN_ROLE], <AllNotificationPage/>)
    },

    //super admin
    {
        path: "/device/*",
        element: protectedRoute([SUPER_ADMIN_ROLE], <Device/>)
    },
    {
        path: "/modelType/*",
        element: protectedRoute([SUPER_ADMIN_ROLE], <ModelType/>)
    },
    {
        path: "/frameworkDetails/*",
        element: protectedRoute([SUPER_ADMIN_ROLE], <FrameworkDetails/>)
    },
    {
        path: "/deploymentType/*",
        element: protectedRoute([SUPER_ADMIN_ROLE], <DeploymentType/>)
    },
    {
        path: "/inferJobs/*",
        element: protectedRoute([SUPER_ADMIN_ROLE], <InferJobs/>)
    },
    {
        path: "/aiModel",
        element: protectedRoute([SUPER_ADMIN_ROLE], <AIModel/>)
    },
    {
        path: "/deploymentDetails/*",
        element: protectedRoute([SUPER_ADMIN_ROLE], <DeploymentDetails/>)
    },
    {
        path: "/deployedDetails/*",
        element: protectedRoute([SUPER_ADMIN_ROLE], <DeployedDetails/>)
    },

    {
        path: "/users/userPage",
        element: protectedRoute([SUPER_ADMIN_ROLE], <CompanyServicePage/>)
    },
    {
        path: "/NotificationSend/*",
        element: protectedRoute([SUPER_ADMIN_ROLE], <NotificationSendPage/>)
    },
    {
        path: "/locations",
        element: protectedRoute([SUPER_ADMIN_ROLE], <Locations/>)
    },
    {
        path: "/cameras",
        element: protectedRoute([SUPER_ADMIN_ROLE], <Cameras/>)
    },
    {
        path: "/addSupervisor",
        element: protectedRoute([SUPER_ADMIN_ROLE], <AddSupervisor/>)
    },
    {
        path: "/subscriptions",
        element: protectedRoute([SUPER_ADMIN_ROLE], <Subscription/>)
    },
    {
        path: "/allCamera",
        element: protectedRoute([SUPER_ADMIN_ROLE], <AllCamera/>)
    },
    {
        path: "/camera-status",
        element: protectedRoute([SUPER_ADMIN_ROLE], <AllCameraStatus/>)
    },
    {
        path: "/camera-logs",
        element: protectedRoute([SUPER_ADMIN_ROLE], <AllCameraLog/>)
    },
    {
        path: "/company/company-user/*",
        element: protectedRoute([SUPER_ADMIN_ROLE], <CompanyUser/>)
    },
    {
        path: "/company/company-user/add-company-user",
        element: protectedRoute([SUPER_ADMIN_ROLE], <CompanyUserAddPage/>)
    },
    {
        path: "/company/company-user/configure-user",
        element: protectedRoute([SUPER_ADMIN_ROLE], <ConfiguredUserDialog/>)
    },
    {
        path: "/company/subscription-model",
        element: protectedRoute([SUPER_ADMIN_ROLE], <SubscriptionModelCompanyUser/>)
    },
    {
        path: "/company/camera-label-mapping",
        element: protectedRoute([SUPER_ADMIN_ROLE], <CameraLabelMapping/>)
    },
    {
        path: "/company/frame-uploader/*",
        element: protectedRoute([SUPER_ADMIN_ROLE], <FrameUploader/>)
    },

];

// Combine all routes
const allRoutes = [
    ...adminRoutes,
    {
        path: "/logout",
        element: protectedRoute([ADMIN_ROLE, SUPERVISOR_ROLE, RESULT_MANAGER_ROLE, SUPER_ADMIN_ROLE], <Logout/>)
    },
];

const MainRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      // Keep every route flat; wrap only admin elements with AdminInit
      ...allRoutes.map((route, index) => {
        const isAdminPath = route.path.startsWith("/admin/");
        return {
          ...route,
          element: isAdminPath ? (
            <AdminInit>{route.element}</AdminInit>
          ) : (
            route.element
          ),
          key: `r-${index}`,
        };
      }),
    ],
  },
  { path: "/error", element: <ErrorPage1 />, key: "not-found" },
];

export default MainRoutes;
