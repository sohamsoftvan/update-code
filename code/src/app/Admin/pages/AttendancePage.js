import {useSubheader} from "../../../_metronic/layout";
import AttendanceTabPage from "../modules/Attendance";
import React from "react";

export function AttendancePage(){
    const subheader = useSubheader();
    subheader.setTitle("Attendance");

    return (
        <AttendanceTabPage/>
    );
}