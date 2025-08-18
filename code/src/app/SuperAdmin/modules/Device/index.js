import React, { Suspense } from "react";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { DevicePage } from "./DeviceTable/DevicePage";
import { Navigate, Routes, Route } from "react-router-dom";

export default function Device() {
    console.log("device page")
  return (
    <Suspense fallback={<LayoutSplashScreen /> }>
      <Routes>
        {/* Redirect from device root URL to /device/devicePage */}
        <Route path="/device" element={<Navigate to="/device/devicePage" replace />} />
        <Route path="/device/devicePage" element={<DevicePage />} />
      </Routes>
    </Suspense>
  );
}
