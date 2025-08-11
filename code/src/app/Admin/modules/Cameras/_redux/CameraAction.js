import {callTypes, CameraSlice} from "./CameraSlice";
import {getAllDeployedRTSPJobsDetails} from "./CameraAPI";

const {actions} = CameraSlice;

export const fetchDeployedRTSPJobs = queryParams => dispatch => {
    dispatch(actions.startCall({callType: callTypes.list}));
    return getAllDeployedRTSPJobsDetails()
        .then(response => {
            if (response && response.isSuccess) {
                dispatch(actions.deployedRTSPJobsFetched(response.data));
                return response;
            }else{
                //console.log("error.detail",error.detail)
            }
        })
        .catch(error => {
            error.clientMessage = "Can't find deployed rtsp jobs";
            dispatch(actions.catchError({error, callType: callTypes.list}));
            if(error.detail){
                console.log("error.detail" , error.detail)
            }
        });
};



