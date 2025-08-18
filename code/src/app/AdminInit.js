import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { getAllDeployedRTSPJobsDetails } from "./Admin/modules/DashboardGraph/_redux";
import { setSubscription } from "../redux/subscriptionReducer";

export default function AdminInit({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user?.id && new Cookies().get("access_token"),
      user: auth.user,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!user) return;
    getAllDeployedRTSPJobsDetails()
      .then((response) => {
        if (response && response.isSuccess) {
          dispatch(setSubscription(true));
        }
      })
      .catch(() => {
        dispatch(setSubscription(false));
      });
  }, [dispatch, user]);

  return <>{children}</>;
}


