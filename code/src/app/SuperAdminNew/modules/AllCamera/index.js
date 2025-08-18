import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import {AllCameraPage} from "./components/AllCameraPage";

export default function AllCameraIndex() {
  return (
      <AllCameraPage />
    // <Suspense fallback={<LayoutSplashScreen />}>
    //   <Routes>
    //     <Route path="/allCamera" element={<AllCameraPage />} />
    //   </Routes>
    // </Suspense>
  );
}
