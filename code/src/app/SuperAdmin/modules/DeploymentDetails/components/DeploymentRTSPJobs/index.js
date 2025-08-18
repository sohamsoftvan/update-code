import React, { Suspense } from "react";
import { DeploymentRTSPJobsPage } from "./DeploymentRTSPJobTable/DeploymentRTSPJobsPage";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { Routes, Route, Navigate } from "react-router-dom";

export default function DeploymentRTSPJobs({ setKey }) {
  return (
    <Suspense fallback={<LayoutSplashScreen /> }>
      <Routes>
        <Route index element={<Navigate to="deploymentRTSPJobsPage" replace />} />
        <Route
          path="deploymentRTSPJobsPage/*"
          element={<DeploymentRTSPJobsPage setKey={setKey} />}
        />
      </Routes>
    </Suspense>
  );
}
