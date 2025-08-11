import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AIModelEditForm } from "./AIModelEditForm";
import * as actions from "../../../../_redux/AiModelAction";
import { successToast } from "../../../../../../../../utils/ToastMessage";

export function AIModelEditDialog({ id, show, onHide }) {
  const {
    actionsLoading,
    aiModelDataById,
    deviceDetails,
    modelTypeDetails,
    frameworkDetails
  } = useSelector(
    state => ({
      actionsLoading: state.aiModel.actionsLoading,
      aiModelDataById: state.aiModel.aiModelDataById,
      deviceDetails: state.aiModel.deviceDetails,
      modelTypeDetails: state.aiModel.modelTypeDetails,
      frameworkDetails: state.aiModel.frameworkDetails
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) dispatch(actions.fetchAIModelById(id));
  }, [id, dispatch]);

  const updateAIModel = aiModel => {
    if (id)
      dispatch(actions.updateAIModelData(aiModel)).then(() => {
        successToast("AI Model Updated Successfully");
        onHide();
      });
  };

  return (
      <AIModelEditForm
        updateAIModel={updateAIModel}
        actionsLoading={actionsLoading}
        aiModelDataById={aiModelDataById}
        deviceDetails={deviceDetails}
        modelTypeDetails={modelTypeDetails}
        frameworkDetails={frameworkDetails}
        onHide={onHide}
        show={show}
        id={id}
      />
  );
}
