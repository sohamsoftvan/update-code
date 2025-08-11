import {useSubheader} from "../../../_metronic/layout";
import ViolationTabPage from "../modules/Violation";
import React from "react";

export function ViolationPage(){
    const subheader = useSubheader();
    subheader.setTitle("Violation");

    return (
        <ViolationTabPage/>
    );
}