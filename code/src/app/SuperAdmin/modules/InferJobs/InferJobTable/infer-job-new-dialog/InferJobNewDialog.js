import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InferJobNewForm } from "./InferJobNewForm";
import * as action from "../../_redux/InferJobsAction";

export function InferJobNewDialog({ show, onHide }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const saveInferJob = (deploymentType) => {
    setLoading(true);
    // server request for creating deploymentType
    dispatch(action.createInferJobs(deploymentType)).then(() => onHide());
  };

  return (
      <InferJobNewForm saveInferJob={saveInferJob} onHide={onHide} show={show} loading={loading} />
  );
}
