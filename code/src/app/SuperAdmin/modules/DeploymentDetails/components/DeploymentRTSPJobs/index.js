import React, { Suspense } from "react";
import { DeploymentRTSPJobsPage } from "./DeploymentRTSPJobTable/DeploymentRTSPJobsPage";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { Routes, Route } from "react-router-dom";

export default function DeploymentRTSPJobs({ setKey }) {
  return (
    <Suspense fallback={<LayoutSplashScreen /> }>
      <Routes>
        <Route
          path="/deploymentDetails/deploymentRTSPJobsPage/*"
          element={<DeploymentRTSPJobsPage setKey={setKey} />}
        />
      </Routes>
    </Suspense>
  );
}
