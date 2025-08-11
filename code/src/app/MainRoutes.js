import React, {lazy} from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loadable from "../utils/Loadable";
import {Layout} from "../_metronic/layout";
import {ADMIN_ROLE, RESULT_MANAGER_ROLE, SUPER_ADMIN_ROLE, SUPERVISOR_ROLE} from "../enums/constant";
import {ErrorPage1} from "./Admin/modules/ErrorsExamples/ErrorPage1";
import {DashboardPage} from "./Admin/pages/DashboardPage";
import {AllNotificationPage} from "./Admin/pages/AllNotificationPage";

const Logout = Loadable(
    lazy( () =>  import("./Admin/modules/Auth/pages/Logout"))
);

// const DashboardPage = Loadable(lazy( () =>  import("./Admin/pages/DashboardPage")))


const protectedRoute = (role, component) => (
    <ProtectedRoute routeRole={role}>{component}</ProtectedRoute>
);


const routes = [
    {
        path: "/admin/dashboard",
        element: protectedRoute([ADMIN_ROLE], <DashboardPage/>)
    },
    {
        path: "/allNotification",
        element: protectedRoute([ADMIN_ROLE], <AllNotificationPage/>)
    },
    {
        path: "/logout",
        element: protectedRoute([ADMIN_ROLE,SUPERVISOR_ROLE,RESULT_MANAGER_ROLE,SUPER_ADMIN_ROLE], <Logout/>)
    },
];


const MainRoutes = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            ...routes.map((route, index) => ({...route, key: index})),
            // { path: "admin/*", element: protectedRoute([ADMIN_ROLE], <AdminBasePage/>) }, ...routes.map((route, index) => ({...route, key: index})),
        ]
    },
    {
        path: "/error", // This catches all unmatched routes
        element: <ErrorPage1/>, // Your 404 component
        key: "not-found"
    },
];

export default MainRoutes;
