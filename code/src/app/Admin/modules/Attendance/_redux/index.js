import { HttpRequest } from "../../../../../enums/http.methods";
import { request } from "../../../../../utils/APIRequestService";
import { ADMIN_ROLE } from "../../../../../enums/constant";
const GET_COMPANY_SETTINGS_BY_COMPANY_ID = "/get_company_setting_by_company_id";
const ADD_COMPANY_SETTINGS = "/add_company_setting";
const UPDATE_COMPANY_SETTINGS = "/update_company_setting";
const CHECK_FOR_TODAY_ATTENDANCE_REPORT = "/check_for_today_attendance_report";
const GENERATE_ATTENDANCE_REPORT = "/generate_attendance_report";
const GET_PRESENT_EMPLOYEE_REPORT = "/get_present_employee_report";
const GET_TRAINED_EMPLOYEE_BY_COMPANY_ID =
  "/get_trained_employee_by_company_id";
const GET_TODAY_ATTENDANCE_REPORT = "/get_today_attendance_report";
const GET_ATTENDANCE_REPORT_BY_EMPLOYEE = "/get_attendance_report_by_employee";
const GET_ATTENDANCE_REPORT_BY_DATE = "/get_attendance_report_by_date";

const SUPERVISOR_GET_TRAINED_EMPLOYEE_BY_COMPANY_ID =
  "/supervisor_get_trained_employee_by_company_id";
const SUPERVISOR_GET_TODAY_ATTENDANCE_REPORT =
  "/supervisor_get_today_attendance_report";
const SUPERVISOR_GET_ATTENDANCE_REPORT_BY_EMPLOYEE =
  "/supervisor_get_attendance_report_by_employee";
const SUPERVISOR_GET_ATTENDANCE_REPORT_BY_DATE =
  "/supervisor_get_attendance_report_by_date";

export async function getCompanySettings() {
  return await request({
    endpoint: GET_COMPANY_SETTINGS_BY_COMPANY_ID,
    method: HttpRequest.GET,
  });
}

export async function addCompanySettings(body) {
  return await request({
    endpoint: ADD_COMPANY_SETTINGS,
    method: HttpRequest.POST,
    body: body,
  });
}

export async function updateCompanySettings(body) {
  return await request({
    endpoint: UPDATE_COMPANY_SETTINGS,
    method: HttpRequest.POST,
    body: body,
  });
}
export async function isAttendanceReportGeneratedToday() {
  return await request({
    endpoint: CHECK_FOR_TODAY_ATTENDANCE_REPORT,
    method: HttpRequest.POST,
  });
}
export async function generateAttendanceReport() {
  return await request({
    endpoint: GENERATE_ATTENDANCE_REPORT,
    method: HttpRequest.GET,
  });
}
export async function getEmployeeReport(start, end, employeeId) {
  let API_URL =
    GET_PRESENT_EMPLOYEE_REPORT +
    "?start_date=" +
    start +
    "?end_date=" +
    end +
    "?employee_id=" +
    employeeId;
  if (!employeeId && employeeId === null) {
    API_URL =
      GET_PRESENT_EMPLOYEE_REPORT + "?start_date=" + start + "&end_date=" + end;
  }

  return await request({
    endpoint: API_URL,
    method: HttpRequest.GET,
  });
}

export async function getEmployee(userRole) {
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

export async function getEmployeeRecordByMonthYear(
  selectedEmployee,
  current_month,
  current_year,
  userRole
) {
  let DATA_URL = "";
  if (userRole === ADMIN_ROLE) {
    DATA_URL = GET_ATTENDANCE_REPORT_BY_EMPLOYEE;
  } else {
    DATA_URL = SUPERVISOR_GET_ATTENDANCE_REPORT_BY_EMPLOYEE;
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

export async function getTodayReport(userRole) {
  let DATA_URL = "";
  if (userRole === ADMIN_ROLE) {
    DATA_URL = GET_TODAY_ATTENDANCE_REPORT;
  } else {
    DATA_URL = SUPERVISOR_GET_TODAY_ATTENDANCE_REPORT;
  }
  return await request({
    endpoint: DATA_URL,
    method: HttpRequest.GET,
  });
}

export async function getEmployeeByDate(selectedDate, userRole) {
  let DATA_URL = "";
  if (userRole === ADMIN_ROLE) {
    DATA_URL = GET_ATTENDANCE_REPORT_BY_DATE;
  } else {
    DATA_URL = SUPERVISOR_GET_ATTENDANCE_REPORT_BY_DATE;
  }
  return await request({
    endpoint: DATA_URL + "?report_date=" + selectedDate,
    method: HttpRequest.GET,
  });
}
