import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { DeployedJobsUIProvider } from "./DeployedJobsUIContext";
import { DeployedJobsCard } from "./DeployedJobsCard";
import { DeployedJobsViewDialog } from "./deployed-job-view-dialog/DeployedJobsViewDialog";
import { DeploymentJobTerminateDialog } from "./deployed-job-terminate-dialog/DeployedJobTerminateDialog";

// Component for handling view dialog with route params
function DeployedJobsViewDialogWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deployedJobsPageBaseUrl = "/deployedDetails/deployedJobsPage";

  return (
    <DeployedJobsViewDialog
      show={true}
      id={id}
      onHide={() => {
        navigate(deployedJobsPageBaseUrl);
      }}
    />
  );
}

// Component for handling terminate dialog with route params
function DeploymentJobTerminateDialogWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deployedJobsPageBaseUrl = "/deployedDetails/deployedJobsPage";

  return (
    <DeploymentJobTerminateDialog
      show={true}
      id={id}
      onHide={() => {
        navigate(deployedJobsPageBaseUrl);
      }}
    />
  );
}

export function DeployedJobsPage({ setKey }) {
  const deployedJobsPageBaseUrl = "/deployedDetails/deployedJobsPage";
  const navigate = useNavigate();

  useEffect(
    () => setKey("deployedJobs"),
    //eslint-disable-next-line
    []
  );

  const deployedJobsUIEvents = {
    openViewDeployedJobBtnClick: id => {
      navigate(`${deployedJobsPageBaseUrl}/${id}/view`);
    },
    stopDeploymentJobBtnClick: id => {
      navigate(`${deployedJobsPageBaseUrl}/${id}/terminate`);
    }
  };

  return (
    <DeployedJobsUIProvider deployedJobsUIEvents={deployedJobsUIEvents}>
      <Routes>
        <Route path=":id/view" element={<DeployedJobsViewDialogWrapper />} />
        <Route path=":id/terminate" element={<DeploymentJobTerminateDialogWrapper />} />
      </Routes>
      <DeployedJobsCard />
    </DeployedJobsUIProvider>
  );
}
