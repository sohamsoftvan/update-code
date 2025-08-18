import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { DeployedJobsUIProvider } from "./DeployedJobsUIContext";
import { DeployedJobsCard } from "./DeployedJobsCard";
import { DeployedJobsViewDialog } from "./deployed-job-view-dialog/DeployedJobsViewDialog";
import { DeployedRTSPJobsViewDialog } from "./deployed-job-view-dialog/DeployedRTSPJobsViewDialog";
import { DeployedRTSPJobsCameraSettingsDialog } from "./deployed-rstp-job-camera-settings-dialog/DeployedRTSPJobsCameraSettingsDialog";
import { ADMIN_URL } from "../../../../../../../enums/constant";

export function DeployedJobsPage({ setKey }) {
  const navigate = useNavigate();
  const deployedJobsPageBaseUrl = ADMIN_URL + "/subscriptions/deployedJobsPage";

  useEffect(
    () => setKey("deployedJobs"),
    // eslint-disable-next-line
    []
  );

  const deployedJobsUIEvents = {
    openViewDeployedJobBtnClick: (id) => {
      navigate(`${deployedJobsPageBaseUrl}/${id}/view-deployed-job`);
    },
    openViewDeployedRTSPJobBtnClick: (id) => {
      navigate(`${deployedJobsPageBaseUrl}/${id}/view-deployed-rtsp-job`);
    },
    openViewCameraSettingsBtnClick: (id) => {
      navigate(`${deployedJobsPageBaseUrl}/${id}/cameraSettings`);
    },
  };

  const ViewDeployedJobRoute = () => {
    const { id } = useParams();
    const close = () => navigate(deployedJobsPageBaseUrl);
    return <DeployedJobsViewDialog show={true} id={id} onHide={close} />;
  };

  const ViewDeployedRTSPJobRoute = () => {
    const { id } = useParams();
    const close = () => navigate(deployedJobsPageBaseUrl);
    return <DeployedRTSPJobsViewDialog show={true} id={id} onHide={close} />;
  };

  const CameraSettingsRoute = () => {
    const { id } = useParams();
    const close = () => navigate(deployedJobsPageBaseUrl);
    return (
      <DeployedRTSPJobsCameraSettingsDialog show={true} id={id} onHide={close} />
    );
  };

  return (
    <DeployedJobsUIProvider deployedJobsUIEvents={deployedJobsUIEvents}>
      <Routes>
        <Route
          path={`${deployedJobsPageBaseUrl}/:id/view-deployed-job`}
          element={<ViewDeployedJobRoute />}
        />
        <Route
          path={`${deployedJobsPageBaseUrl}/:id/view-deployed-rtsp-job`}
          element={<ViewDeployedRTSPJobRoute />}
        />
        <Route
          path={`${deployedJobsPageBaseUrl}/:id/cameraSettings`}
          element={<CameraSettingsRoute />}
        />
      </Routes>
      <DeployedJobsCard />
    </DeployedJobsUIProvider>
  );
}
