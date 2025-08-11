
import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout";
import { DashboardPage } from "./Admin/pages/DashboardPage";
import MyResultsTabPage from "./Admin/pages/MyResultsTabPage";
import { AttendancePage } from "./Admin/pages/AttendancePage";
import { ViolationPage } from "./Admin/pages/ViolationPage";
import { AllNotificationPage } from "./Admin/pages/AllNotificationPage";
import MyEventsTabPage from "./Admin/pages/MyEventsTabPage";
import {ADMIN_URL} from "../enums/constant";
import AllCameraLogPage from "./Admin/pages/AllCameraLogPage";
import AllCameraStatusPage from "./Admin/pages/AllCameraStatusPage";


export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path="/admin/dashboard" component={DashboardPage} />
        <ContentRoute path="/my-results" component={MyResultsTabPage} />
        <ContentRoute path="/my-events" component={MyEventsTabPage} />
        <ContentRoute path="/attendance" component={AttendancePage} />
        <ContentRoute path="/violation" component={ViolationPage} />
         <ContentRoute path="/allNotification" component={AllNotificationPage} />
         <ContentRoute
            path={ADMIN_URL + "/camera-logs"}
            component={AllCameraLogPage}
        />
        <ContentRoute
            path={ADMIN_URL + "/camera-status"}
            component={AllCameraStatusPage}
        />
      </Switch>
    </Suspense>
  );
}
