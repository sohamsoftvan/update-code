import {createSlice} from "@reduxjs/toolkit";

const initialComplaintState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: [],
    filteredEntities: '',
    complaintFetchedById: '',
    tableData: false
};

export const callTypes = {
    list: "list",
    action: "action"
};

export const ComplaintSlice = createSlice({
    name: "complaint",
    initialState: initialComplaintState,
    reducers: {

        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } else {
                state.actionsLoading = false;
            }
        },

        startCall: (state, action) => {
            state.error = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
            } else {
                state.actionsLoading = true;
            }
        },

        complaintFetched: (state, action) => {
            state.listLoading = false;
            state.error = null;
            state.entities = action.payload;
            state.totalCount = action.payload.length;
            state.tableData = true;
        },

        addNewComplaint : (state,action) =>{
            state.actionsLoading = false;
            state.entities.push(action.payload);
            state.error = null;
        },

        complaintFetchedById: (state, action) => {
            state.actionsLoading = false;
            state.listLoading = false;
            state.error = null;
            state.tableData = true;
            const id = action.payload * 1;
            for(let i = 0 ; i < state.entities.length; i++){
                if(id === state.entities[i].id){
                    state.complaintFetchedById = state.entities[i];
                    break;
                }
            }
        },

        clearComplaintById: (state, action) => {
            state.actionsLoading = false;
            state.listLoading = false;
            state.error=null;
            state.complaintFetchedById = null;
        }
    }
});
