import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { FrameworkUIProvider } from "./FrameworkDetailsUIContext";
import { FrameworkDetailsCard } from "./FrameworkDetailsCard";
import { FrameworkDetailsEditDialog } from "./framework-details-edit-dialog/FrameworkDetailsEditDialog";
import { FrameworkDetailsStatusDialog } from "./framework-status-dialog/FrameworkDetailsStatusDialog";

export function FrameworkDetailsPage() {
  const frameworkPageBaseUrl = "/frameworkDetails/frameworkDetailsPage";
  const navigate = useNavigate();

  const frameworkDetailsUIEvents = {
    newFrameworkBtnClick: () => {
      navigate(`new`);
    },
    changeStatusFrameworkBtnClick: (id, status, isDeprecatedStatus) => {
      navigate(`${id}/${status}/${isDeprecatedStatus}/changeStatus`);
    },
    editFrameworkBtnClick: (id) => {
      navigate(`${id}/edit`);
    },
  };

  return (
    <FrameworkUIProvider frameworkDetailsUIEvents={frameworkDetailsUIEvents}>
      <Routes>
        <Route
          path="new"
          element={
            <FrameworkDetailsEditDialog
              show={true}
              onHide={() => navigate(frameworkPageBaseUrl)}
            />
          }
        />
        <Route
          path=":id/edit"
          element={
            <FrameworkDetailsEditDialog
              show={true}
              onHide={() => navigate(frameworkPageBaseUrl)}
            />
          }
        />
        <Route
          path=":id/:status/:isDeprecatedStatus/changeStatus"
          element={
            <FrameworkDetailsStatusDialog
              show={true}
              onHide={() => navigate(frameworkPageBaseUrl)}
            />
          }
        />
      </Routes>
      <FrameworkDetailsCard />
    </FrameworkUIProvider>
  );
}
