import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import React from "react";
import { DeviceUIProvider } from "./DeviceUIContext";
import { DeviceCard } from "./DeviceCard";
import { DeviceEditDialog } from "./device-edit-dialog/DeviceEditDialog";
import { DeviceStatusDialog } from "./device-status-dialog/DeviceStatusDialog";

function DeviceNewDialogWrapper() {
  const navigate = useNavigate();
  const devicePageBaseUrl = "/device/devicePage";
  return (
    <DeviceEditDialog
      show={true}
      onHide={() => {
        navigate(devicePageBaseUrl);
      }}
    />
  );
}

function DeviceEditDialogWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const devicePageBaseUrl = "/device/devicePage";
  return (
    <DeviceEditDialog
      show={true}
      id={id}
      onHide={() => {
        navigate(devicePageBaseUrl);
      }}
    />
  );
}

function DeviceStatusDialogWrapper() {
  const { id, status } = useParams();
  const navigate = useNavigate();
  const devicePageBaseUrl = "/device/devicePage";
  return (
    <DeviceStatusDialog
      show={true}
      id={id}
      status={status}
      onHide={() => {
        navigate(devicePageBaseUrl);
      }}
    />
  );
}

export function DevicePage() {
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
        <Route path={`new`} element={<DeviceNewDialogWrapper />} />
        <Route path={`:id/edit`} element={<DeviceEditDialogWrapper />} />
        <Route path={`:id/:status/changeStatus`} element={<DeviceStatusDialogWrapper />} />
      </Routes>
      <DeviceCard />
    </DeviceUIProvider>
  );
}
