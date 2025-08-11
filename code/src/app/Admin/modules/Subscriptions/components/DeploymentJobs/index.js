import React, { Suspense } from "react";

import {
  ContentRoute,
  LayoutSplashScreen,
} from "../../../../../../_metronic/layout";
import { DeploymentJobsPage } from "./DeploymentJobsTable/DeploymentJobsPage";
import { ADMIN_URL } from "../../../../../../enums/constant";

export default function DeploymentJobs({ setKey }) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <ContentRoute
        path={ADMIN_URL + "/subscriptions/deploymentJobsPage"}
        children={<DeploymentJobsPage setKey={setKey} />}
      />
    </Suspense>
  );
}
