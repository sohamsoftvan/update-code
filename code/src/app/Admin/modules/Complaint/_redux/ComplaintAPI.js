import {request} from "../../../../../utils/APIRequestService";
import {HttpRequest} from "../../../../../enums/http.methods";

const ADD_COMPLAINT = "/add_complaint";
const GET_COMPLAINT = "/get_complaint_of_current_user";

export async function addComplaint(complaintMsg, complaintImg) {
    let fileData = new FormData();
    fileData.append("complaint_image", complaintImg);
    return await request({
        endpoint: ADD_COMPLAINT + '?complaint_message=' + complaintMsg,
        headers: {'Content-Type': 'multipart/form-data'},
        method: HttpRequest.POST,
        body: fileData
    });
}

export async function getComplaints() {
    return await request({
        endpoint: GET_COMPLAINT,
        method: HttpRequest.GET
    });
}
