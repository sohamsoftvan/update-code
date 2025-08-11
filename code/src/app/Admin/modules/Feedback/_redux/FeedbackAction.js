import {callTypes, FeedbackSlice} from "./FeedbackSlice";
import {getFeedbacks, addFeedback, updateFeedback} from "./FeedbackAPI";
import {successToast, warningToast} from "../../../../../utils/ToastMessage";

const {actions} = FeedbackSlice;

export const fetchFeedback = () => async dispatch => {
    dispatch(actions.startCall({callType: callTypes.list}));
    getFeedbacks()
        .then(response => {
            if (response && response.isSuccess) {
                dispatch(actions.feedbackFetched(response.data));
            } else {
                // warningToast("something went wrong");
            }
        })
        .catch(error => {
            error.clientMessage = "Can't find feedbacks";
            if(error.detail)
            {
                warningToast(error.detail)
            }
            dispatch(actions.catchError({error, callType: callTypes.list}));
        });
};


export const fetchFeedbackById = (id) => dispatch => {
    dispatch(actions.startCall({callType: callTypes.action}));
    return dispatch(actions.feedbackFetchedById(id));
};

export const createFeedback = (feedbackData,userId) => dispatch => {

    dispatch(actions.startCall({callType: callTypes.action}));

    const data = {
        "feedback_message": feedbackData.feedbackMessage,
        "ratings": feedbackData.ratings,
        "user_id": userId,
        "status" : true
    }

    return addFeedback(data).then(response => {
        if (response && response.isSuccess) {
            let data = response.data;
            dispatch(actions.addNewFeedback(data));
            successToast("Feedback sent successfully");
        }
    }).catch(error => {
        if(error.detail)
        {
           console.log(error.detail)
        }
        dispatch(actions.catchError({error, callType: callTypes.action}));
    });
}


export const updateExistingFeedback = (feedbackData,userId) => dispatch => {

    dispatch(actions.startCall({callType: callTypes.action}));

    const data = {
        "feedback_message": feedbackData.feedbackMessage || feedbackData.feedback_message,
        "ratings": feedbackData.ratings,
        "id": feedbackData.id,
        "user_id": userId,
        "status" : true
    }

    return updateFeedback(data).then(response => {
        if (response && response.isSuccess) {
            let data = response.data;
            dispatch(actions.updateExistingFeedback(data));
            successToast("Feedback updated successfully");
        }
    }).catch(error => {
        if(error.detail)
        {
            warningToast(error.detail)
        }
        else {
            warningToast("Something went Wrong")
        }
        dispatch(actions.catchError({error, callType: callTypes.action}));
    });
}
