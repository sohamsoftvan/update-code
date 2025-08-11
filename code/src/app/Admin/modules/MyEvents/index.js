import React from "react";
import { useSubheader } from "../../../../_metronic/layout";
import DeployedRTSPEvents from "./components/DeployedRTSPEvents";

export function MyEvents() {
  const subheader = useSubheader();
  subheader.setTitle("My Event");

  return <DeployedRTSPEvents />;
}
