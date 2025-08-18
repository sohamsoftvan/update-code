import {Route, Routes, useNavigate} from "react-router-dom";
import React, { useEffect } from "react";
import { DeploymentJobsUIProvider } from "./DeploymentJobsUIContext";
import { DeploymentJobsCard } from "./DeploymentJobsCard";
import { DeploymentJobNewDialog } from "./deployment-job-new-dialog/DeploymentJobNewDialog";
import { DeploymentJobsViewDialog } from "./deployment-job-view-dialog/DeploymentJobsViewDialog";
import { DeploymentJobStartDialog } from "./deployment-job-start-dialog/DeploymentJobStartDialog";
import {InferJobNewDialog} from "../../../../InferJobs/InferJobTable/infer-job-new-dialog/InferJobNewDialog";
import {InferJobsViewDialog} from "../../../../InferJobs/InferJobTable/infer-job-view-dialog/InferJobsViewDialog";

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
          <Route
              path="new"
              element={
                <DeploymentJobNewDialog
                    show={true}
                    onHide={() => {
                      navigate(deploymentJobsPageBaseUrl);
                    }}
                />
              }
          />
          <Route
              path=":id/view"
              element={
                <DeploymentJobsViewDialog
                    show={true}
                    onHide={() => {
                      navigate(deploymentJobsPageBaseUrl);
                    }}
                />
              }
          />
          <Route
              path=":id/deploy"
              element={
                <DeploymentJobStartDialog
                    show={true}
                    onHide={() => {
                      navigate(deploymentJobsPageBaseUrl);
                    }}
                />
              }
          />
        </Routes>
        <DeploymentJobsCard />
      </DeploymentJobsUIProvider>
  );
}
