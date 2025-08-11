import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DeploymentJobNewForm } from "./DeploymentJobNewForm";
import * as action from "../../../../_redux/DeploymentJobs/DeploymentJobsAction";

export function DeploymentJobNewDialog({ show, onHide }) {
  const { actionsLoading } = useSelector(
    state => ({
      actionsLoading: state.deploymentJobs.actionsLoading
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const saveDeploymentJob = deploymentType => {
    // server request for creating deploymentType
    setLoading(true);
    dispatch(action.createDeploymentJobs(deploymentType)).then(() => onHide());
  };

  return (
      <DeploymentJobNewForm
        saveDeploymentJob={saveDeploymentJob}
        actionsLoading={actionsLoading}
        onHide={onHide}
        show={show}
        loading={loading}
      />
  );
}
