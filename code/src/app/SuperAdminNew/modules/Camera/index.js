import React, { Suspense } from "react";
import { ContentRoute, LayoutSplashScreen } from "../../../../_metronic/layout";
import { Switch } from "react-router-dom";
import {CameraPage} from "./components/CameraPage";

export default function Cameras() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute
          path={"/cameras"}
          component={CameraPage}
        />
      </Switch>
    </Suspense>
  );
}
