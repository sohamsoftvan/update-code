import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../_metronic/_partials/controls";
import { DeploymentTypeTable } from "./deployment-type-table/DeploymentTypeTable";
import { useDeploymentTypeUIContext } from "./DeploymentTypeUIContext";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";

export function DeploymentTypeCard() {
  const deploymentTypeUIContext = useDeploymentTypeUIContext();
  const usersUIProps = useMemo(() => {
    return {
      openNewDeploymentTypeDialog:
        deploymentTypeUIContext.openNewDeploymentTypeDialog
    };
  }, [deploymentTypeUIContext]);

  return (
    <Card>
      <CardHeader title="Deployment Type Data">
        <CardHeaderToolbar>
          <CustomizedButtons title={"Add Deployment Type"} color={"primary"} submit={usersUIProps.openNewDeploymentTypeDialog}/>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DeploymentTypeTable />
      </CardBody>
    </Card>
  );
}
