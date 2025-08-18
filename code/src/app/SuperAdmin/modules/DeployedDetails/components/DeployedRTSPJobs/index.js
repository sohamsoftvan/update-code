import React, { Suspense } from "react";
import { DeployedRTSPJobsPage } from "./DeployedRTSPJobTable/DeployedRTSPJobsPage";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { Routes, Route, Navigate } from "react-router-dom";

export default function DeployedRTSPJobs({ setKey }) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route index element={<Navigate to="deployedRTSPJobsPage" replace />} />
        <Route
          path="deployedRTSPJobsPage/*"
          element={<DeployedRTSPJobsPage setKey={setKey} />}
        />
      </Routes>
    </Suspense>
  );
}
