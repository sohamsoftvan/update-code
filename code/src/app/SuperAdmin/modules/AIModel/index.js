import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import AIModelWizard from "../AIModelWizard/wizard";
import ViewAIModel from "./components/ViewAIModel";

export default function AIModel() {
    return (
        <Routes>
            {/* Redirect from aiModel root to add page */}
            <Route
                path="/aiModel"
                element={<Navigate to="/aiModel/add" replace />}
            />
            {/* Surfaces */}
            <Route path="/aiModel/add" element={<AIModelWizard />} />

            {/* Layout */}
            <Route path="/aiModel/view/*" element={<ViewAIModel />} />
        </Routes>
    );
}
