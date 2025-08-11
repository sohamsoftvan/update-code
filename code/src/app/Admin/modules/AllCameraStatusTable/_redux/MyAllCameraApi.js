import { request } from "../../../../../utils/APIRequestService";
import { HttpRequest } from "../../../../../enums/http.methods";

const GET_ALL_CAMERA_LOCATION_Modal = "/get_all_camera_location_model";
const GET_ALL_MODELS_By_CAMERA_LIST = "/get_all_models_by_camera_list";
const GET_RTSP_DOWN_ODIT_DATA = "/get_rtsp_down_odit_data";
const GET_RTSP_STATUS_DATA = "/get_all_filter_camera";

export async function getAllCameraLocationModalData(body ,pageNo,pageSize) {
    return await request({
      endpoint: GET_ALL_CAMERA_LOCATION_Modal + `?page=${pageNo}&size=${pageSize}`,
      method: HttpRequest.POST,
      body: JSON.stringify(body),
    })
}
export async function getAllModalFromListOfCameraId(camera_id,) {
        return await request({
            endpoint:
                GET_ALL_MODELS_By_CAMERA_LIST + "?camera_id=" + camera_id,
            method: HttpRequest.POST,
            body: JSON.stringify(camera_id),
        });
}

export async function getAllCameraLog(body) {
    return await request({
        endpoint: GET_RTSP_DOWN_ODIT_DATA,
        method: HttpRequest.POST,
        body: JSON.stringify(body),
    })
}

export async function getAllCameraStatus(body) {
    return await request({
        endpoint: GET_RTSP_STATUS_DATA,
        method: HttpRequest.POST,
        body: JSON.stringify(body),
    })
}