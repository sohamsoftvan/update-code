import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import NotificationManagerPage from "./NotificationManagerPage";

export default function NotificationManagerIndex() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path="/" element={<NotificationManagerPage />} />
      </Routes>
    </Suspense>
  );
}
