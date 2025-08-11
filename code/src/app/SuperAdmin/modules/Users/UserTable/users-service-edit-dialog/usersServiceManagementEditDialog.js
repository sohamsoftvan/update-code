import React from "react";
import { UsersServiceManagementEditForm } from "./usersServiceManagementEditForm";

export function UsersServiceManagementEditDialog({ show, onHide }) {
  return (

      <UsersServiceManagementEditForm onHide={onHide}  show={show}/>
  );
}
