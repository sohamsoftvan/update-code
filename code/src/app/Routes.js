// import React from "react";
// import { Redirect, Switch, Route } from "react-router-dom";
// import {shallowEqual, useSelector} from "react-redux";
// import { Layout } from "../_metronic/layout";
// import BasePage from "./BasePage";
// import { Logout, AuthPage } from "./Admin/modules/Auth";
// import ErrorsPage from "./Admin/modules/ErrorsExamples/ErrorsPage";
// import Cookies from "universal-cookie";
// import AdminBasePage from "./AdminBasePage";
// import SuperAdminBasePage from "./SuperAdminBasePage";
// import ResultManagerBasePage from "./ResultManagerBasePage";
// import {
//   ADMIN_ROLE,
//   ADMIN_URL,
//   RESULT_MANAGER_ROLE,
//   SUPER_ADMIN_ROLE
// } from "../enums/constant";
//
// export function Routes() {
//
//   const { isAuthorized = false, user } = useSelector(
//     ({ auth }) => {
//       const cookies = new Cookies();
//       const accessToken = cookies.get("access_token");
//       const tokenType = cookies.get("token_type");
//
//       return {
//         isAuthorized: auth.user?.id && accessToken && tokenType,
//         user: auth.user
//       };
//     },
//     shallowEqual
//   );
//
//
//   // Helper function to get redirect path based on user role
//   const getRedirectPath = () => {
//     if (!user?.roles?.[0]?.role) return "/";
//     switch (user.roles[0].role) {
//       case ADMIN_ROLE:
//         return "/admin/dashboard";
//       case SUPER_ADMIN_ROLE:
//         return "/superadmin/dashboard";
//       case RESULT_MANAGER_ROLE:
//         return "/resultmanager/dashboard";
//       default:
//         return "/";
//     }
//   };
//
//   return (
//     <Routes>
//       {!isAuthorized && (
//         <Route path="*" element={<AuthPage />} />
//       )}
//       <Route path="/error" element={<ErrorsPage />} />
//       <Route path="/logout" element={<Logout />} />
//       <Route path="/auth/login" element={
//         (() => {
//           const cookies = new Cookies();
//           const accessToken = cookies.get("access_token");
//           const tokenType = cookies.get("token_type");
//           if (accessToken && tokenType) {
//             // If tokens exist, redirect to dashboard or last page
//             return <Navigate to={getRedirectPath()} replace />;
//           }
//           return <AuthPage />;
//         })()
//       } />
//       <Route path="/" element={<Navigate to="/auth/login" replace />} />
//       <Route
//         path={ADMIN_URL + "/subscriptions"}
//         element={<Navigate to={ADMIN_URL + "/subscriptions/deployedJobsPage"} replace />}
//       />
//       {!isAuthorized ? (
//         user?.company ? (
//           <Route path="*" element={<Navigate to="/auth/user-registration" replace />} />
//         ) : (
//           <Route path="*" element={<Navigate to="/auth/login" replace />} />
//         )
//       ) : (
//         <Route path="/*" element={
//           <Layout>
//             {user?.roles[0].role === ADMIN_ROLE ? (
//               <AdminBasePage />
//             ) : user?.roles[0].role === SUPER_ADMIN_ROLE ? (
//               <SuperAdminBasePage />
//             ) : user?.roles[0].role === RESULT_MANAGER_ROLE ? (
//               <ResultManagerBasePage />
//             ) : (
//               <BasePage />
//             )}
//           </Layout>
//         } />
//       )}
//     </Routes>
//   );
// }

import React from "react";
import {Navigate, useRoutes} from "react-router-dom";
import {shallowEqual, useSelector} from "react-redux";
import {ADMIN_ROLE, RESULT_MANAGER_ROLE, SUPER_ADMIN_ROLE,} from "../enums/constant"; // Adjust roles accordingly
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
                return "/superadmin/dashboard";
            case RESULT_MANAGER_ROLE:
                return "/resultmanager/dashboard";
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


