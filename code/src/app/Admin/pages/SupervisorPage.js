import {
  useSubheader,
} from "../../../_metronic/layout";
import React from "react";
import { SupervisorPage } from "../modules/AddSupervisor";

export function Supervisor() {
  const subheader = useSubheader();
  subheader.setTitle("Supervisor");

  return (
      <SupervisorPage/>
    // <Suspense fallback={<LayoutSplashScreen />}>
    //   <Switch>
    //     <ContentRoute
    //       path={ADMIN_URL + "/addSupervisor"}
    //       component={SupervisorPage}
    //     />
    //   </Switch>
    // </Suspense>
  );
}
