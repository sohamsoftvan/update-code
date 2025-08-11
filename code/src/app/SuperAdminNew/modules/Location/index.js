import React, { Suspense } from "react";
import { ContentRoute, LayoutSplashScreen } from "../../../../_metronic/layout";
import { Switch } from "react-router-dom";
import { LocationPage } from "./components/LocationPage";

export default function Locations() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute
          path={"/locations"}
          component={LocationPage}
        />
      </Switch>
    </Suspense>
  );
}
