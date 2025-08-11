import React, {Suspense} from "react";
import {ContentRoute, LayoutSplashScreen, useSubheader} from "../../../../_metronic/layout";
import {Switch} from "react-router-dom";
import {FeedbackPage} from "./components/FeedbackPage";

export default function Feedbacks() {
    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                <ContentRoute path="/feedbacks" component={FeedbackPage}/>
            </Switch>
        </Suspense>
    );
}