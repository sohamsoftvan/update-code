import React, {lazy} from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loadable from "../utils/Loadable";
import {RESULT_MANAGER_ROLE} from "../enums/constant";

// Lazy load ResultManager components
const MyResultsTabPage = Loadable(lazy(() => import("./ResultManager/pages/MyResultsTabPage")));
const MyEventsTabPage = Loadable(lazy(() => import("./ResultManager/pages/MyEventsTabPage")));
const MyEventsViewTabPage = Loadable(lazy(() => import("./ResultManager/pages/MyEventsViewTabPage")));
const MyNotificationTabPage = Loadable(lazy(() => import("./ResultManager/pages/MyNotificationTabPage")));
const LogoResultTabPage = Loadable(lazy(() => import("./ResultManager/pages/LogoResultTabPage")));

const protectedRoute = (role, component) => (
    <ProtectedRoute routeRole={role}>{component}</ProtectedRoute>
);

const ResultManagerRoutes = [
    {
        path: "/resultmanager/my-results",
        element: protectedRoute([RESULT_MANAGER_ROLE], <MyResultsTabPage/>)
    },
    {
        path: "/resultmanager/events",
        element: protectedRoute([RESULT_MANAGER_ROLE], <MyEventsTabPage/>)
    },
    {
        path: "/resultmanager/eventsList",
        element: protectedRoute([RESULT_MANAGER_ROLE], <MyEventsViewTabPage/>)
    },
    {
        path: "/resultmanager/notificationAlert",
        element: protectedRoute([RESULT_MANAGER_ROLE], <MyNotificationTabPage/>)
    },
    {
        path: "/resultmanager/logo-results",
        element: protectedRoute([RESULT_MANAGER_ROLE], <LogoResultTabPage/>)
    },
];

export default ResultManagerRoutes;
