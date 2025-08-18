import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import FrameUploaderPage from "./components/FrameUploaderPage";

export default function FrameUploader() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Routes>
                {/* Redirect index to default tab */}
                <Route index element={<Navigate to="storage-frame" replace />} />

                {/* Dynamic tab route */}
                <Route path=":tab" element={<FrameUploaderPage />} />
            </Routes>
        </Suspense>
    );
}
