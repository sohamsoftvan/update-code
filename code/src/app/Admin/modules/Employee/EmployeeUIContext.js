import React, { createContext, useCallback, useContext, useState } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "../../../../utils/UIHelpers";

const EmployeeUIContext = createContext();

export function useEmployeeUIContext() {
  return useContext(EmployeeUIContext);
}

export function EmployeeUIProvider({ children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParams
  };

  return (
    <EmployeeUIContext.Provider value={value}>
      {children}
    </EmployeeUIContext.Provider>
  );
}
