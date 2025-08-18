import React, { Suspense } from "react";
import { DeploymentJobsPage } from "./DeploymentJobTable/DeploymentJobsPage";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { Navigate, Routes, Route } from "react-router-dom";

export default function DeploymentJobs({ setKey }) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        {/* Redirect from index to deploymentJobsPage */}
        <Route index element={<Navigate to="deploymentJobsPage" replace />} />
        <Route
          path="deploymentJobsPage/*"
          element={<DeploymentJobsPage setKey={setKey} />}
        />
      </Routes>
    </Suspense>
  );
}
