import React, { Suspense } from "react";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Routes, Route } from "react-router-dom";
import {NotificationSendPage} from "./components/NotificationSendPage";

export default function NotificationSend() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route
          path={"/NotificationSend"}
          element={<NotificationSendPage />}
        />
      </Routes>
    </Suspense>
  );
}
