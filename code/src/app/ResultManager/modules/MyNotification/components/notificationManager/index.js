import React, { Suspense } from "react";

import {
    ContentRoute,
    LayoutSplashScreen,
} from "../../../../../../_metronic/layout";
import { MyNotificationViewPage} from "./MyNotificationViewTable/MyNotificationViewPage";

export default function NotificationAlert() {
    return (
        <MyNotificationViewPage/>
        // <Suspense fallback={<LayoutSplashScreen />}>
        //     <Switch>
        //         <ContentRoute path={"/notificationAlert"} component={MyNotificationViewPage} />
        //     </Switch>
        // </Suspense>
    );
}
