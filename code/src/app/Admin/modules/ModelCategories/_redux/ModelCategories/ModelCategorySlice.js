import { createSlice } from "@reduxjs/toolkit";

const initialModelCategoriesState = {
  listLoading: false,
  totalCount: 0,
  entities: [],
  filteredEntities: "",
  modelCategoryFetchedById: "",
  modelID: "",
  cameradata: "",
  privateEntities: []
};

export const callTypes = {
  list: "list",
  action: "action"
};

export const ModelCategoriesSlice = createSlice({
  name: "modelCategory",
  initialState: initialModelCategoriesState,
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

    modelCategoryFetched: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.entities = action.payload;
      state.totalCount = action.payload.length;
    },
    privateModelCategoryFetched: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.privateEntities = action.payload;
      state.totalCount = action.payload.length;
    },

    modelCategoryFetchedById: (state, action) => {
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
      state.modelCategoryFetchedById = action.payload;
    }
  }
});
