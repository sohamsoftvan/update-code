import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { DeployedRTSPJobsUIProvider } from "./DeployedRTSPJobsUIContext";
import { DeployedRTSPJobsCard } from "./DeployedRTSPJobsCard";
import { DeployedRTSPJobsViewDialog } from "./deployed-rtsp-job-view-dialog/DeployedRTSPJobsViewDialog";
import { DeploymentRTSPJobTerminateDialog } from "./deployed-rtsp-job-terminate-dialog/DeployedRTSPJobTerminateDialog";
import { DeployedRTSPJobsLabelSettingsDialog } from "./deployed-rstp-job-label-settings-dialog/DeployedRTSPJobsLabelSettingsDialog";
import { DeployedRTSPJobsCameraSettingsDialog } from "./deployed-rstp-job-camera-settings-dialog/DeployedRTSPJobsCameraSettingsDialog";

// Component for handling view dialog with route params
function DeployedRTSPJobsViewDialogWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deployedRTSPJobsPageBaseUrl = "/deployedDetails/deployedRTSPJobsPage";

  return (
    <DeployedRTSPJobsViewDialog
      show={true}
      id={id}
      onHide={() => {
        navigate(deployedRTSPJobsPageBaseUrl);
      }}
    />
  );
}

// Component for handling terminate dialog with route params
function DeploymentRTSPJobTerminateDialogWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deployedRTSPJobsPageBaseUrl = "/deployedDetails/deployedRTSPJobsPage";

  return (
    <DeploymentRTSPJobTerminateDialog
      show={true}
      id={id}
      onHide={() => {
        navigate(deployedRTSPJobsPageBaseUrl);
      }}
    />
  );
}

// Component for handling label settings dialog with route params
function DeployedRTSPJobsLabelSettingsDialogWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deployedRTSPJobsPageBaseUrl = "/deployedDetails/deployedRTSPJobsPage";

  return (
    <DeployedRTSPJobsLabelSettingsDialog
      show={true}
      id={id}
      onHide={() => {
        navigate(deployedRTSPJobsPageBaseUrl);
      }}
    />
  );
}

// Component for handling camera settings dialog with route params
function DeployedRTSPJobsCameraSettingsDialogWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deployedRTSPJobsPageBaseUrl = "/deployedDetails/deployedRTSPJobsPage";

  return (
    <DeployedRTSPJobsCameraSettingsDialog
      show={true}
      id={id}
      onHide={() => {
        navigate(deployedRTSPJobsPageBaseUrl);
      }}
    />
  );
}

export function DeployedRTSPJobsPage({ setKey }) {
  const deployedRTSPJobsPageBaseUrl = "/deployedDetails/deployedRTSPJobsPage";
  const navigate = useNavigate();

  useEffect(
    () => setKey("deployedRTSPJobs"),
    //eslint-disable-next-line
    []
  );

  const deployedRTSPJobsUIEvents = {
    openViewDeployedRTSPJobBtnClick: id => {
      navigate(`${deployedRTSPJobsPageBaseUrl}/${id}/view`);
    },
    openViewLabelSettingsBtnClick: id => {
      navigate(`${deployedRTSPJobsPageBaseUrl}/${id}/labelSettings`);
    },
    openViewCameraSettingsBtnClick: id => {
      navigate(`${deployedRTSPJobsPageBaseUrl}/${id}/cameraSettings`);
    },
    stopDeploymentRTSPJobBtnClick: id => {
      navigate(`${deployedRTSPJobsPageBaseUrl}/${id}/terminate`);
    }
  };

  return (
    <DeployedRTSPJobsUIProvider
      deployedRTSPJobsUIEvents={deployedRTSPJobsUIEvents}
    >
      <Routes>
        <Route path=":id/view" element={<DeployedRTSPJobsViewDialogWrapper />} />
        <Route path=":id/terminate" element={<DeploymentRTSPJobTerminateDialogWrapper />} />
        <Route path=":id/labelSettings" element={<DeployedRTSPJobsLabelSettingsDialogWrapper />} />
        <Route path=":id/cameraSettings" element={<DeployedRTSPJobsCameraSettingsDialogWrapper />} />
      </Routes>
      <DeployedRTSPJobsCard />
    </DeployedRTSPJobsUIProvider>
  );
}
