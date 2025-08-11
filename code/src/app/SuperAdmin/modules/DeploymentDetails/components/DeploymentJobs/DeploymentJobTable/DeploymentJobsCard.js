import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../../../_metronic/_partials/controls";
import { DeploymentJobTable } from "./deployment-job-table/DeploymentJobTable";
import { useDeploymentJobsUIContext } from "./DeploymentJobsUIContext";
import CustomizedButtons from "../../../../../../../utils/SuperAdmin/CustomizedButtons";

export function DeploymentJobsCard() {
  const deploymentJobUIContext = useDeploymentJobsUIContext();
  const deploymentJobUIProps = useMemo(() => {
    return {
      openNewDeploymentJobDialog:
        deploymentJobUIContext.openNewDeploymentJobDialog
    };
  }, [deploymentJobUIContext]);

  return (
    <Card>
      <CardHeader title="Deployment Jobs Data">
        <CardHeaderToolbar>
          <CustomizedButtons title={"Add Deployment Job"} color={"primary"} submit={deploymentJobUIProps.openNewDeploymentJobDialog}/>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DeploymentJobTable />
      </CardBody>
    </Card>
  );
}
