import React, { Suspense } from "react";
import { ContentRoute, LayoutSplashScreen } from "../../../../_metronic/layout";
import { Switch } from "react-router-dom";
import { CompanyUserPage } from "./components/CompanyUserPage";

export default function CompanyUser() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute
          path={"/company/company-user"}
          component={CompanyUserPage}
        />
      </Switch>
    </Suspense>
  );
}
