import React, { Suspense } from "react";
import {SubscriptionPage} from "./components/SubscriptionPage";

export default function Subscription() {
  return (
      <SubscriptionPage/>
    // <Suspense fallback={<LayoutSplashScreen />}>
    //   <Switch>
    //     <ContentRoute
    //       path={"/subscriptions"}
    //       component={SubscriptionPage}
    //     />
    //   </Switch>
    // </Suspense>
  );
}
