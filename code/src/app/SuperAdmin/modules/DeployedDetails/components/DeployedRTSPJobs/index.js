import React, { Suspense } from "react";
import { DeployedRTSPJobsPage } from "./DeployedRTSPJobTable/DeployedRTSPJobsPage";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { Routes, Route } from "react-router-dom";

export default function DeployedRTSPJobs({ setKey }) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route
          path="/deployedDetails/deployedRTSPJobsPage/*"
          element={<DeployedRTSPJobsPage setKey={setKey} />}
        />
      </Routes>
    </Suspense>
  );
}
