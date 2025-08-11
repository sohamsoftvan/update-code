import React, { Suspense, useEffect } from "react";
import { LayoutSplashScreen } from "../../../_metronic/layout";
import RequestedResults from "../modules/Subscriptions";
import { ADMIN_URL } from "../../../enums/constant";
import { useNavigate } from "react-router-dom";

export default function SubscriptionTabPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(ADMIN_URL + "/subscriptions/deployedJobsPage");
    // eslint-disable-next-line
  }, [navigate]);
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <RequestedResults />
    </Suspense>
  );
}
