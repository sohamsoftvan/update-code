import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import {ACCESS_TOKEN} from "../enums/auth.enums";

const ProtectedRoute = ({ routeRole, children }) => {
  const cookies = new Cookies();
  const isAuthenticated = Boolean(cookies.get(ACCESS_TOKEN));

  const userRole = useSelector(
      state =>
          state?.auth &&
          state?.auth?.user?.roles &&
          state?.auth?.user?.roles[0]?.role
  );
  const isAuthorized =
      isAuthenticated && routeRole.includes(userRole);

  return <>{isAuthorized ? children : <Navigate to="/auth/login" />}</>;
};

export default ProtectedRoute;

