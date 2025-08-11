import { Route } from "react-router-dom";
import React, { useEffect } from "react";
import { DeploymentJobsUIProvider } from "./DeploymentJobsUIContext";
import { DeploymentJobsCard } from "./DeploymentJobsCard";
import { DeploymentJobsViewDialog } from "./deployment-job-view-dialog/DeploymentJobsViewDialog";
import { DeploymentRTSPJobsViewDialog } from "./deployment-job-view-dialog/DeploymentRTSPJobsViewDialog";
import { useHistory } from "react-router-dom";
import { ADMIN_URL } from "../../../../../../../enums/constant";
import { DeployedRTSPJobsCameraSettingsDialog } from "../../DeployedJobs/DeployedJobTable/deployed-rstp-job-camera-settings-dialog/DeployedRTSPJobsCameraSettingsDialog";

export function DeploymentJobsPage({ setKey }) {
  const history = useHistory();
  const deploymentJobsPageBaseUrl =
    ADMIN_URL + "/subscriptions/deploymentJobsPage";

  useEffect(
    () => setKey("deploymentJobs"),
    // eslint-disable-next-line
    []
  );

  const deploymentJobsUIEvents = {
    openViewDeploymentJobBtnClick: (id) => {
      history.push(`${deploymentJobsPageBaseUrl}/${id}/view-deployment-job`);
    },
    openViewDeploymentRTSPJobBtnClick: (id) => {
      history.push(
        `${deploymentJobsPageBaseUrl}/${id}/view-deployment-rtsp-job`
      );
    },
    openViewCameraSettingsBtnClick: (id) => {
      history.push(`${deploymentJobsPageBaseUrl}/${id}/cameraSettings`);
    },
  };

  return (
    <DeploymentJobsUIProvider deploymentJobsUIEvents={deploymentJobsUIEvents}>
      <Route path={`${deploymentJobsPageBaseUrl}/:id/view-deployment-job`}>
        {({ history, match }) => (
          <DeploymentJobsViewDialog
            show={match != null}
            id={match?.params?.id}
            onHide={() => {
              history.push(deploymentJobsPageBaseUrl);
            }}
          />
        )}
      </Route>
      <Route path={`${deploymentJobsPageBaseUrl}/:id/view-deployment-rtsp-job`}>
        {({ history, match }) => (
          <DeploymentRTSPJobsViewDialog
            show={match != null}
            id={match?.params?.id}
            onHide={() => {
              history.push(deploymentJobsPageBaseUrl);
            }}
          />
        )}
      </Route>
      <Route path={`${deploymentJobsPageBaseUrl}/:id/cameraSettings`}>
        {({ history, match }) => (
          <DeployedRTSPJobsCameraSettingsDialog
            show={match != null}
            id={match?.params?.id}
            onHide={() => {
              history.push(deploymentJobsPageBaseUrl);
            }}
          />
        )}
      </Route>
      <DeploymentJobsCard />
    </DeploymentJobsUIProvider>
  );
}
