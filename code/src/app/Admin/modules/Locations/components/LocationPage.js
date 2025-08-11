import React from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { LocationUIProvider } from "./LocationUIContext";
import { LocationCard } from "./LocationCard";
import { LocationEditDialog } from "./location-details-edit-dialog/LocationEditDialog";
import { ADMIN_URL } from "../../../../../enums/constant";

export function LocationPage() {
    const navigate = useNavigate();
    const locationPageBaseUrl = ADMIN_URL + "/locations";
    const { id } = useParams();
    const locationUIEvents = {
        newLocationBtnClick: () => {
            navigate(`${locationPageBaseUrl}/new`);
        },
        editLocationBtnClick: (ids) => {
            navigate(`${locationPageBaseUrl}/${ids}/edit`);
        },
    };

    return (
        <LocationUIProvider locationUIEvents={locationUIEvents}>
            <Routes>
                {/* New location */}
                <Route
                    path="new"
                    element={
                        <LocationEditDialog
                            show={true}
                            onHide={() => navigate(locationPageBaseUrl)}
                        />
                    }
                />

                {/* Edit location */}
                <Route
                    path=":id/edit"
                    element={<LocationEditDialog
                        show={true}
                        id={id}
                        onHide={() => navigate(locationPageBaseUrl)}
                    />}
                />
            </Routes>

            {/* Always show card */}
            <LocationCard />
        </LocationUIProvider>
    );
}