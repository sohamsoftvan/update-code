import {callTypes, ComplaintSlice} from "./ComplaintSlice";
import {getComplaints, addComplaint} from "./ComplaintAPI";
import {successToast} from "../../../../../utils/ToastMessage";

const {actions} = ComplaintSlice;

export const fetchComplaint = () => async dispatch => {
    dispatch(actions.startCall({callType: callTypes.list}));
    getComplaints()
        .then(response => {
            if (response && response.isSuccess) {
                dispatch(actions.complaintFetched(response.data));
            } else {
                //console.log("error.detail",error.detail)
            }
        })
        .catch(error => {
            error.clientMessage = "Can't find complaints";
            if(error.detail)
            {
                console.log(error.detail)
            }
            dispatch(actions.catchError({error, callType: callTypes.list}));
        });
};


export const fetchComplaintById = (id) => dispatch => {
    dispatch(actions.startCall({callType: callTypes.action}));
    return dispatch(actions.complaintFetchedById(id));
};

export const createComplaint = (complaintData) => dispatch => {

    dispatch(actions.startCall({callType: callTypes.action}));

    return addComplaint(complaintData.message, complaintData.image).then(response => {
        if (response && response.isSuccess) {
            let data = response.data;
            dispatch(actions.addNewComplaint(data));
            successToast("Complaint added successfully");
        }
    }).catch(error => {
        if(error.detail)
        {
            console.log(error.detail)
        }
        dispatch(actions.catchError({error, callType: callTypes.action}));
    });
}
