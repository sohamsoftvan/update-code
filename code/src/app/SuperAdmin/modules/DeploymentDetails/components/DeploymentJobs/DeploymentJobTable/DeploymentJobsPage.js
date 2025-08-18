import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { DeploymentJobsUIProvider } from "./DeploymentJobsUIContext";
import { DeploymentJobsCard } from "./DeploymentJobsCard";
import { DeploymentJobNewDialog } from "./deployment-job-new-dialog/DeploymentJobNewDialog";
import { DeploymentJobsViewDialog } from "./deployment-job-view-dialog/DeploymentJobsViewDialog";
import { DeploymentJobStartDialog } from "./deployment-job-start-dialog/DeploymentJobStartDialog";

// Component for handling new dialog
function DeploymentJobNewDialogWrapper() {
  const navigate = useNavigate();
  const deploymentJobsPageBaseUrl = "/deploymentDetails/deploymentJobsPage";

  return (
    <DeploymentJobNewDialog
      show={true}
      onHide={() => {
        navigate(deploymentJobsPageBaseUrl);
      }}
    />
  );
}

// Component for handling view dialog with route params
function DeploymentJobsViewDialogWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deploymentJobsPageBaseUrl = "/deploymentDetails/deploymentJobsPage";

  return (
    <DeploymentJobsViewDialog
      show={true}
      id={id}
      onHide={() => {
        navigate(deploymentJobsPageBaseUrl);
      }}
    />
  );
}

// Component for handling start dialog with route params
function DeploymentJobStartDialogWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deploymentJobsPageBaseUrl = "/deploymentDetails/deploymentJobsPage";

  return (
    <DeploymentJobStartDialog
      show={true}
      id={id}
      onHide={() => {
        navigate(deploymentJobsPageBaseUrl);
      }}
    />
  );
}

export function DeploymentJobsPage({ setKey }) {
  const deploymentJobsPageBaseUrl = "/deploymentDetails/deploymentJobsPage";
  const navigate = useNavigate();

  useEffect(
    () => setKey("deploymentJobs"),
    //eslint-disable-next-line
    []
  );

  const deploymentJobsUIEvents = {
    newDeploymentJobBtnClick: () => {
      navigate(`${deploymentJobsPageBaseUrl}/new`);
    },
    openViewDeploymentJobBtnClick: id => {
      navigate(`${deploymentJobsPageBaseUrl}/${id}/view`);
    },
    startDeploymentJobBtnClick: id => {
      navigate(`${deploymentJobsPageBaseUrl}/${id}/deploy`);
    }
  };

  return (
    <DeploymentJobsUIProvider deploymentJobsUIEvents={deploymentJobsUIEvents}>
      <Routes>
        <Route path={`${deploymentJobsPageBaseUrl}/new`} element={<DeploymentJobNewDialogWrapper />} />
        <Route path={`${deploymentJobsPageBaseUrl}/:id/view`} element={<DeploymentJobsViewDialogWrapper />} />
        <Route path={`${deploymentJobsPageBaseUrl}/:id/deploy`} element={<DeploymentJobStartDialogWrapper />} />
      </Routes>
      <DeploymentJobsCard />
    </DeploymentJobsUIProvider>
  );
}
