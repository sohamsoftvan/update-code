import React from "react";
import { ADMIN_URL } from "../../../../../enums/constant";
import {ViolationNotificationUIProvider} from "./ViolationNotificationUIContext";
import ViolationNotification from "./ViolationNotification";

export function ViolationNotificationPage({ history ,violationNotification }) {
    const violationNotificationPageBaseUrl = ADMIN_URL + "/violation";
    const violationNotificationUIEvents = {
        editViolationNotificationBtnClick: (id) => {
            history.push(`${violationNotificationPageBaseUrl}/${id}/edit`);
        },
    };

    return (
        <ViolationNotificationUIProvider violationNotificationUIEvents={violationNotificationUIEvents}>
            <ViolationNotification
                violationNotification={violationNotification}
            />
        </ViolationNotificationUIProvider>
    );
}
