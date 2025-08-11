import React, { Suspense } from "react";
import { LocationPage } from "./components/LocationPage";

export default function Locations() {
  return (
      <LocationPage/>
    // <Suspense fallback={<LayoutSplashScreen />}>
    //   <Switch>
    //     <ContentRoute
    //       path={"/locations"}
    //       component={LocationPage}
    //     />
    //   </Switch>
    // </Suspense>
  );
}
