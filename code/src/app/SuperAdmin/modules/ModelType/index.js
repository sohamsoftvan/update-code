import React, { Suspense } from "react";
import { ModelTypePage } from "./ModeTypeTable/ModelTypePage";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Navigate, Routes, Route } from "react-router-dom";

export default function ModelType() {
  return (
    <Suspense fallback={<LayoutSplashScreen /> }>
      <Routes>
        {/* Redirect from modelType root URL to /modelType/modelTypePage */}
        <Route
          path="/modelType"
          element={<Navigate to="/modelType/modelTypePage" replace />}
        />
        <Route
          path="/modelType/modelTypePage"
          element={<ModelTypePage />}
        />
      </Routes>
    </Suspense>
  );
}
