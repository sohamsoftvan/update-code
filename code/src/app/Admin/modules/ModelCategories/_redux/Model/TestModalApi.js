import { request } from "../../../../../../utils/APIRequestService";
import { HttpRequest } from "../../../../../../enums/http.methods";
// eslint-disable-next-line

const START_TESTING = "/add_infer_job";
const LOAD_INFER_JOB = "/load_infer_job";
const GET_CREDITS = "/get_model_test_credit_for_current_user";
const UPDATE_CREDITS = "/update_model_test_credit";
const LOAD_VIDEO_INFER_JOB = "/load_video_infer_job";
const LOAD_RTSP_INFER_JOB = "/load_rtsp_infer_job";
const UPLOAD_VIDEO_FOR_INFER_JOB = "/upload_file_for_infer_job";
const GET_INFER_JOB_RESULT = "/get_infer_job_result";

export async function startTesting(modelId, status = true) {
  const data = {
    image_size: 640,
    confidence_threshold: 0.3,
    iou_threshold: 0.5,
    model_id: modelId,
    status: status
  };
  return await request({
    endpoint: START_TESTING,
    headers: { "Content-Type": "application/json " },
    body: data,
    method: HttpRequest.POST
  });
}

export async function loadInferJob(jobId, file,coordinateData) {
  let fileData = new FormData();
  fileData.append("image", file);
  if (coordinateData) {
    fileData.append("coordinate", JSON.stringify(coordinateData)); // Convert list to JSON string
  }
  return await request({
    endpoint: LOAD_INFER_JOB + `?job_id=${jobId}`,
    headers: { "Content-Type": "multipart/form-data" },
    method: HttpRequest.POST,
    body: fileData
  });
}

export async function uploadVideoInferJob(jobId, file ,coordinateData) {
  let fileData = new FormData();
  fileData.append("upload_file", file);
  if (coordinateData) {
    fileData.append("coordinate", JSON.stringify(coordinateData)); // Convert list to JSON string
  }
  return await request({
    endpoint: UPLOAD_VIDEO_FOR_INFER_JOB + `?job_id=${jobId}`,
    headers: { "Content-Type": "multipart/form-data" },
    method: HttpRequest.POST,
    body: fileData
  });
}

export async function getInferJob(jobId) {
  return await request({
    endpoint: GET_INFER_JOB_RESULT + `?job_id=${jobId}`,
    headers: { "Content-Type": "multipart/form-data" },
    method: HttpRequest.GET,
  });
}


export async function getCredits() {
  return await request({
    endpoint: GET_CREDITS,
    method: HttpRequest.GET
  });
}

export async function updateCredits(body) {
  return await request({
    endpoint: UPDATE_CREDITS,
    method: HttpRequest.POST,
    body: body
  });
}

export async function loadVideoInferJob(jobId, file ,coordinateData) {
  let fileData = new FormData();
  fileData.append("video", file);
  if (coordinateData) {
    fileData.append("coordinate", JSON.stringify(coordinateData)); // Convert list to JSON string
  }
  return await request({
    endpoint: LOAD_VIDEO_INFER_JOB + `?job_id=${jobId}`,
    headers: { "Content-Type": "multipart/form-data" },
    method: HttpRequest.POST,
    body: fileData
  });
}


export async function loadRtspInferJob(jobId, rtspUrl ,coordinateData) {
  let endpoint =
      LOAD_RTSP_INFER_JOB + `?job_id=${jobId}&rtsp_url=${rtspUrl}`;

  if (coordinateData) {
    endpoint += `&coordinate=${coordinateData}`;
  }
  return await request({
    endpoint: endpoint,
    headers: { "Content-Type": "multipart/form-data" },
    method: HttpRequest.POST,
  });
}

export async function uploadRtspInferJob(jobId, RtspUrl ,coordinateData) {
  let fileData = new FormData();
  fileData.append("rtsp_url", RtspUrl);
  if (coordinateData) {
    fileData.append("coordinate", JSON.stringify(coordinateData)); // Convert list to JSON string
  }
  return await request({
    endpoint: UPLOAD_VIDEO_FOR_INFER_JOB + `?job_id=${jobId}`,
    headers: { "Content-Type": "multipart/form-data" },
    method: HttpRequest.POST,
    body: fileData
  });
}
