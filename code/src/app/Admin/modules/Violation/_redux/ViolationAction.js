import { callTypes, ViolationSlice } from "./ViolationSlice";
import { getViolationSetting, getViolationReportByDate } from "./ViolationAPI";
import { warningToast } from "../../../../../utils/ToastMessage";
import {
  getDayStartHourForViolation,
  getUtcDateWithTimeForViolation,
  getUtcTimeForViolation,
} from "../violationDateAndTimeConverter";

const { actions } = ViolationSlice;

export const fetchViolationSetting = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return getViolationSetting()
    .then((response) => {
      if (response && response.isSuccess) {
        dispatch(actions.violationSettingFetched(response.data));
        return response;
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find Violation Setting";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
      if (error.detail) {
        warningToast(error.detail);
      } else {
        warningToast("Something went Wrong");
      }
    });
};

export const fetchViolationReport =
  (currentDate, start_time, end_time, labels) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    let utc_time = getUtcTimeForViolation(start_time, end_time);
    let utc_date_time = getUtcDateWithTimeForViolation(
      start_time,
      end_time,
      currentDate
    );
    return getViolationReportByDate(
      utc_date_time[0],
      utc_date_time[1],
      parseInt(utc_time[0]),
      parseInt(utc_time[2]),
      parseInt(utc_time[1]),
      parseInt(utc_time[3]),
      getDayStartHourForViolation(),
      labels
    )
      .then((response) => {
        if (response && response.isSuccess) {
          return dispatch(actions.violationReportFetched(response.data));
        } else {
          // warningToast("something went wrong");
        }
      })
      .catch((error) => {
        error.clientMessage = "Can't find Violation Setting";
        dispatch(actions.catchError({ error, callType: callTypes.list }));
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      });
  };
export const setMyReports = (myResults) => (dispatch) => {
  dispatch(actions.setReportEntities(myResults));
};
