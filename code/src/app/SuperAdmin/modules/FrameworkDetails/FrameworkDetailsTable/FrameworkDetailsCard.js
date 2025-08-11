import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { FrameworkDetailsTable } from "./framework-details-table/FrameworkDetailsTable";
import { useFrameworkUIContext } from "./FrameworkDetailsUIContext";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";

export function FrameworkDetailsCard() {
  const frameworkUIContext = useFrameworkUIContext();
  const frameworkUIProps = useMemo(() => {
    return {
      newFrameworkButtonClick: frameworkUIContext.openNewFrameworkDialog,
    };
  }, [frameworkUIContext]);

  return (
    <Card>
      <CardHeader title="Framework Details Data">
        <CardHeaderToolbar>
          <CustomizedButtons title={"Add Framework Details"} color={"primary"} submit={frameworkUIProps.newFrameworkButtonClick}/>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <FrameworkDetailsTable />
      </CardBody>
    </Card>
  );
}
