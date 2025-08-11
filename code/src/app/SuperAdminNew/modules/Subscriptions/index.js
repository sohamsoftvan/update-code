import React, { Suspense } from "react";
import { ContentRoute, LayoutSplashScreen } from "../../../../_metronic/layout";
import { Switch } from "react-router-dom";
import {SubscriptionPage} from "./components/SubscriptionPage";

export default function Subscription() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute
          path={"/subscriptions"}
          component={SubscriptionPage}
        />
      </Switch>
    </Suspense>
  );
}
