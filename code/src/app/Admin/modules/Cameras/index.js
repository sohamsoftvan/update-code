import React, { Suspense } from "react";
import { ContentRoute, LayoutSplashScreen } from "../../../../_metronic/layout";
import { Switch } from "react-router-dom";
import { CameraPage } from "./components/CameraPage";
import { ADMIN_URL } from "../../../../enums/constant";

export default function Cameras() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path={ADMIN_URL + "/cameras"} component={CameraPage} />
      </Switch>
    </Suspense>
  );
}
