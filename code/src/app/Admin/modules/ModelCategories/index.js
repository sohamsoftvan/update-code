import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Model from "./components/model";
import { ADMIN_URL } from "../../../../enums/constant";
import Navigation from "./components/model-categories/Navigation";


export function ModelCategoryPage() {
  return (
    <Routes>
      <Route index element={<Navigation />} />
      <Route path="model/:id" element={<Model />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}
