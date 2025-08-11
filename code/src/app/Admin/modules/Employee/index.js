import React from "react";
import { Employee } from "./Employee";
import { EmployeeUIProvider } from "./EmployeeUIContext";

export function EmployeeIndexPage() {
  return (
    <EmployeeUIProvider>
      <Employee />
    </EmployeeUIProvider>
  );
}
