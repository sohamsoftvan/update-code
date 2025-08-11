import React from "react";
import { ComplaintEditForm } from "./ComplaintEditForm";
import * as action from "../../_redux/ComplaintAction";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

export function ComplaintEditDialog({ id, show, onHide }) {
  const dispatch = useDispatch();

  const { actionsLoading } = useSelector(
    state => ({
      actionsLoading: state.complaint.actionsLoading
    }),
    shallowEqual
  );

  const saveComplaintDetails = complaint => {
    dispatch(action.createComplaint(complaint)).then(() => onHide());
  };

  return (
      <ComplaintEditForm
          saveComplaint={saveComplaintDetails}
          onHide={onHide}
          show={show}
          id={id}
          actionsLoading={actionsLoading}
        />
  );
}
