import React, { Suspense } from "react";

import {
  ContentRoute,
  LayoutSplashScreen,
} from "../../../../../../_metronic/layout";
import { MyResultPage } from "./MyResultTable/MyResultPage";

export default function DeployedRTSPJobs() {
  return (
      <MyResultPage/>
    // <Suspense fallback={<LayoutSplashScreen />}>
    // {/*  <Switch>*/}
    // {/*    <ContentRoute path={"/my-results"} component={MyEventPage} />*/}
    // {/*  </Switch>*/}
    // {/*</Suspense>*/}
  );
}
