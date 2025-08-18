import React, { Suspense } from "react";
import { DeploymentJobsPage } from "./DeploymentJobTable/DeploymentJobsPage";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { Navigate, Routes, Route } from "react-router-dom";

export default function DeploymentJobs({ setKey }) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        {/* Redirect from /deploymentDetails root URL to /deploymentDetails/deploymentJobsPage */}
        <Route
          path="/deploymentDetails"
          element={<Navigate to="/deploymentDetails/deploymentJobsPage" replace />}
        />
        <Route
          path="/deploymentDetails/deploymentJobsPage/*"
          element={<DeploymentJobsPage setKey={setKey} />}
        />
      </Routes>
    </Suspense>
  );
}
