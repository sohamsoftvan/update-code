import React, { Suspense } from "react";
import { DeploymentTypePage } from "./DeploymentTypeTable/DeploymentTypePage";

import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Navigate, Routes, Route } from "react-router-dom";

export default function DeploymentType() {
  return (
    <Suspense fallback={<LayoutSplashScreen /> }>
      <Routes>
        {/* Redirect from deploymentType root URL to deploymentTypePage */}
        <Route index element={<Navigate to="deploymentTypePage" replace />} />
        <Route path="deploymentTypePage/*" element={<DeploymentTypePage />} />
      </Routes>
    </Suspense>
  );
}
