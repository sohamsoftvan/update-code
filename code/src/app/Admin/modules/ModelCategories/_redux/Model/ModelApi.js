import {request} from "../../../../../../utils/APIRequestService";
import {HttpRequest} from "../../../../../../enums/http.methods";

const GET_ONE_MODEL = "/get_model_by_id";

export async function getOneModel(modelId) {
    return await request({
        endpoint: GET_ONE_MODEL + `?model_id=${modelId}`,
        method: HttpRequest.GET
    });
}


