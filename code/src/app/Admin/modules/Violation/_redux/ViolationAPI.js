import { request } from "../../../../../utils/APIRequestService";
import { HttpRequest } from "../../../../../enums/http.methods";
import { ADMIN_ROLE } from "../../../../../enums/constant";

const GET_VIOLATION_SETTING_BY_COMPANY_ID =
  "/get_violation_setting_by_company_id";
const GET_VIOLATION_REPORT_BY_DATE = "/get_violation_report_by_date";
const GET_DEPLOYMENT_JOB_FOR_CURRENT_USER =
  "/get_rtsp_deployed_jobs_for_current_user";
const GET_REPORT_METADATA = "/get_report_metadata";
const GET_VIOLATION_REPORT_BY_AGGREGATE_TIME =
  "/get_violation_by_aggregate_time";
const GET_ALL_DEPLOYED_RTSP_JOBS = "/get_rtsp_deployed_jobs_for_current_user";
const GET_VIOLATION_SETTINGS_BY_COMPANY_ID =
  "/get_violation_setting_by_company_id";
const ADD_VIOLATION_SETTING = "/add_violation_setting";
const GET_ALL_CAMERA_LABELS_OF_CURRENT_USER =
  "/get_all_camera_labels_of_current_user";
const GET_MODEL_LABELS_OF_SUPERVISOR = "/get_model_labels_of_supervisor";
const UPDATE_VIOLATION_SETTING = "/update_violation_setting";
const CHECK_FOR_TODAY_VIOLATION_REPORT = "/check_for_today_violation_report";
const GENERATE_VIOLATION_REPORT = "/generate_violation_report";

const GET_TRAINED_EMPLOYEE_BY_COMPANY_ID =
  "/get_trained_employee_by_company_id";
const SUPERVISOR_GET_TRAINED_EMPLOYEE_BY_COMPANY_ID =
  "/supervisor_get_trained_employee_by_company_id";

const GET_VIOLATION_REPORT_BY_EMPLOYEE = "/get_violation_report_by_employee";
const SUPERVISOR_GET_VIOLATION_REPORT_BY_EMPLOYEE =
  "/supervisor_get_violation_report_by_employee";
const GET_DEPLOYMENT_CAMERA = "/get_deployment_camera";

const GET_VIOLATION_EMPLOYEE_REPORT_BY_DATE = "/get_violation_report_by_date";
const SUPERVISOR_GET_VIOLATION_EMPLOYEE_REPORT_BY_DATE =
  "/supervisor_get_violation_report_by_date";

const GET_VIOLATION_REPORT_BY_CAMERA_AND_LABEL =
  "/get_violation_report_by_camera_and_label";
const SUPERVISOR_GET_VIOLATION_REPORT_BY_CAMERA_AND_LABEL =
  "/supervisor_get_violation_report_by_camera_and_label";

const GET_UNKNOWN_VIOLATION_REPORT_BY_DATE =
  "/get_unknown_violation_report_by_date";
const GET_SUPERVISOR_UNKNOWN_VIOLATION_REPORT_BY_DATE =
  "/get_supervisor_unknown_violation_report_by_date";

export async function getViolationSetting() {
  return await request({
    endpoint: GET_VIOLATION_SETTING_BY_COMPANY_ID,
    method: HttpRequest.GET,
  });
}

export async function getViolationReportByDate(
  utcStartDate,
  utcEndDate,
  start_time,
  end_time,
  start_min,
  end_min,
  day_start,
  labels
) {
  return await request({
    endpoint:
      GET_VIOLATION_REPORT_BY_DATE +
      `?utcStartDate=${utcStartDate}&utcEndDate=${utcEndDate}&start_time=${start_time}&end_time=${end_time}&start_min=${start_min}&end_min=${end_min}&day_start=${day_start}&labels=${labels}`,
    method: HttpRequest.POST,
  });
}
export async function getDeploymentRTSPJobForCurrentUser() {
  return await request({
    endpoint: GET_DEPLOYMENT_JOB_FOR_CURRENT_USER,
    method: HttpRequest.GET,
  });
}

export async function getReportMetadata(
  utcStartDate,
  utcEndDate,
  labels,
  aggregate_time
) {
  return await request({
    endpoint:
      GET_REPORT_METADATA +
      `?utcStartDate=${utcStartDate}&utcEndDate=${utcEndDate}&labels=${labels}&aggregate_time=${aggregate_time}`,
    method: HttpRequest.GET,
  });
}

export async function getReports(
  utcStartDate,
  utcEndDate,
  labels,
  aggregate_time,
  pageNo
) {
  return await request({
    endpoint:
      GET_VIOLATION_REPORT_BY_AGGREGATE_TIME +
      `?utcStartDate=${utcStartDate}&utcEndDate=${utcEndDate}&labels=${labels}&aggregate_time=${aggregate_time}&page_number=${pageNo}`,
    method: HttpRequest.GET,
  });
}

