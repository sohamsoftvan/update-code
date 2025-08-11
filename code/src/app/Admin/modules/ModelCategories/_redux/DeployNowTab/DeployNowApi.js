import { request } from "../../../../../../utils/APIRequestService";
import { HttpRequest } from "../../../../../../enums/http.methods";

const GET_ALL_DEPLOYMENT_TYPE = "/get_all_deployment_type";
const ADD_DEPLOYMENT_JOB = "/add_deployment_job";
const ADD_DEPLOYMENT_RTSP_JOB = "/add_deployment_rtsp_job";
const CHECK_RTSP_URL = "/check_rtsp_status";
const ADD_DEPLOYMENT_CAMERA = "/add_deployment_cameras";
const GET_DEPLOYMENT_RTSP_JOB_BY_ID = "/get_deployment_rtsp_job_by_id";
const DELETE_CAMERA = "/delete_deployment_cameras";

export async function getAllDeploymentType() {
  return await request({
    endpoint: GET_ALL_DEPLOYMENT_TYPE,
    method: HttpRequest.GET
  });
}

export async function getOneDeploymentJobById(jobId) {
  return await request({
    endpoint: GET_DEPLOYMENT_RTSP_JOB_BY_ID + "?deployment_job_id=" + jobId,
    method: HttpRequest.GET
  });
}

export async function addDeploymentJob(jobData) {
  const dJobData = {
    image_size: jobData.imageSize,
    confidence_threshold: jobData.confThresh,
    iou_threshold: jobData.iouThresh,
    model_id: jobData.modelId,
    deployment_type_id: jobData.deploymentType
  };
  return await request({
    endpoint: ADD_DEPLOYMENT_JOB,
    // headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: HttpRequest.POST,
    body: dJobData
  });
}

export async function addDeploymentRTSPJob(jobData) {
  const dRTSPJobData = {
    image_size: jobData.imageSize,
    confidence_threshold: jobData.confThresh,
    iou_threshold: jobData.iouThresh,
    model_id: jobData.modelId,
    deployment_type_id: 2,
    start_time: jobData.start_time,
    end_time: jobData.end_time
  };
  return await request({
    endpoint: ADD_DEPLOYMENT_RTSP_JOB,
    // headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: HttpRequest.POST,
    body: dRTSPJobData
  });
}

export async function addDeploymentCamera(camera) {
  const cameraData = {
    rtsp_url: camera.rtsp_url,
    camera_name: camera.camera_name,
    camera_resolution: camera.camera_resolution,
    process_fps: camera.process_fps,
    location_id: camera.location_id,
    camera_ip: camera.camera_ip,
    deployment_job_rtsp_id: camera.deploymentJobId,
    is_active: true,
    is_tcp: true,
    roi_type: camera.roi_type,
    status: true,
    is_processing: true
  };

  return await request({
    endpoint: ADD_DEPLOYMENT_CAMERA,
    // headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: HttpRequest.POST,
    body: cameraData
  });
}

export async function checkRTSPURL(rtspURL) {
  return await request({
    endpoint: CHECK_RTSP_URL + "?rtsp_url=" + rtspURL.replace(/&/g, "%26"),
    method: HttpRequest.POST
  });
}

export async function deleteCamera(cameraId) {
  return await request({
    endpoint: DELETE_CAMERA + "?camera_id=" + cameraId,
    method: HttpRequest.POST
  });
}
