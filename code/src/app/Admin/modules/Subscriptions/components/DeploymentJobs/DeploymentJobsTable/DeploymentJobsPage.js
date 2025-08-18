import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { DeploymentJobsUIProvider } from "./DeploymentJobsUIContext";
import { DeploymentJobsCard } from "./DeploymentJobsCard";
import { DeploymentJobsViewDialog } from "./deployment-job-view-dialog/DeploymentJobsViewDialog";
import { DeploymentRTSPJobsViewDialog } from "./deployment-job-view-dialog/DeploymentRTSPJobsViewDialog";
import { ADMIN_URL } from "../../../../../../../enums/constant";
import { DeployedRTSPJobsCameraSettingsDialog } from "../../DeployedJobs/DeployedJobTable/deployed-rstp-job-camera-settings-dialog/DeployedRTSPJobsCameraSettingsDialog";

export function DeploymentJobsPage({ setKey }) {
  const navigate = useNavigate();
  const deploymentJobsPageBaseUrl =
    ADMIN_URL + "/subscriptions/deploymentJobsPage";

  useEffect(
    () => setKey("deploymentJobs"),
    // eslint-disable-next-line
    []
  );

  const deploymentJobsUIEvents = {
    openViewDeploymentJobBtnClick: (id) => {
      navigate(`${deploymentJobsPageBaseUrl}/${id}/view-deployment-job`);
    },
    openViewDeploymentRTSPJobBtnClick: (id) => {
      navigate(`${deploymentJobsPageBaseUrl}/${id}/view-deployment-rtsp-job`);
    },
    openViewCameraSettingsBtnClick: (id) => {
      navigate(`${deploymentJobsPageBaseUrl}/${id}/cameraSettings`);
    },
  };

  const ViewDeploymentJobRoute = () => {
    const params = useParams();
    const id = params?.id;
    const close = () => navigate(deploymentJobsPageBaseUrl);
    return (
      <DeploymentJobsViewDialog show={true} id={id} onHide={close} />
    );
  };

  const ViewDeploymentRTSPJobRoute = () => {
    const params = useParams();
    const id = params?.id;
    const close = () => navigate(deploymentJobsPageBaseUrl);
    return (
      <DeploymentRTSPJobsViewDialog show={true} id={id} onHide={close} />
    );
  };

  const CameraSettingsRoute = () => {
    const params = useParams();
    const id = params?.id;
    const close = () => navigate(deploymentJobsPageBaseUrl);
    return (
      <DeployedRTSPJobsCameraSettingsDialog show={true} id={id} onHide={close} />
    );
  };

  return (
    <DeploymentJobsUIProvider deploymentJobsUIEvents={deploymentJobsUIEvents}>
      <Routes>
        <Route path={`${deploymentJobsPageBaseUrl}/:id/view-deployment-job`} element={<ViewDeploymentJobRoute />} />
        <Route path={`${deploymentJobsPageBaseUrl}/:id/view-deployment-rtsp-job`} element={<ViewDeploymentRTSPJobRoute />} />
        <Route path={`${deploymentJobsPageBaseUrl}/:id/cameraSettings`} element={<CameraSettingsRoute />} />
      </Routes>
      <DeploymentJobsCard />
    </DeploymentJobsUIProvider>
  );
}
