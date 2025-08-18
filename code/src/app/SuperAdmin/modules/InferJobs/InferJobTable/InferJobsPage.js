import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { InferJobsUIProvider } from "./InferJobsUIContext";
import { InferJobsCard } from "./InferJobsCard";
import { InferJobNewDialog } from "./infer-job-new-dialog/InferJobNewDialog";
import { InferJobsViewDialog } from "./infer-job-view-dialog/InferJobsViewDialog";

export function InferJobsPage() {
  const inferJobsPageBaseUrl = "/inferJobs/inferJobsPage";
  const navigate = useNavigate();

  const inferJobsUIEvents = {
    newInferJobBtnClick: () => {
      navigate(`new`);
    },
    openViewInferJobBtnClick: (id) => {
      navigate(`${id}/view`);
    },
  };

  return (
    <InferJobsUIProvider inferJobsUIEvents={inferJobsUIEvents}>
      <Routes>
        <Route
          path="new"
          element={
            <InferJobNewDialog
              show={true}
              onHide={() => {
                navigate(inferJobsPageBaseUrl);
              }}
            />
          }
        />
        <Route
          path=":id/view"
          element={
            <InferJobsViewDialog
              show={true}
              onHide={() => {
                navigate(inferJobsPageBaseUrl);
              }}
            />
          }
        />
      </Routes>
      <InferJobsCard />
    </InferJobsUIProvider>
  );
}
