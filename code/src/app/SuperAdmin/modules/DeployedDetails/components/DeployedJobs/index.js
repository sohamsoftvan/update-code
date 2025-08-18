import React, { Suspense } from "react";
import { DeployedJobsPage } from "./DeployedJobTable/DeployedJobsPage";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { Navigate, Routes, Route } from "react-router-dom";

export default function DeployedJobs({ setKey }) {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Routes>
                {/* Redirect from /deployedDetails root URL to /deployedDetails/deployedJobsPage */}
                <Route
                    path="/deployedDetails"
                    element={<Navigate to="/deployedDetails/deployedJobsPage" replace />}
                />
                <Route path="/deployedDetails/deployedJobsPage/*" element={<DeployedJobsPage setKey={setKey} />} />
            </Routes>
        </Suspense>
    );
}
