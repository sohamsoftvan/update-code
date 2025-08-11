import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import FrameUploaderPage from "./components/FrameUploaderPage";

export default function FrameUploader() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Routes>
                {/* Redirect /frame-uploader to default tab */}
                <Route
                    path="/company/frame-uploader"
                    element={<Navigate to="/company/frame-uploader/storage-frame" replace />}
                />

                {/* Dynamic tab route */}
                <Route
                    path="/company/frame-uploader/:tab"
                    element={<FrameUploaderPage />}
                />
            </Routes>
        </Suspense>
    );
}
