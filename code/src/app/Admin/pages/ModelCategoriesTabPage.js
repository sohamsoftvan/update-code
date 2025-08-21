import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LayoutSplashScreen } from "../../../_metronic/layout";
import "react-multi-carousel/lib/styles.css";
import { ModelCategoryPage } from "../modules/ModelCategories";
import { ADMIN_URL } from "../../../enums/constant";

export default function ModelCategoriesTabPage() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Routes>
                <Route
                    path=""
                    element={<Navigate to="view" replace />}
                />
                <Route
                    path="view/*"
                    element={<ModelCategoryPage />}
                />
            </Routes>
        </Suspense>
    );
}