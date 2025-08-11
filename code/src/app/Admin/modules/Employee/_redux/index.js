import { HttpRequest } from "../../../../../enums/http.methods";
import { request } from "../../../../../utils/APIRequestService";

const GET_CURRENT_COMPANY_ENABLED_LOCATIONS =
  "/get_current_company_enabled_locations";
const ADD_EMPLOYEE = "/add_employee";
const GET_ALL_ENABLED_EMPLOYEE_BY_COMPANY_ID =
  "/get_all_employee_by_company_id";
const GET_EMPLOYEE_BY_ID = "/get_employee_by_id";
const UPDATE_EMPLOYEE = "/update_employee";
const DELETE_FROM_TRIANED_EMPLOYEE = "/delete_employee_from_trained_employee";
const EMPLOYEE_TRAINING = "/employee_training";

export async function getCurrentCompanyEnabledLocations() {
  return await request({
    endpoint: GET_CURRENT_COMPANY_ENABLED_LOCATIONS,
    method: HttpRequest.GET,
  });
}

export async function addEmployee(data) {
  let formData = new FormData();
  formData.append("employee_image", data.employee_image);
  return await request({
    endpoint:
      ADD_EMPLOYEE +
      "?employee_name=" +
      data.employee_name +
      "&employee_description=" +
      data.employee_description +
      "&employee_profession=" +
      data.employee_profession +
      "&employee_contact_number=" +
      data.employee_contact_number +
      "&employee_id=" +
      data.employee_id +
      "&trained_status=" +
      data.trained_status +
      "&external_name=" +
      data.external_name +
      "&company_id=" +
      data.company_id +
      "&location_id=" +
      data.location_id +
      "&status=" +
      data.status,
    headers: { "Content-Type": "multipart/form-data" },
    method: HttpRequest.POST,
    body: formData,
  });
}

export async function updateEmployee(id, url, key, data) {
  let formData = new FormData();
  if (data && data.employee_image) {
    formData.append("employee_image", data.employee_image);
  }
  let obj = {};
  if (data && data.employee_image) {
    obj = {
      endpoint:
        UPDATE_EMPLOYEE +
        "?id=" +
        id +
        "&employee_name=" +
        data.employee_name +
        "&employee_description=" +
        data.employee_description +
        "&employee_profession=" +
        data.employee_profession +
        "&employee_contact_number=" +
        data.employee_contact_number +
        "&employee_id=" +
        data.employee_id +
        "&trained_status=" +
        data.trained_status +
        "&external_name=" +
        data.external_name +
        "&company_id=" +
        data.company_id +
        "&location_id=" +
        data.location_id +
        "&status=" +
        data.status +
        "&s3_key=" +
        key +
        "&s3_url=" +
        url,
      headers: { "Content-Type": "multipart/form-data" },
      method: HttpRequest.POST,
      body: formData,
    };
  } else {
    obj = {
      endpoint:
        UPDATE_EMPLOYEE +
        "?id=" +
        id +
        "&employee_name=" +
        data.employee_name +
        "&employee_description=" +
        data.employee_description +
        "&employee_profession=" +
        data.employee_profession +
        "&employee_contact_number=" +
        data.employee_contact_number +
        "&employee_id=" +
        data.employee_id +
        "&trained_status=" +
        data.trained_status +
        "&external_name=" +
        data.external_name +
        "&company_id=" +
        data.company_id +
        "&location_id=" +
        data.location_id +
        "&status=" +
        data.status +
        "&s3_key=" +
        key +
        "&s3_url=" +
        url,
      headers: { "Content-Type": "multipart/form-data" },
      method: HttpRequest.POST,
    };
  }

  return await request(obj);
}

export async function updateStatus(data) {
  return await request({
    endpoint:
      UPDATE_EMPLOYEE +
      "?id=" +
      data.id +
      "&employee_name=" +
      data.employee_name +
      "&employee_description=" +
      data.employee_description +
      "&employee_profession=" +
      data.employee_profession +
      "&employee_contact_number=" +
      data.employee_contact_number +
      "&employee_id=" +
      data.employee_id +
      "&trained_status=" +
      data.trained_status +
      "&external_name=" +
      data.external_name +
      "&company_id=" +
      data.company_id +
      "&location_id=" +
      data.location_id +
      "&status=" +
      data.status +
      "&s3_key=" +
      data.employee_s3_image_key +
      "&s3_url=" +
      data.employee_s3_image_url,
    headers: { "Content-Type": "multipart/form-data" },
    method: HttpRequest.POST,
  });
}

export async function employeeUntrained(id) {
  return await request({
    endpoint: DELETE_FROM_TRIANED_EMPLOYEE + "?employee_id=" + id,
    method: HttpRequest.POST,
  });
}

export async function employeeTrained(ids) {
  return await request({
    endpoint: EMPLOYEE_TRAINING,
    method: HttpRequest.POST,
    body: ids,
  });
}

export async function getAllEnabledEmployeeByCompanyId() {
  return await request({
    endpoint: GET_ALL_ENABLED_EMPLOYEE_BY_COMPANY_ID,
    method: HttpRequest.GET,
  });
}

export async function getEmployeeById(id) {
  return await request({
    endpoint: GET_EMPLOYEE_BY_ID + "?id=" + id,
    method: HttpRequest.GET,
  });
}
