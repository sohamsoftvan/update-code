import {request} from "../../../../../utils/APIRequestService";
import {HttpRequest} from "../../../../../enums/http.methods";

const ADD_FEEDBACK = "/add_feedback";
const UPDATE_FEEDBACK = "/update_feedback";
const GET_FEEDBACK = "/get_feedback_of_current_user";

export async function addFeedback(feedback) {
    return await request({
        endpoint: ADD_FEEDBACK,
        method: HttpRequest.POST,
        body: feedback
    });
}

export async function updateFeedback(feedback) {
    return await request({
        endpoint: UPDATE_FEEDBACK,
        method: HttpRequest.POST,
        body: feedback
    });
}

export async function getFeedbacks() {
    return await request({
        endpoint: GET_FEEDBACK,
        method: HttpRequest.GET
    });
}
