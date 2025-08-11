import React, {createContext, useCallback, useContext, useState} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "../../../../../../../utils/UIHelpers";

const MyResultUIContext = createContext();

export function useMyResultUIContext() {
    return useContext(MyResultUIContext);
}

export const initialFilters = {
    sortOrder: "asc", // asc||desc
    sortField: "id",
    pageNumber: 1,
    pageSize: 25,
};
export function MyResultUIProvider({myResultUIEvents, children}) {
    const [queryParams, setQueryParamsBase] = useState(initialFilters);
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
        openViewMyResultDialog: myResultUIEvents.openViewMyResultBtnClick,
    };

    return <MyResultUIContext.Provider value={value}>{children}</MyResultUIContext.Provider>;
}
