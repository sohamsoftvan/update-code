import React, { createContext, useCallback, useContext, useState } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "../../../../../utils/UIHelpers";

const ViolationNotificationUIContext = createContext();

export function useViolationNotificationUIContext() {
  return useContext(ViolationNotificationUIContext);
}

export function ViolationNotificationUIProvider({ violationNotificationUIEvents, children }) {
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
    setQueryParams,

    openEditViolationNotificationDialog: violationNotificationUIEvents.editViolationNotificationBtnClick,

  };

  return (
    <ViolationNotificationUIContext.Provider value={value}>
      {children}
    </ViolationNotificationUIContext.Provider>
  );
}
// openNewViolationNotificationDialog: violationNotificationUIEvents.newViolationNotificationBtnClick,
// openChangeStatusLocationDialog:
// violationNotificationUIEvents.changeStatusLocationBtnClick