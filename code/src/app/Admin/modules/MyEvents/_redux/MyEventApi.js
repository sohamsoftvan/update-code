
import {request} from "../../../../../utils/APIRequestService";
import { HttpRequest } from "../../../../../enums/http.methods";

const GET_EVENT_METADATA="/get_event_metadata";
const GET_EVENTS="/get_event";
// const GET_ALL_EVENT_TYPE_BY_USER_ID="/get_all_event_type_by_user_id";
const get_event_type_by_camera_id="/get_event_type_by_camera_id";

export async function getEventMetadata(
    startDate,
    endDate,
    selectedLabel,
    selctedcameraid,
    pageSize,locationIdList
) {

    if (startDate && endDate) {
        return await request({
            endpoint: GET_EVENT_METADATA +`?start_date=${startDate}&end_date=${endDate}&page_size=${pageSize}`,
            method: HttpRequest.POST,
            body: { camera_id_list: selctedcameraid, event_type_list: selectedLabel,location_id_list: locationIdList },
        });
    } else {
        return await request({
            endpoint: GET_EVENT_METADATA,
            method: HttpRequest.POST,
            body: { camera_id_list: selctedcameraid,event_type_list: selectedLabel ,location_id_list: locationIdList},
        });
    }
}

export async function getEvents(pageNo, startDate, endDate, selctedcameraid, selectedLabel,location_list,pageSize)
{
    if (startDate && endDate) {
        return await request({
            // endpoint: GET_EVENTS +`?page_number=${pageNo}&start_date=${startDate}&end_date=${endDate}`,
            endpoint: GET_EVENTS +`?page_number=${pageNo}&start_date=${startDate}&end_date=${endDate}&page_size=${pageSize}`,
            method: HttpRequest.POST,
            body: { camera_id_list: selctedcameraid, event_type_list: selectedLabel,location_id_list:location_list  },
        });
    } else {
        return await request({
            endpoint: GET_EVENTS + `?page_number=${pageNo}&page_size=${pageSize}`,
            method: HttpRequest.POST,
            body: { camera_id_list: selctedcameraid, event_type_list: selectedLabel,location_id_list:location_list },
        });
    }
}

export async function getDiffEvents(userid) {
    return await request({
        endpoint:get_event_type_by_camera_id ,
        method: HttpRequest.POST,
        body: JSON.stringify(userid),
        // endpoint: get_event_type_by_camera_id +`?user_id=${userid}`,

    })
}
