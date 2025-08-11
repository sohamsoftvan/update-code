import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DeploymentRTSPJobNewForm } from "./DeploymentRTSPJobNewForm";
import * as action from "../../../../_redux/DeploymentRTSPJobs/DeploymentRTSPJobsAction";

export function DeploymentRTSPJobNewDialog({ show, onHide }) {
  const { actionsLoading } = useSelector(
    state => ({
      actionsLoading: state.deploymentRTSPJobs.actionsLoading
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const saveDeploymentRTSPJob = deploymentType => {
    // server request for creating deploymentType
    setLoading(true);
    dispatch(action.createDeploymentRTSPJobs(deploymentType)).then(() =>
      onHide()
    );
  };

  return (
      <DeploymentRTSPJobNewForm
        saveDeploymentRTSPJob={saveDeploymentRTSPJob}
        actionsLoading={actionsLoading}
        onHide={onHide}
        show={show}
        loading={loading}
      />
  );
}
