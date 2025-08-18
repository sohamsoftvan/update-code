import {Route, Routes, useNavigate} from "react-router-dom";
import React, { useEffect } from "react";
import { DeploymentRTSPJobsUIProvider } from "./DeploymentRTSPJobsUIContext";
import { DeploymentRTSPJobsCard } from "./DeploymentRTSPJobsCard";
import { DeploymentRTSPJobNewDialog } from "./deployment-rtsp-job-new-dialog/DeploymentRTSPJobNewDialog";
import { DeploymentRTSPJobsViewDialog } from "./deployment-rtsp-job-view-dialog/DeploymentRTSPJobsViewDialog";
import { DeploymentRTSPJobStartDialog } from "./deployment-rtsp-job-start-dialog/DeploymentRTSPJobStartDialog";
import {
  DeploymentJobNewDialog
} from "../../DeploymentJobs/DeploymentJobTable/deployment-job-new-dialog/DeploymentJobNewDialog";
import {
  DeploymentJobsViewDialog
} from "../../DeploymentJobs/DeploymentJobTable/deployment-job-view-dialog/DeploymentJobsViewDialog";
import {
  DeploymentJobStartDialog
} from "../../DeploymentJobs/DeploymentJobTable/deployment-job-start-dialog/DeploymentJobStartDialog";

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
          <Route
              path="new"
              element={
                <DeploymentRTSPJobNewDialog
                    show={true}
                    onHide={() => {
                      navigate(deploymentRTSPJobsPageBaseUrl);
                    }}
                />
              }
          />
          <Route
              path=":id/view"
              element={
                <DeploymentRTSPJobsViewDialog
                    show={true}
                    onHide={() => {
                      navigate(deploymentRTSPJobsPageBaseUrl);
                    }}
                />
              }
          />
          <Route
              path=":id/deploy"
              element={
                <DeploymentRTSPJobStartDialog
                    show={true}
                    onHide={() => {
                      navigate(deploymentRTSPJobsPageBaseUrl);
                    }}
                />
              }
          />
        </Routes>
        <DeploymentRTSPJobsCard />
      </DeploymentRTSPJobsUIProvider>
  );
}
