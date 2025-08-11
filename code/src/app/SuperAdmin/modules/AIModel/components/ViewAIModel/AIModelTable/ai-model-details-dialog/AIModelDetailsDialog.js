import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useAIModelUIContext } from "../ViewAIModelUIContext";
import { AIModelDetailsForm } from "./AIModelDetailsForm";
import * as actions from "../../../../_redux/AiModelAction";
import CommonModal from "../../../../../../../../utils/SuperAdmin/CommonModal";

export function AIModelDetailsDialog({ id, show, onHide }) {
  const aiModelUIContext = useAIModelUIContext();

  // Customers Redux state
  const dispatch = useDispatch();
  const {
    actionsLoading,
    aiModelViewDetails,
    deviceViewDetails,
    modelTypeViewDetails,
    frameworkViewDetails,
  } = useSelector(
    (state) => ({
      actionsLoading: state.aiModel.actionsLoading,
      aiModelViewDetails: state.aiModel.aiModelViewDetails,
      deviceViewDetails: state.aiModel.deviceViewDetails,
      modelTypeViewDetails: state.aiModel.modelTypeViewDetails,
      frameworkViewDetails: state.aiModel.frameworkViewDetails,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (id != null) {
      dispatch(actions.fetchAIModelViewDetails(id));
    }
  }, [id, dispatch]);

  return (
      <CommonModal
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={"User Details"}
          closeButtonFlag={true}
          applyButton={false}
          content={
            <>
                <AIModelDetailsForm
                    actionsLoading={actionsLoading}
                    aiModelViewDetails={aiModelViewDetails || aiModelUIContext.initUser}
                    frameworkViewDetails={frameworkViewDetails}
                    deviceViewDetails={deviceViewDetails}
                    modelTypeViewDetails={modelTypeViewDetails}
                    onHide={onHide}
                />

            </>
          }
      />
  );
}
