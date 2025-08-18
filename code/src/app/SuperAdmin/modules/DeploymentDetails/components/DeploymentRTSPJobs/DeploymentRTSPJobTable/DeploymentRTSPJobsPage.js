import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { DeploymentRTSPJobsUIProvider } from "./DeploymentRTSPJobsUIContext";
import { DeploymentRTSPJobsCard } from "./DeploymentRTSPJobsCard";
import { DeploymentRTSPJobNewDialog } from "./deployment-rtsp-job-new-dialog/DeploymentRTSPJobNewDialog";
import { DeploymentRTSPJobsViewDialog } from "./deployment-rtsp-job-view-dialog/DeploymentRTSPJobsViewDialog";
import { DeploymentRTSPJobStartDialog } from "./deployment-rtsp-job-start-dialog/DeploymentRTSPJobStartDialog";

function DeploymentRTSPJobNewDialogWrapper() {
  const navigate = useNavigate();
  const deploymentRTSPJobsPageBaseUrl = "/deploymentDetails/deploymentRTSPJobsPage";
  return (
    <DeploymentRTSPJobNewDialog
      show={true}
      onHide={() => {
        navigate(deploymentRTSPJobsPageBaseUrl);
      }}
    />
  );
}

function DeploymentRTSPJobsViewDialogWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deploymentRTSPJobsPageBaseUrl = "/deploymentDetails/deploymentRTSPJobsPage";
  return (
    <DeploymentRTSPJobsViewDialog
      show={true}
      id={id}
      onHide={() => {
        navigate(deploymentRTSPJobsPageBaseUrl);
      }}
    />
  );
}

function DeploymentRTSPJobStartDialogWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deploymentRTSPJobsPageBaseUrl = "/deploymentDetails/deploymentRTSPJobsPage";
  return (
    <DeploymentRTSPJobStartDialog
      show={true}
      id={id}
      onHide={() => {
        navigate(deploymentRTSPJobsPageBaseUrl);
      }}
    />
  );
}

export function DeploymentRTSPJobsPage({ setKey }) {
  const deploymentRTSPJobsPageBaseUrl =
    "/deploymentDetails/deploymentRTSPJobsPage";
  const navigate = useNavigate();

  useEffect(
    () => setKey("deploymentRTSPJobs"),
    //eslint-disable-next-line
    []
  );

  const deploymentRTSPJobsUIEvents = {
    newDeploymentRTSPJobBtnClick: () => {
      navigate(`${deploymentRTSPJobsPageBaseUrl}/new`);
    },
    openViewDeploymentRTSPJobBtnClick: id => {
      navigate(`${deploymentRTSPJobsPageBaseUrl}/${id}/view`);
    },
    openStartDeploymentRTSPJobBtnClick: id => {
      navigate(`${deploymentRTSPJobsPageBaseUrl}/${id}/deploy`);
    }
  };

  return (
    <DeploymentRTSPJobsUIProvider
      deploymentRTSPJobsUIEvents={deploymentRTSPJobsUIEvents}
    >
      <Routes>
        <Route path={`${deploymentRTSPJobsPageBaseUrl}/new`} element={<DeploymentRTSPJobNewDialogWrapper />} />
        <Route path={`${deploymentRTSPJobsPageBaseUrl}/:id/view`} element={<DeploymentRTSPJobsViewDialogWrapper />} />
        <Route path={`${deploymentRTSPJobsPageBaseUrl}/:id/deploy`} element={<DeploymentRTSPJobStartDialogWrapper />} />
      </Routes>
      <DeploymentRTSPJobsCard />
    </DeploymentRTSPJobsUIProvider>
  );
}
