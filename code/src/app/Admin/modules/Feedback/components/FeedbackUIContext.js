import React, {createContext, useCallback, useContext, useState} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "../../../../../utils/UIHelpers";

const FeedbackUIContext = createContext();

export function useFeedbackUIContext() {
    return useContext(FeedbackUIContext);
}

export function FeedbackUIProvider({feedbackUIEvents, children}) {
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
        openNewFeedbackDialog: feedbackUIEvents.newFeedbackBtnClick,
        openEditFeedbackDialog: feedbackUIEvents.editFeedbackBtnClick
    };

    return <FeedbackUIContext.Provider value={value}>{children}</FeedbackUIContext.Provider>;
}
