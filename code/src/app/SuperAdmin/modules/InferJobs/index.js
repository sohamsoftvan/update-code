import React, { Suspense } from "react";
import { InferJobsPage } from "./InferJobTable/InferJobsPage";

import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Navigate, Routes, Route } from "react-router-dom";

export default function InferJobs() {
  return (
    <Suspense fallback={<LayoutSplashScreen /> }>
      <Routes>
        {/* Redirect from /inferJobs root URL to /inferJobs/inferJobsPage */}
        <Route
          path="/inferJobs"
          element={<Navigate to="/inferJobs/inferJobsPage" replace />}
        />
        <Route
          path="/inferJobs/inferJobsPage"
          element={<InferJobsPage />}
        />
      </Routes>
    </Suspense>
  );
}
