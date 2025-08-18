import {Route, Routes, useNavigate} from "react-router-dom";
import React from "react";
import { DeviceUIProvider } from "./DeviceUIContext";
import { DeviceCard } from "./DeviceCard";
import { DeviceEditDialog } from "./device-edit-dialog/DeviceEditDialog";
import { DeviceStatusDialog } from "./device-status-dialog/DeviceStatusDialog";
import {
    LocationEditDialog
} from "../../../../Admin/modules/Locations/components/location-details-edit-dialog/LocationEditDialog";
import {LocationCard} from "../../../../Admin/modules/Locations/components/LocationCard";

export function DevicePage({ history }) {
    const devicePageBaseUrl = "/device/devicePage";

    const navigate = useNavigate();
    const deviceUIEvents = {
        newDeviceButtonClick: () => {
            navigate(`${devicePageBaseUrl}/new`);
        },
        editDeviceButtonClick: id => {
            navigate(`${devicePageBaseUrl}/${id}/edit`);
        },
        changeDeviceStatusButtonClick: (id, status) => {
            navigate(`${devicePageBaseUrl}/${id}/${status}/changeStatus`);
        }
    };

    return (
        <DeviceUIProvider deviceUIEvents={deviceUIEvents}>

            <Routes>
                {/* New location */}
                <Route
                    path="new"
                    element={
                        <DeviceEditDialog
                            show={true}
                            onHide={() => {
                                navigate(devicePageBaseUrl);
                            }}
                        />
                    }
                />

                {/* Edit location */}
                <Route
                    path=":id/edit"
                    element={<DeviceEditDialog
                        show={true}
                        onHide={() => navigate(devicePageBaseUrl)}
                    />}
                />
                <Route
                    path=":id/:status/changeStatus"
                    element={<DeviceStatusDialog
                        show={true}
                        onHide={() => navigate(devicePageBaseUrl)}
                    />}
                />
            </Routes>
            <DeviceCard />
        </DeviceUIProvider>
    );
}
