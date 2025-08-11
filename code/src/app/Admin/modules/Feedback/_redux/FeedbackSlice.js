import {createSlice} from "@reduxjs/toolkit";

const initialFeedbackState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: [],
    filteredEntities: '',
    feedbackFetchedById: '',
    tableData: false
};

export const callTypes = {
    list: "list",
    action: "action"
};

export const FeedbackSlice = createSlice({
    name: "feedback",
    initialState: initialFeedbackState,
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

        feedbackFetched: (state, action) => {
            state.listLoading = false;
            state.error = null;
            state.entities = action.payload;
            state.totalCount = action.payload.length;
            state.tableData = true;
        },

        addNewFeedback : (state,action) =>{
            state.actionsLoading = false;
            state.entities.push(action.payload);
            state.error = null;
        },

        feedbackFetchedById: (state, action) => {
            state.actionsLoading = false;
            state.listLoading = false;
            state.error = null;
            state.tableData = true;
            const id = action.payload * 1;
            for(let i = 0 ; i < state.entities.length; i++){
                if(id === state.entities[i].id){
                    state.feedbackFetchedById = state.entities[i];
                    break;
                }
            }
        },

        updateExistingFeedback: (state, action) => {
            state.actionsLoading = false;
            state.listLoading = false;
            state.error = null;
            const id = action.payload.id * 1;
            for(let i = 0 ; i < state.entities.length; i++){
                if(id === state.entities[i].id){
                    state.entities[i] = action.payload;
                    break;
                }
            }
        },

        clearFeedbackById: (state, action) => {
            state.actionsLoading = false;
            state.listLoading = false;
            state.error=null;
            state.feedbackFetchedById = null;
        }
    }
});
