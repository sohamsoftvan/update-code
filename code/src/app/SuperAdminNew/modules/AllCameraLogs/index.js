import React, { Suspense } from "react";
import { ContentRoute, LayoutSplashScreen } from "../../../../_metronic/layout";
import { Switch } from "react-router-dom";
import {AllCameraLogPage} from "./components/AllCameraLogPage";

export default function AllCameraLog() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute
          path={"/camera-logs"}
          component={AllCameraLogPage}
        />
      </Switch>
    </Suspense>
  );
}
