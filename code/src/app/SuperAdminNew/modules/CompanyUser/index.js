import React, { Suspense } from "react";
import { CompanyUserPage } from "./components/CompanyUserPage";

export default function CompanyUser() {
  return (
      <CompanyUserPage/>
    // <Suspense fallback={<LayoutSplashScreen />}>
    //   <Switch>
    //     <ContentRoute
    //       path={"/company/company-user"}
    //       component={CompanyUserPage}
    //     />
    //   </Switch>
    // </Suspense>
  );
}
