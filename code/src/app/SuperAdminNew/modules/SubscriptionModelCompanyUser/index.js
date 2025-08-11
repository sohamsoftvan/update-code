import React, { Suspense } from "react";
import {SubscriptionModelPage} from "./components/SubscriptionModelPage";

export default function SubscriptionModelCompanyUser() {
  return (
      <SubscriptionModelPage/>
    // <Suspense fallback={<LayoutSplashScreen />}>
    //   <Switch>
    //     <ContentRoute
    //       path={"/company/subscription-model"}
    //       component={SubscriptionModelPage}
    //     />
    //   </Switch>
    // </Suspense>
  );
}
