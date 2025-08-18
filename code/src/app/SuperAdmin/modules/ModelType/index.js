import React, { Suspense } from "react";
import { ModelTypePage } from "./ModeTypeTable/ModelTypePage";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Navigate, Routes, Route } from "react-router-dom";

export default function ModelType() {
  return (
    <Suspense fallback={<LayoutSplashScreen /> }>
      <Routes>
        {/* Redirect from /modelType to /modelType/modelTypePage */}
        <Route index element={<Navigate to="modelTypePage" replace />}/>
        <Route path="modelTypePage/*" element={<ModelTypePage />}/>
      </Routes>
    </Suspense>
  );
}
