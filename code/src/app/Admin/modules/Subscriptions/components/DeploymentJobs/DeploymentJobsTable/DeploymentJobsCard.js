import React from "react";
import { Card, CardBody } from "../../../../../../../_metronic/_partials/controls";
import { DeploymentJobTable } from "./deployment-job-table/DeploymentJobTable";

export function DeploymentJobsCard() {
  return (
    <Card>
      <CardBody>
        <DeploymentJobTable />
      </CardBody>
    </Card>
  );
}
