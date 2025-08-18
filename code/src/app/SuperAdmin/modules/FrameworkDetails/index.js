import React, { Suspense } from "react";
import { FrameworkDetailsPage } from "./FrameworkDetailsTable/FrameworkDetailsPage";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Navigate, Routes, Route } from "react-router-dom";

export default function FrameworkDetails() {
  return (
    <Suspense fallback={<LayoutSplashScreen /> }>
      <Routes>
        {/* Redirect from /frameworkDetails to /frameworkDetails/frameworkDetailsPage */}
        <Route index element={<Navigate to="frameworkDetailsPage" replace />} />
        <Route path="frameworkDetailsPage/*" element={<FrameworkDetailsPage />} />
      </Routes>
    </Suspense>
  );
}
