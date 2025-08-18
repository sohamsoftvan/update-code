import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../_metronic/_partials/controls";
import { DeviceTable } from "./device-table/DeviceTable";
import { useDeviceUIContext } from "./DeviceUIContext";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";

export function DeviceCard() {
  const deviceUIContext = useDeviceUIContext();
  const deviceUIProps = useMemo(() => {
    return {
      openNewDeviceDialog: deviceUIContext.openNewDeviceDialog
    };
  }, [deviceUIContext]);

  console.log("page open ")
  return (
    <Card>
      <CardHeader title="Device Data">
        <CardHeaderToolbar>
          <CustomizedButtons title={"Add Device"} color={"primary"} submit={deviceUIProps.openNewDeviceDialog}/>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DeviceTable />
      </CardBody>
    </Card>
  );
}
