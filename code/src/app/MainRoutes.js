import React, {lazy} from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loadable from "../utils/Loadable";
import {Layout} from "../_metronic/layout";
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


// Import route files
// import SuperAdminRoutes from "./SuperAdminRoutes";
// import ResultManagerRoutes from "./ResultManagerRoutes";

// Lazy load components
const Logout = Loadable(lazy(() => import("./Admin/modules/Auth/pages/Logout")));
// const CameraPage = Loadable(lazy(() => import("./Admin/pages/CameraPage")));
// const ModelCategoriesTabPage = Loadable(lazy(() => import("./Admin/pages/ModelCategoriesTabPage")));
// const SubscriptionTabPage = Loadable(lazy(() => import("./Admin/pages/SubscriptionTabPage")));
// const MyResultsTabPage = Loadable(lazy(() => import("./Admin/pages/MyResultsTabPage")));
// const MyEventsTabPage = Loadable(lazy(() => import("./Admin/pages/MyEventsTabPage")));
const BuilderPage = Loadable(lazy(() => import("./Admin/pages/BuilderPage")));
// const LocationPage = Loadable(lazy(() => import("./Admin/pages/LocationPage")));
const ComplaintPage = Loadable(lazy(() => import("./Admin/pages/ComplaintPage")));
// const Supervisor = Loadable(lazy(() => import("./Admin/pages/SupervisorPage")));
// const AllCameraPage = Loadable(lazy(() => import("./Admin/pages/AllCameraPage")));
// const AllCameraLogPage = Loadable(lazy(() => import("./Admin/pages/AllCameraLogPage")));
// const AllCameraStatusPage = Loadable(lazy(() => import("./Admin/pages/AllCameraStatusPage")));
const EmployeePage = Loadable(lazy(() => import("./Admin/pages/EmployeePage")));
const AttendancePage = Loadable(lazy(() => import("./Admin/pages/AttendancePage")));
const ViolationPage = Loadable(lazy(() => import("./Admin/pages/ViolationPage")));
const FeedbackPage = Loadable(lazy(() => import("./Admin/modules/Feedback/components/FeedbackPage")));

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
    
    // Results and Events
    {
        path: "/my-results",
        element: protectedRoute([ADMIN_ROLE], <MyResultsTabPage/>)
    },
    {
        path: "/my-events",
        element: protectedRoute([ADMIN_ROLE], <MyEventsTabPage/>)
    },
    
    // Builder
    // {
    //     path: "/admin/builder",
    //     element: protectedRoute([ADMIN_ROLE], <BuilderPage/>)
    // },
    
    // Locations
    {
        path: "/admin/locations",
        element: protectedRoute([ADMIN_ROLE], <LocationPage/>)
    },
    
    // Complaints and Feedback
    // {
    //     path: "/complaints",
    //     element: protectedRoute([ADMIN_ROLE], <ComplaintPage/>)
    // },
    // {
    //     path: "/feedbacks",
    //     element: protectedRoute([ADMIN_ROLE], <FeedbackPage/>)
    // },
    
    // Supervisor
    {
        path: "/admin/addSupervisor",
        element: protectedRoute([ADMIN_ROLE], <Supervisor/>)
    },
    //
    // Employee Management
    // {
    //     path: "/admin/employee",
    //     element: protectedRoute([ADMIN_ROLE], <EmployeePage/>)
    // },
    // {
    //     path: "/admin/attendance",
    //     element: protectedRoute([ADMIN_ROLE], <AttendancePage/>)
    // },
    // {
    //     path: "/admin/violation",
    //     element: protectedRoute([ADMIN_ROLE], <ViolationPage/>)
    // },
    
    // Notifications
    {
        path: "/allNotification",
        element: protectedRoute([ADMIN_ROLE], <AllNotificationPage/>)
    },
];

// Combine all routes
const allRoutes = [
    ...adminRoutes,
    // ...SuperAdminRoutes,
    // ...ResultManagerRoutes,
    // Logout route for all roles
    {
        path: "/logout",
        element: protectedRoute([ADMIN_ROLE, SUPERVISOR_ROLE, RESULT_MANAGER_ROLE, SUPER_ADMIN_ROLE], <Logout/>)
    },
];

const MainRoutes = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            ...allRoutes.map((route, index) => ({...route, key: index})),
        ]
    },
    {
        path: "/error",
        element: <ErrorPage1/>,
        key: "not-found"
    },
];

export default MainRoutes;
