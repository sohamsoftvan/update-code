import React, { Suspense } from "react";
import { ContentRoute, LayoutSplashScreen } from "../../../../_metronic/layout";
import { Switch } from "react-router-dom";
import { CameraLabelMappingPage } from "./components/CameraLabelMappingPage";

export default function CameraLabelMapping() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute
          path={"/company/camera-label-mapping"}
          component={CameraLabelMappingPage}
        />
      </Switch>
    </Suspense>
  );
}
