import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import AllCameraPage from "./AllCameraPage";

export default function AllCameraIndex() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path="/" element={<AllCameraPage />} />
      </Routes>
    </Suspense>
  );
}
