import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../../../_metronic/_partials/controls";
import { DeploymentRTSPJobTable } from "./deployment-rtsp-job-table/DeploymentRTSPJobTable";
import { useDeploymentRTSPJobsUIContext } from "./DeploymentRTSPJobsUIContext";
import CustomizedButtons from "../../../../../../../utils/SuperAdmin/CustomizedButtons";

export function DeploymentRTSPJobsCard() {
  const deploymentRTSPJobUIContext = useDeploymentRTSPJobsUIContext();
  const deploymentRTSPJobUIProps = useMemo(() => {
    return {
      openNewDeploymentRTSPJobDialog:
        deploymentRTSPJobUIContext.openNewDeploymentRTSPJobDialog
    };
  }, [deploymentRTSPJobUIContext]);

  return (
    <Card>
      <CardHeader title="Deployment RTSP jobs Data">
        <CardHeaderToolbar>
          <CustomizedButtons title={"Add Deployment RTSP job"} color={"primary"} submit={deploymentRTSPJobUIProps.openNewDeploymentRTSPJobDialog}/>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DeploymentRTSPJobTable />
      </CardBody>
    </Card>
  );
}
