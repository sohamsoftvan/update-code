import {
  ContentRoute,
  LayoutSplashScreen,
  useSubheader,
} from "../../../_metronic/layout";
import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { ADMIN_URL } from "../../../enums/constant";
import { EmployeeIndexPage } from "../modules/Employee";

export function EmployeePage() {
  const subheader = useSubheader();
  subheader.setTitle("Employee");

  return (
    //<Supervisors/>
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute
          path={ADMIN_URL + "/employee"}
          component={EmployeeIndexPage}
        />
      </Switch>
    </Suspense>
  );
}
