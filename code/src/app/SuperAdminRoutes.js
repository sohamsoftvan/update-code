import React, {lazy} from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loadable from "../utils/Loadable";
import {SUPER_ADMIN_ROLE} from "../enums/constant";

// Lazy load SuperAdmin components
const MyResultPage = Loadable(lazy(() => import("./SuperAdmin/modules/MyResult/MyResultTable/MyResultPage")));
const Device = Loadable(lazy(() => import("./SuperAdmin/modules/Device")));
const ModelType = Loadable(lazy(() => import("./SuperAdmin/modules/ModelType")));
const FrameworkDetails = Loadable(lazy(() => import("./SuperAdmin/modules/FrameworkDetails")));
const DeploymentType = Loadable(lazy(() => import("./SuperAdmin/modules/DeploymentType")));
const InferJobs = Loadable(lazy(() => import("./SuperAdmin/modules/InferJobs")));
const DeploymentDetails = Loadable(lazy(() => import("./SuperAdmin/modules/DeploymentDetails")));
const DeployedDetails = Loadable(lazy(() => import("./SuperAdmin/modules/DeployedDetails")));
const AIModel = Loadable(lazy(() => import("./SuperAdmin/modules/AIModel")));
const CompanyServicePage = Loadable(lazy(() => import("./Admin/pages/companyService")));
const NotificationSendPage = Loadable(lazy(() => import("./Admin/pages/NotificationSendPage")));
const Locations = Loadable(lazy(() => import("./SuperAdminNew/modules/Location")));
const Cameras = Loadable(lazy(() => import("./SuperAdminNew/modules/Camera")));
const AddSupervisor = Loadable(lazy(() => import("./SuperAdminNew/modules/AddSupervisor")));
const Subscription = Loadable(lazy(() => import("./SuperAdminNew/modules/Subscriptions")));
const AllCamera = Loadable(lazy(() => import("./SuperAdminNew/modules/AllCamera")));
const AllCameraStatus = Loadable(lazy(() => import("./SuperAdminNew/modules/AllCameraStatus")));
const AllCameraLog = Loadable(lazy(() => import("./SuperAdminNew/modules/AllCameraLogs")));
const CompanyUser = Loadable(lazy(() => import("./SuperAdminNew/modules/CompanyUser")));
const CompanyUserAddPage = Loadable(lazy(() => import("./SuperAdminNew/modules/CompanyUser/components/companyUser-details-edit-dialog/CompanyUserAddPage")));
const ConfiguredUserDialog = Loadable(lazy(() => import("./SuperAdminNew/modules/CompanyUser/components/companyUser-details-edit-dialog/ConfiguredUserDialog")));
const SubscriptionModelCompanyUser = Loadable(lazy(() => import("./SuperAdminNew/modules/SubscriptionModelCompanyUser")));
const CameraLabelMapping = Loadable(lazy(() => import("./SuperAdminNew/modules/CameraLabelMapping")));
const FrameUploader = Loadable(lazy(() => import("./SuperAdminNew/modules/FrameUploader")));
const DashboardPage = Loadable(lazy(() => import("./Admin/pages/DashboardPage")));

const protectedRoute = (role, component) => (
    <ProtectedRoute routeRole={role}>{component}</ProtectedRoute>
);

const SuperAdminRoutes = [
    {
        path: "/superadmin/myResult",
        element: protectedRoute([SUPER_ADMIN_ROLE], <MyResultPage/>)
    },
    {
        path: "/superadmin/device",
        element: protectedRoute([SUPER_ADMIN_ROLE], <Device/>)
    },
    {
        path: "/superadmin/modelType",
        element: protectedRoute([SUPER_ADMIN_ROLE], <ModelType/>)
    },
    {
        path: "/superadmin/frameworkDetails",
        element: protectedRoute([SUPER_ADMIN_ROLE], <FrameworkDetails/>)
    },
    {
        path: "/superadmin/deploymentType",
        element: protectedRoute([SUPER_ADMIN_ROLE], <DeploymentType/>)
    },
    {
        path: "/superadmin/inferJobs",
        element: protectedRoute([SUPER_ADMIN_ROLE], <InferJobs/>)
    },
    {
        path: "/superadmin/aiModel",
        element: protectedRoute([SUPER_ADMIN_ROLE], <AIModel/>)
    },
    {
        path: "/superadmin/deploymentDetails",
        element: protectedRoute([SUPER_ADMIN_ROLE], <DeploymentDetails/>)
    },
    {
        path: "/superadmin/deployedDetails",
        element: protectedRoute([SUPER_ADMIN_ROLE], <DeployedDetails/>)
    },
    {
        path: "/superadmin/dashboard",
        element: protectedRoute([SUPER_ADMIN_ROLE], <DashboardPage/>)
    },
    {
        path: "/superadmin/users",
        element: protectedRoute([SUPER_ADMIN_ROLE], <CompanyServicePage/>)
    },
    {
        path: "/superadmin/NotificationSend",
        element: protectedRoute([SUPER_ADMIN_ROLE], <NotificationSendPage/>)
    },
    {
        path: "/superadmin/locations",
        element: protectedRoute([SUPER_ADMIN_ROLE], <Locations/>)
    },
    {
        path: "/superadmin/cameras",
        element: protectedRoute([SUPER_ADMIN_ROLE], <Cameras/>)
    },
    {
        path: "/superadmin/addSupervisor",
        element: protectedRoute([SUPER_ADMIN_ROLE], <AddSupervisor/>)
    },
    {
        path: "/superadmin/subscriptions",
        element: protectedRoute([SUPER_ADMIN_ROLE], <Subscription/>)
    },
    {
        path: "/superadmin/allCamera",
        element: protectedRoute([SUPER_ADMIN_ROLE], <AllCamera/>)
    },
    {
        path: "/superadmin/camera-status",
        element: protectedRoute([SUPER_ADMIN_ROLE], <AllCameraStatus/>)
    },
    {
        path: "/superadmin/camera-logs",
        element: protectedRoute([SUPER_ADMIN_ROLE], <AllCameraLog/>)
    },
    {
        path: "/superadmin/company/company-user",
        element: protectedRoute([SUPER_ADMIN_ROLE], <CompanyUser/>)
    },
    {
        path: "/superadmin/company/company-user/add-company-user",
        element: protectedRoute([SUPER_ADMIN_ROLE], <CompanyUserAddPage/>)
    },
    {
        path: "/superadmin/company/company-user/configure-user",
        element: protectedRoute([SUPER_ADMIN_ROLE], <ConfiguredUserDialog/>)
    },
    {
        path: "/superadmin/company/subscription-model",
        element: protectedRoute([SUPER_ADMIN_ROLE], <SubscriptionModelCompanyUser/>)
    },
    {
        path: "/superadmin/company/camera-label-mapping",
        element: protectedRoute([SUPER_ADMIN_ROLE], <CameraLabelMapping/>)
    },
    {
        path: "/superadmin/company/frame-uploader",
        element: protectedRoute([SUPER_ADMIN_ROLE], <FrameUploader/>)
    },
];

export default SuperAdminRoutes;
