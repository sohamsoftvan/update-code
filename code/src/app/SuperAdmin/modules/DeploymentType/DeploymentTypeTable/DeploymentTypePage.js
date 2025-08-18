import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { DeploymentTypeUIProvider } from "./DeploymentTypeUIContext";
import { DeploymentTypeCard } from "./DeploymentTypeCard";
import { DeploymentTypeEditDialog } from "./deployment-type-edit-dialog/DeploymentTypeEditDialog";
import { DeploymentTypeStatusDialog } from "./deployment-type-status-dialog/DeploymentTypeStatusDialog";

export function DeploymentTypePage() {
  const deploymentTypePageBaseUrl = "/deploymentType/deploymentTypePage";
  const navigate = useNavigate();

  const deploymentTypeUIEvents = {
    newDeploymentTypeBtnClick: () => {
      navigate(`new`);
    },
    editDeploymentTypeBtnClick: id => {
      navigate(`${id}/edit`);
    },
    changeStatusDeploymentTypeBtnClick: (id, status) => {
      navigate(`${id}/${status}/changeStatus`);
    }
  };

  return (
    <DeploymentTypeUIProvider deploymentTypeUIEvents={deploymentTypeUIEvents}>
      <Routes>
        <Route
          path="new"
          element={
            <DeploymentTypeEditDialog
              show={true}
              onHide={() => {
                navigate(deploymentTypePageBaseUrl);
              }}
            />
          }
        />
        <Route
          path=":id/edit"
          element={
            <DeploymentTypeEditDialog
              show={true}
              onHide={() => {
                navigate(deploymentTypePageBaseUrl);
              }}
            />
          }
        />
        <Route
          path=":id/:status/changeStatus"
          element={
            <DeploymentTypeStatusDialog
              show={true}
              onHide={() => {
                navigate(deploymentTypePageBaseUrl);
              }}
            />
          }
        />
      </Routes>
      <DeploymentTypeCard />
    </DeploymentTypeUIProvider>
  );
}
