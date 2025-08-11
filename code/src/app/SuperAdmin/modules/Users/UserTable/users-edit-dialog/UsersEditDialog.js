import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/UserAction";
import { UsersEditForm } from "./UsersEditForm";

export function UsersEditDialog({ id, show, onHide }) {
  const { actionsLoading } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // server request for saving user
  const saveUser = (user) => {
    setLoading(true);
    if (!id) {
      // server request for creating user
      dispatch(actions.createCompany(user)).then(() => {
        setLoading(false);
        onHide();
      });
    }
  };

  return (
      <UsersEditForm
        saveUser={saveUser}
        actionsLoading={actionsLoading}
        onHide={onHide}
        id={id}
        show={show}
        loading={loading}
      />
  );
}
