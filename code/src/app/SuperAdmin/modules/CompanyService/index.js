import React from "react";
import {CompanyServicePage } from "./components/CompanyServicePage";

export default function CompanyService() {
  return (
      <CompanyServicePage/>
    // <Suspense fallback={<LayoutSplashScreen />}>
    //   <Switch>
    //     <ContentRoute path={"/users/userPage"} component={CompanyServicePage} />
    //   </Switch>
    // </Suspense>
  );
}
