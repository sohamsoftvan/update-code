import React, { Suspense } from "react";

import {
  ContentRoute,
  LayoutSplashScreen
} from "../../../../../../_metronic/layout";
import { Switch } from "react-router-dom";
import { MyEventPage } from "./MyEventTable/MyEventPage";

export default function DeployedRTSPEvents() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path={"/my-events"} component={MyEventPage} />
      </Switch>
    </Suspense>
  );
}
