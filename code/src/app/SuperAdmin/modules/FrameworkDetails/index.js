import React, { Suspense } from "react";
import { FrameworkDetailsPage } from "./FrameworkDetailsTable/FrameworkDetailsPage";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Navigate, Routes, Route } from "react-router-dom";

export default function FrameworkDetails() {
  return (
    <Suspense fallback={<LayoutSplashScreen /> }>
      <Routes>
        {/* Redirect from frameworkDetails root URL to /frameworkDetails/frameworkDetailsPage */}
        <Route
          path="/frameworkDetails"
          element={<Navigate to="/frameworkDetails/frameworkDetailsPage" replace />}
        />
        <Route
          path="/frameworkDetails/frameworkDetailsPage"
          element={<FrameworkDetailsPage />}
        />
      </Routes>
    </Suspense>
  );
}
