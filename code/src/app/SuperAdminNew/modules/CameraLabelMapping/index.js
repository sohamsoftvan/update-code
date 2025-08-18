import React, { Suspense } from "react";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Routes, Route } from "react-router-dom";
import { CameraLabelMappingPage } from "./components/CameraLabelMappingPage";

export default function CameraLabelMapping() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route
          path={"/company/camera-label-mapping"}
          element={<CameraLabelMappingPage />}
        />
      </Routes>
    </Suspense>
  );
}
