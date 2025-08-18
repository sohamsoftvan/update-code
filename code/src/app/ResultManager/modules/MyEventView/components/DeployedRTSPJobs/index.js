import React, { Suspense } from "react";

import {
  ContentRoute,
  LayoutSplashScreen,
} from "../../../../../../_metronic/layout";
import { MyEventViewPage } from "./MyEventViewTable/MyEventViewPage";

export default function DeployedRTSPEventView() {
  return (
      <MyEventViewPage/>
    // <Suspense fallback={<LayoutSplashScreen />}>
    // {/*  <Switch>*/}
    // {/*    <ContentRoute path={"/eventsList"} component={MyEventViewPage} />*/}
    // {/*  </Switch>*/}
    // {/*</Suspense>*/}
  );
}
