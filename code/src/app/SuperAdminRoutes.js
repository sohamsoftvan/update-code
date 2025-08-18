import React, {lazy} from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loadable from "../utils/Loadable";
import {SUPER_ADMIN_ROLE} from "../enums/constant";

// Lazy load SuperAdmin components
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

const protectedRoute = (role, component) => (
    <ProtectedRoute routeRole={role}>{component}</ProtectedRoute>
);

const SuperAdminRoutes = [

    {
        path: "/device",
        element: protectedRoute([SUPER_ADMIN_ROLE], <Device/>)
    },
    {
        path: "/modelType",
        element: protectedRoute([SUPER_ADMIN_ROLE], <ModelType/>)
    },
    {
        path: "/frameworkDetails",
        element: protectedRoute([SUPER_ADMIN_ROLE], <FrameworkDetails/>)
    },
    {
        path: "/deploymentType",
        element: protectedRoute([SUPER_ADMIN_ROLE], <DeploymentType/>)
    },
    {
        path: "/inferJobs",
        element: protectedRoute([SUPER_ADMIN_ROLE], <InferJobs/>)
    },
    {
        path: "/aiModel",
        element: protectedRoute([SUPER_ADMIN_ROLE], <AIModel/>)
    },
    {
        path: "/deploymentDetails",
        element: protectedRoute([SUPER_ADMIN_ROLE], <DeploymentDetails/>)
    },
    {
        path: "/deployedDetails",
        element: protectedRoute([SUPER_ADMIN_ROLE], <DeployedDetails/>)
    },

    {
        path: "/users/",
        element: protectedRoute([SUPER_ADMIN_ROLE], <CompanyServicePage/>)
    },
    {
        path: "/NotificationSend",
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
        path: "/company/company-user",
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
        path: "/company/frame-uploader",
        element: protectedRoute([SUPER_ADMIN_ROLE], <FrameUploader/>)
    },
];

export default SuperAdminRoutes;
