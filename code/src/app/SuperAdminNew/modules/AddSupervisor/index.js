import React, { Suspense } from "react";
import { ContentRoute, LayoutSplashScreen } from "../../../../_metronic/layout";
import { Switch } from "react-router-dom";
import { AddSupervisorPage } from "./components/AddSupervisorPage";

export default function AddSupervisor() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute
          path={"/addSupervisor"}
          component={AddSupervisorPage}
        />
      </Switch>
    </Suspense>
  );
}
