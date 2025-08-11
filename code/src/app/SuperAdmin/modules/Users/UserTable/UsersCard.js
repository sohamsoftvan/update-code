import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { UsersTable } from "./users-table/UsersTable";
import { useUsersUIContext } from "./UsersUIContext";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";

export function UsersCard() {
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      newUserButtonClick: usersUIContext.newUserButtonClick,
    };
  }, [usersUIContext]);

  return (
    <Card>
      <CardHeader title="Users Data">
        <CardHeaderToolbar>
          <CustomizedButtons title={"Add User"} color={"primary"} submit={usersUIProps.newUserButtonClick}/>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UsersTable />
      </CardBody>
    </Card>
  );
}
