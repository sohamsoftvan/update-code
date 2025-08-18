import React, { Suspense } from "react";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { DevicePage } from "./DeviceTable/DevicePage";
import { Navigate, Routes, Route } from "react-router-dom";

export default function Device() {
  return (
    <Suspense fallback={<LayoutSplashScreen /> }>
      <Routes>
        {/* Redirect from device root URL to devicePage */}
        <Route index element={<Navigate to="devicePage" replace />} />
        <Route path="devicePage/*" element={<DevicePage />} />
      </Routes>
    </Suspense>
  );
}
