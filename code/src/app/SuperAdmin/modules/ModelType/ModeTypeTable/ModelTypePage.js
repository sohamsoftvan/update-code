import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { ModelTypeUIProvider } from "./ModelTypeUIContext";
import { ModelTypeCard } from "./ModelTypeCard";
import { ModelTypeEditDialog } from "./model-type-edit-dialog/ModelTypeEditDialog";
import { ModelTypeStatusDialog } from "./model-type-status-dialog/ModelTypeStatusDialog";

export function ModelTypePage() {
  const modelTypePageBaseUrl = "/modelType/modelTypePage";
  const navigate = useNavigate();

  const modelTypeUIEvents = {
    newModelTypeButtonClick: () => {
      navigate(`new`);
    },
    openChangeStatusDialog: (id, status) => {
      navigate(`${id}/${status}/changeStatus`);
    },
    openEditModelTypeDialog: (id) => {
      navigate(`${id}/edit`);
    },
  };

  return (
    <ModelTypeUIProvider modelTypeUIEvents={modelTypeUIEvents}>
      <Routes>
        <Route
          path="new"
          element={
            <ModelTypeEditDialog
              show={true}
              onHide={() => navigate(modelTypePageBaseUrl)}
            />
          }
        />
        <Route
          path=":id/edit"
          element={
            <ModelTypeEditDialog
              show={true}
              onHide={() => navigate(modelTypePageBaseUrl)}
            />
          }
        />
        <Route
          path=":id/:status/changeStatus"
          element={
            <ModelTypeStatusDialog
              show={true}
              onHide={() => navigate(modelTypePageBaseUrl)}
            />
          }
        />
      </Routes>
      <ModelTypeCard />
    </ModelTypeUIProvider>
  );
}
