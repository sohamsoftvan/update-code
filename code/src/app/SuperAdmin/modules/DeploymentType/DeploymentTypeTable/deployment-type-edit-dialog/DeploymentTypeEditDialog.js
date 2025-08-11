import React, { useEffect, useState } from "react";
import { DeploymentTypeEditForm } from "./DeploymentTypeEditForm";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as action from "../../_redux/DeploymentTypeAction";
import { DeploymentTypeSlice } from "../../_redux/DeploymentTypeSlice";
import { successToast } from "../../../../../../utils/ToastMessage";

const { actions } = DeploymentTypeSlice;

export function DeploymentTypeEditDialog({ id, show, onHide }) {
  const { actionsLoading, deploymentTypeFetchedById } = useSelector(
    state => ({
      actionsLoading: state.deploymentType.actionsLoading,
      deploymentTypeFetchedById: state.deploymentType.deploymentTypeFetchedById
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(action.fetchDeploymentTypeById(id));
    else dispatch(actions.clearDeploymentTypeById());
  }, [id, dispatch]);

  const [loading, setLoading] = useState(false);
  const saveDeploymentType = deploymentType => {
    setLoading(true);
    if (!id) {
      // server request for creating deploymentType
      dispatch(action.createDeploymentType(deploymentType)).then(() =>
        onHide()
      );
    } else {
      // server request for updating deploymentType
      dispatch(action.deploymentTypeUpdate(deploymentType)).then(() => {
        successToast("DeploymentType Updated Successfully");
        onHide();
      });
    }
  };

  return (
      <DeploymentTypeEditForm
        onHide={onHide}
        actionsLoading={actionsLoading}
        saveDeploymentType={saveDeploymentType}
        deploymentTypeData={deploymentTypeFetchedById}
        show={show}
        id={id}
        loading={loading}
      />
  );
}
