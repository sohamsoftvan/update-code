import { Route } from "react-router-dom";
import React, { useEffect } from "react";
import { DeployedJobsUIProvider } from "./DeployedJobsUIContext";
import { DeployedJobsCard } from "./DeployedJobsCard";
import { DeployedJobsViewDialog } from "./deployed-job-view-dialog/DeployedJobsViewDialog";
import { useHistory } from "react-router-dom";
import { DeployedRTSPJobsViewDialog } from "./deployed-job-view-dialog/DeployedRTSPJobsViewDialog";
import { DeployedRTSPJobsCameraSettingsDialog } from "./deployed-rstp-job-camera-settings-dialog/DeployedRTSPJobsCameraSettingsDialog";
import { ADMIN_URL } from "../../../../../../../enums/constant";

export function DeployedJobsPage({ setKey }) {
  const history = useHistory();
  const deployedJobsPageBaseUrl = ADMIN_URL + "/subscriptions/deployedJobsPage";

  useEffect(
    () => setKey("deployedJobs"),
    // eslint-disable-next-line
    []
  );

  const deployedJobsUIEvents = {
    openViewDeployedJobBtnClick: (id) => {
      history.push(`${deployedJobsPageBaseUrl}/${id}/view-deployed-job`);
    },
    openViewDeployedRTSPJobBtnClick: (id) => {
      history.push(`${deployedJobsPageBaseUrl}/${id}/view-deployed-rtsp-job`);
    },
    openViewCameraSettingsBtnClick: (id) => {
      history.push(`${deployedJobsPageBaseUrl}/${id}/cameraSettings`);
    },
  };

  return (
    <DeployedJobsUIProvider deployedJobsUIEvents={deployedJobsUIEvents}>
      <Route path={`${deployedJobsPageBaseUrl}/:id/view-deployed-job`}>
        {({ history, match }) => (
          <DeployedJobsViewDialog
            show={match != null}
            id={match?.params?.id}
            onHide={() => {
              history.push(deployedJobsPageBaseUrl);
            }}
          />
        )}
      </Route>
      <Route path={`${deployedJobsPageBaseUrl}/:id/view-deployed-rtsp-job`}>
        {({ history, match }) => (
          <DeployedRTSPJobsViewDialog
            show={match != null}
            id={match?.params?.id}
            onHide={() => {
              history.push(deployedJobsPageBaseUrl);
            }}
          />
        )}
      </Route>
      <Route path={`${deployedJobsPageBaseUrl}/:id/cameraSettings`}>
        {({ history, match }) => (
          <DeployedRTSPJobsCameraSettingsDialog
            show={match != null}
            id={match?.params?.id}
            onHide={() => {
              history.push(deployedJobsPageBaseUrl);
            }}
          />
        )}
      </Route>
      <DeployedJobsCard />
    </DeployedJobsUIProvider>
  );
}
