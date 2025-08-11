import {request} from "../../../../../utils/APIRequestService";
import {HttpRequest} from "../../../../../enums/http.methods";

const GET_ALL_DEPLOYED_RTSP_JOBS = "/get_rtsp_deployed_jobs_for_current_user";
const GET_RTSP_URL = '/get_latest_frame_by_rtsp_for_live_cameras';

export async function getAllDeployedRTSPJobsDetails() {
    return await request({
        endpoint: GET_ALL_DEPLOYED_RTSP_JOBS,
        method: HttpRequest.GET
    });
}
export async function loadImageFromRtspURL(param) {
    return await request({
        endpoint: GET_RTSP_URL+"?rtsp_link=" +param.replace(/&/g,'%26'),
        method: HttpRequest.GET
    });
}