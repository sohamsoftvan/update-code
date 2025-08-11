import React, { Suspense } from "react";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Routes, Route } from "react-router-dom";
import { CameraPage } from "./components/CameraPage";
import { ADMIN_URL } from "../../../../enums/constant";

export default function Cameras() {
  return (
      <CameraPage/>
    // <Suspense fallback={<LayoutSplashScreen />}>
    //   <Routes>
    //     <Route path={ADMIN_URL + "/cameras"} element={<CameraPage />} />
    //   </Routes>
    // </Suspense>
  );
}
