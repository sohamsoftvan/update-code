import React, { Suspense } from "react";
import {
  ContentRoute,
  LayoutSplashScreen,
} from "../../../../../_metronic/layout";
import {LogoResultsPageCard} from "./LogoResultsPageCard";

export default function LogoResultsPage() {
  return (
      <LogoResultsPageCard/>
      // <Suspense fallback={<LayoutSplashScreen />}>
      //   <Switch>
      //     <ContentRoute path={"/logo-results"} component={LogoResultsPageCard} />
      //   </Switch>
      // </Suspense>
  );
}
