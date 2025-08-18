import React, { Suspense } from "react";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Routes, Route } from "react-router-dom";
import {AllCameraStatusPage} from "./components/AllCameraStatusPage";

export default function AllCameraStatus() {
  return (
      <AllCameraStatusPage />
    // <Suspense fallback={<LayoutSplashScreen />}>
    //   <Routes>
    //     <Route
    //       path={"/camera-status"}
    //       element={<AllCameraStatusPage />}
    //     />
    //   </Routes>
    // </Suspense>
  );
}
