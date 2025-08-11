import React, { Suspense } from "react";
import { ContentRoute, LayoutSplashScreen } from "../../../../_metronic/layout";
import { Switch } from "react-router-dom";
import {SubscriptionModelPage} from "./components/SubscriptionModelPage";

export default function SubscriptionModelCompanyUser() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute
          path={"/company/subscription-model"}
          component={SubscriptionModelPage}
        />
      </Switch>
    </Suspense>
  );
}
