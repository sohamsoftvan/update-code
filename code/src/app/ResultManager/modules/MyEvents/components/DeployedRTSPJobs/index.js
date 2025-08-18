import React, {Suspense} from "react";
import {ContentRoute, LayoutSplashScreen,} from "../../../../../../_metronic/layout";
import {MyEventPage} from "./MyEventTable/MyEventPage";

export default function DeployedRTSPJobs() {
    return (
        <MyEventPage/>
        // <Suspense fallback={<LayoutSplashScreen />}>
        //     <Switch>
        //         <ContentRoute path={"/events"} component={MyEventPage} />
        //     </Switch>
        // </Suspense>
    );
}