export async function getAllDeployedRTSPJobsDetails() {
  return await request({
    endpoint: GET_ALL_DEPLOYED_RTSP_JOBS,
    method: HttpRequest.GET,
  });
}

export async function getViolationSettings() {
  return await request({
    endpoint: GET_VIOLATION_SETTINGS_BY_COMPANY_ID,
    method: HttpRequest.GET,
  });
}
export async function addViolationSetting(body) {
  return await request({
    endpoint: ADD_VIOLATION_SETTING,
    method: HttpRequest.POST,
    body: body,
  });
}
export async function getModelLabels(userRole) {
  let DATA_URL = "";

  if (userRole === "admin") {
    DATA_URL = GET_ALL_CAMERA_LABELS_OF_CURRENT_USER;
  } else {
    DATA_URL = GET_MODEL_LABELS_OF_SUPERVISOR;
  }
  return await request({
    endpoint: DATA_URL,
    method: HttpRequest.GET,
  });
}
export async function updateViolationSetting(body) {
  return await request({
    endpoint: UPDATE_VIOLATION_SETTING,
    method: HttpRequest.POST,
    body: body,
  });
}
export async function checkViolationReport() {
  return await request({
    endpoint: CHECK_FOR_TODAY_VIOLATION_REPORT,
    method: HttpRequest.GET,
  });
}
export async function generateViolationReport() {
  return await request({
    endpoint: GENERATE_VIOLATION_REPORT,
    method: HttpRequest.GET,
  });
}
export async function getEmployeeDropDown(userRole) {
  let DATA_URL = "";

  if (userRole === ADMIN_ROLE) {
    DATA_URL = GET_TRAINED_EMPLOYEE_BY_COMPANY_ID;
  } else {
    DATA_URL = SUPERVISOR_GET_TRAINED_EMPLOYEE_BY_COMPANY_ID;
  }
  return await request({
    endpoint: DATA_URL,
    method: HttpRequest.GET,
  });
}
export async function getViolationEmployeeRecordByMonthYear(
  selectedEmployee,
  current_month,
  current_year,
  userRole
) {
  let DATA_URL = "";

  if (userRole === ADMIN_ROLE) {
    DATA_URL = GET_VIOLATION_REPORT_BY_EMPLOYEE;
  } else {
    DATA_URL = SUPERVISOR_GET_VIOLATION_REPORT_BY_EMPLOYEE;
  }
  return await request({
    endpoint:
      DATA_URL +
      "?emp_ext_name=" +
      selectedEmployee +
      "&current_month=" +
      current_month +
      "&current_year=" +
      current_year,
    method: HttpRequest.GET,
  });
}
export async function getCameraName(cameraID) {
  return await request({
    endpoint: GET_DEPLOYMENT_CAMERA + "?deployment_camera_id=" + cameraID,
    method: HttpRequest.GET,
  });
}
export async function getViolationEmployeeReportByDate(selectedDate, userRole) {
  let DATA_URL = "";

  if (userRole === ADMIN_ROLE) {
    DATA_URL = GET_VIOLATION_EMPLOYEE_REPORT_BY_DATE;
  } else {
    DATA_URL = SUPERVISOR_GET_VIOLATION_EMPLOYEE_REPORT_BY_DATE;
  }
  return await request({
    endpoint: DATA_URL + "?report_date=" + selectedDate,
    method: HttpRequest.GET,
  });
}
export async function getViolationReportByCameraAndLabel(
  cameraID,
  label,
  userRole
) {
  let DATA_URL = "";

  if (userRole === ADMIN_ROLE) {
    DATA_URL = GET_VIOLATION_REPORT_BY_CAMERA_AND_LABEL;
  } else {
    DATA_URL = SUPERVISOR_GET_VIOLATION_REPORT_BY_CAMERA_AND_LABEL;
  }
  return await request({
    endpoint: DATA_URL + "?camera_id=" + cameraID + "&label=" + label,
    method: HttpRequest.GET,
  });
}
export async function getUnknownReport(reportDate, userRole) {
  let DATA_URL = "";

  if (userRole === ADMIN_ROLE) {
    DATA_URL = GET_UNKNOWN_VIOLATION_REPORT_BY_DATE;
  } else {
    DATA_URL = GET_SUPERVISOR_UNKNOWN_VIOLATION_REPORT_BY_DATE;
  }
  return await request({
    endpoint: DATA_URL + "?report_date=" + reportDate,
    method: HttpRequest.GET,
  });
}
