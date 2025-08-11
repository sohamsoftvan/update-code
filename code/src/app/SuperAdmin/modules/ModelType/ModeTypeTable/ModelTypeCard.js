import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ModelTypeTable } from "./model-type-table/ModelTypeTable";
import { useModelTypeUIContext } from "./ModelTypeUIContext";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";

export function ModelTypeCard() {
  const modelTypeUIContext = useModelTypeUIContext();
  const modelTypeUIProps = useMemo(() => {
    return {
      newModelTypeButtonClick: modelTypeUIContext.newModelTypeButtonClick,
    };
  }, [modelTypeUIContext]);

  return (
    <Card>
      <CardHeader title="Model Type Data">
        <CardHeaderToolbar>
          <CustomizedButtons title={"Add Model Type"} color={"primary"} submit={modelTypeUIProps.newModelTypeButtonClick}/>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ModelTypeTable />
      </CardBody>
    </Card>
  );
}
