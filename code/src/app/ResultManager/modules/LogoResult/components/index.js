import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";
import LogoResultPage from "./LogoResultPage";

export default function LogoResultIndex() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path="/" element={<LogoResultPage />} />
      </Routes>
    </Suspense>
  );
}
