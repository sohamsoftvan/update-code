import React, {createContext, useCallback, useContext, useState} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "../../../../../utils/UIHelpers";

const ComplaintUIContext = createContext();

export function useComplaintUIContext() {
    return useContext(ComplaintUIContext);
}

export function ComplaintUIProvider({complaintUIEvents, children}) {
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
        openNewComplaintDialog: complaintUIEvents.newComplaintBtnClick,
        openViewComplaintImage: complaintUIEvents.viewComplaintImgBtnClick
    };

    return <ComplaintUIContext.Provider value={value}>{children}</ComplaintUIContext.Provider>;
}
