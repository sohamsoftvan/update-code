import React, { Suspense } from "react";
import { ContentRoute, LayoutSplashScreen } from "../../../../_metronic/layout";
import { Switch } from "react-router-dom";
import {AllCameraStatusPage} from "./components/AllCameraStatusPage";

export default function AllCameraStatus() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute
          path={"/camera-status"}
          component={AllCameraStatusPage}
        />
      </Switch>
    </Suspense>
  );
}
