import React, { Suspense } from "react";
import { ContentRoute, LayoutSplashScreen } from "../../../_metronic/layout";
import { Switch } from "react-router-dom";
import { ADMIN_URL } from "../../../enums/constant";
import MyAllCameraLog from "../modules/AllCameraLogTable";

function AllCameraLogPage(props) {
  return (
    <div>
        <MyAllCameraLog/>
      {/*<Suspense fallback={<LayoutSplashScreen />}>*/}
      {/*  <Switch>*/}
      {/*    <ContentRoute*/}
      {/*      path={ADMIN_URL + "/camera-logs"}*/}
      {/*      component={MyAllCameraLog}*/}
      {/*    />*/}
      {/*  </Switch>*/}
      {/*</Suspense>*/}
    </div>
  );
}

export default AllCameraLogPage;
