import React, {Suspense} from "react";
import {ComplaintPage} from "./components/ComplaintPage";

export default function Complaints() {
    return (
        <ComplaintPage/>
        // <Suspense fallback={<LayoutSplashScreen/>}>
        //     <Switch>
        //         <ContentRoute path="/complaints" component={ComplaintPage}/>
        //     </Switch>
        // </Suspense>
    );
}