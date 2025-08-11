import React, {Suspense} from "react";
import {ContentRoute, LayoutSplashScreen} from "../../../../_metronic/layout";
import {Switch} from "react-router-dom";
import {ComplaintPage} from "./components/ComplaintPage";

export default function Complaints() {
    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                <ContentRoute path="/complaints" component={ComplaintPage}/>
            </Switch>
        </Suspense>
    );
}