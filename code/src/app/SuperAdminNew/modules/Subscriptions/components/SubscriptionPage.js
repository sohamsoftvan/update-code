import React from "react";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import {CommonTabs} from "../../../../../utils/SuperAdmin/CommonTabs";
import DeployedJobsPage from "./DeployedJobs";

export function SubscriptionPage() {

    const tabConfig = [
        {
            label: "Subscribed",
            content: <div className="mx-5 my-5"><DeployedJobsPage deployedJob={true}/></div>,
        },
        {
            label: "Requested",
            content: <div className="mx-5 mt-5 mb-5"><DeployedJobsPage/></div>,
        },
    ];

    return (
        <>

            <Card className="example example-compact">
                <CardBody>
                    <CommonTabs tabConfig={tabConfig}/>
                </CardBody>
            </Card>
        </>
    );
}

