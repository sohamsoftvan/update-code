import React, { Suspense } from "react";
import { ViewAIModelPage } from "./AIModelTable/ViewAIModelPage";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { Navigate, Routes, Route } from "react-router-dom";

export default function ViewAIModel() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Routes>
                {/* Redirect from aiModel root URL to /modelData */}
                <Route
                    path="/aiModel/view"
                    element={<Navigate to="/aiModel/view/modelData" replace />}
                />
                <Route path="/aiModel/view/modelData" element={<ViewAIModelPage />} />
            </Routes>
        </Suspense>
    );
}
