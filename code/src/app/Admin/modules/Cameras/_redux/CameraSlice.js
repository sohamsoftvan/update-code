import {createSlice} from "@reduxjs/toolkit";

const initialDeployedRTSPJobsState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: [],
    filteredEntities: '',
    deployedRTSPJobsFetchedById: "",
    showTable : false

};

export const callTypes = {
    list: "list",
    action: "action"
};

export const CameraSlice = createSlice({
    name: "deployedRTSPJobsASU",
    initialState: initialDeployedRTSPJobsState,
    reducers: {

        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
                state.entities = [];
            } else {
                state.actionsLoading = false;
                state.entities = [];
            }
        },

        startCall: (state, action) => {
            state.error = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
                state.entities = [];
            } else {
                state.actionsLoading = true;
                state.entities = [];
            }
        },

        deployedRTSPJobsFetched: (state, action) => {
            const data = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = data;
            state.totalCount = action.payload.length;
            state.showTable = true
        },


    }
});
