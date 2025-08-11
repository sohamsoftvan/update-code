import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../../../../_metronic/layout";
import FrameUploaderPage from "./components/FrameUploaderPage";

export default function FrameUploader() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                {/* Redirect /frame-uploader to default tab */}
                <ContentRoute exact path="/company/frame-uploader">
                    <Redirect to="/company/frame-uploader/storage-frame" />
                </ContentRoute>

                {/* Dynamic tab route */}
                <ContentRoute path="/company/frame-uploader/:tab" component={FrameUploaderPage} />
            </Switch>
        </Suspense>
    );
}
