import React, { Suspense } from "react";
import { InferJobsPage } from "./InferJobTable/InferJobsPage";

import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Navigate, Routes, Route } from "react-router-dom";

export default function InferJobs() {
  return (
    <Suspense fallback={<LayoutSplashScreen /> }>
      <Routes>
        {/* Redirect from /inferJobs to /inferJobs/inferJobsPage */}
        <Route index element={<Navigate to="inferJobsPage" replace />} />
        <Route path="inferJobsPage/*" element={<InferJobsPage />} />
      </Routes>
    </Suspense>
  );
}
