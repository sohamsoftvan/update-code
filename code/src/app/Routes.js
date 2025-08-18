import React from "react";
import {Navigate, useRoutes} from "react-router-dom";
import {shallowEqual, useSelector} from "react-redux";
import {ADMIN_ROLE, RESULT_MANAGER_ROLE, SUPER_ADMIN_ROLE,} from "../enums/constant";
import LoginRoutes from "./LoginRoutes";
import MainRoutes from "./MainRoutes";
import Cookies from "universal-cookie";

function Router() {
    const {isAuthorized = false, user} = useSelector(
        ({auth}) => ({
            isAuthorized: auth.user?.id && new Cookies().get("access_token"),
            user: auth.user,
        }),
        shallowEqual
    );
    
    // Get the redirect path based on user role
    const getDashboardRoute = () => {
        if (!user) {
            return "/auth/login";
        }

        const role = user?.roles[0]?.role;
        switch (role) {
            case ADMIN_ROLE:
                return "/admin/dashboard";
            case SUPER_ADMIN_ROLE:
                return "/dashboard";
            case RESULT_MANAGER_ROLE:
                return "/my-results";
            default:
                return "/auth/login";
        }
    };

    return useRoutes([
        {
            path: "/",
            element: isAuthorized ? (
                <Navigate to={getDashboardRoute()} replace/>
            ) : (
                <Navigate to="/auth" replace/>
            )
        },
        LoginRoutes,
        ...MainRoutes,
    ]);
}

export default Router;


