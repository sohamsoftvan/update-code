import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FrameworkDetailsEditForm } from "./FrameworkDetailsEditForm";
import * as action from "../../_redux/FrameworkDetailsAction";
import { FrameworkDetailsSlice } from "../../_redux/FrameworkDetailsSlice";
import { successToast } from "../../../../../../utils/ToastMessage";

const { actions } = FrameworkDetailsSlice;

export function FrameworkDetailsEditDialog({ id, show, onHide }) {
  const { actionsLoading, frameworkFetchedById } = useSelector(
    (state) => ({
      actionsLoading: state.frameworkDetails.actionsLoading,
      frameworkFetchedById: state.frameworkDetails.frameworkDetailsFetchedById,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== null && id !== undefined) {
      dispatch(action.fetchFrameworkDetailsById(id));
    } else {
      dispatch(actions.clearFrameworkDetailsById());
    }
  }, [id, dispatch]);

  const [loading, setLoading] = useState(false);
  const saveFrameWorkDetails = (framework) => {
    setLoading(true);
    if (!id) {
      // server request for creating framework details
      dispatch(action.createFrameworkDetails(framework)).then(() => onHide());
    } else {
      // server request for updating framework details
      dispatch(action.frameworkDetailsUpdate(framework)).then(() => {
        successToast("Framework details updated successfully");
        onHide();
      });
    }
  };

  return (
      <FrameworkDetailsEditForm
        saveFrameworkDetails={saveFrameWorkDetails}
        frameworkData={frameworkFetchedById}
        onHide={onHide}
        id={id}
        show={show}
        loading={loading}
      />
  );
}
