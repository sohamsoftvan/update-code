import React, { Suspense } from "react";
import { ContentRoute, LayoutSplashScreen } from "../../../_metronic/layout";
import { Switch } from "react-router-dom";
import { ADMIN_URL } from "../../../enums/constant";
import MyAllCameraStatus from "../modules/AllCameraStatusTable";

function AllCameraStatusPage() {
  return (
    <div>
        <MyAllCameraStatus/>
      {/*<Suspense fallback={<LayoutSplashScreen />}>*/}
      {/*  <Switch>*/}
      {/*    <ContentRoute*/}
      {/*      path={ADMIN_URL + "/camera-status"}*/}
      {/*      component={MyAllCameraStatus}*/}
      {/*    />*/}
      {/*  </Switch>*/}
      {/*</Suspense>*/}
    </div>
  );
}

export default AllCameraStatusPage;
