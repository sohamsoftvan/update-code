import React, { Suspense } from "react";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Routes, Route } from "react-router-dom";
import { AddSupervisorPage } from "./components/AddSupervisorPage";

export default function AddSupervisor() {
  return (
      <AddSupervisorPage />
    // <Suspense fallback={<LayoutSplashScreen /> }>
    //   <Routes>
    //     <Route
    //       path={"/addSupervisor"}
    //       element={<AddSupervisorPage />}
    //     />
    //   </Routes>
    // </Suspense>
  );
}
