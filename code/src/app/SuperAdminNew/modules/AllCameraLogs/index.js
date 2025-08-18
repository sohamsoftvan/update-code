import React, { Suspense } from "react";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Routes, Route } from "react-router-dom";
import {AllCameraLogPage} from "./components/AllCameraLogPage";

export default function AllCameraLog() {
  return (
      <AllCameraLogPage />
    // <Suspense fallback={<LayoutSplashScreen />}>
    //   <Routes>
    //     <Route
    //       path={"/camera-logs"}
    //       element={<AllCameraLogPage />}
    //     />
    //   </Routes>
    // </Suspense>
  );
}
