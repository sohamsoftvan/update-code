import { createSlice } from "@reduxjs/toolkit";

const initialDeployedRTSPJobsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  reportEntities: [],
  filteredEntities: "",
  showTable: false,
  violationReportData: [],
  deployedRTSPjobs: [],
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const ViolationSlice = createSlice({
  name: "ViolationSetting",
  initialState: initialDeployedRTSPJobsState,
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

    violationSettingFetched: (state, action) => {
      const data = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = data;
      state.totalCount = action.payload.length;
    },

    violationReportFetched: (state, action) => {
      const data = action.payload;
      state.listLoading = false;
      state.error = null;
      state.violationReportData = data;
      state.totalCount = action.payload.length;
      state.showTable = true;
    },
    rtspjobsFetched: (state, action) => {
      const data = action.payload;
      state.listLoading = false;
      state.error = null;
      state.deployedRTSPjobs = data;
      state.totalCount = action.payload.length;
    },
    setReportEntities: (state, action) => {
      state.reportEntities = action.payload;
    },
  },
});
