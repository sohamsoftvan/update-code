import React, { Suspense } from "react";
import { DeployedJobsPage } from "./DeployedJobTable/DeployedJobsPage";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { Navigate, Routes, Route } from "react-router-dom";

export default function DeployedJobs({ setKey }) {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Routes>
                {/* Redirect from index to deployedJobsPage */}
                <Route index element={<Navigate to="deployedJobsPage" replace />} />
                <Route path="deployedJobsPage/*" element={<DeployedJobsPage setKey={setKey} />} />
            </Routes>
        </Suspense>
    );
}
