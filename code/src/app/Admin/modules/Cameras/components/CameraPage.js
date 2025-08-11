import React from "react";
import { CameraUIProvider } from "./CameraUIContext";
import LiveCamera from "./LiveCamera";

export function CameraPage() {
  return (
    <CameraUIProvider>
      <LiveCamera />
    </CameraUIProvider>
  );
}
