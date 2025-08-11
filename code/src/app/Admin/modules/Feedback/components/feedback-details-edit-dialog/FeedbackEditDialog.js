import React, {useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {FeedbackEditForm} from "./FeedbackEditForm";
import * as action from "../../_redux/FeedbackAction";
import {FeedbackSlice} from "../../_redux/FeedbackSlice";
import Cookies from "universal-cookie";

const {actions} = FeedbackSlice;

export function FeedbackEditDialog({id, show, onHide}) {

    const {actionsLoading, feedbackFetchedById} = useSelector(
        (state) => ({
            actionsLoading: state.feedback.actionsLoading,
            feedbackFetchedById: state.feedback.feedbackFetchedById,
        }),
        shallowEqual
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (id !== null && id !== undefined) {
            dispatch(action.fetchFeedbackById(id));
        } else {
            dispatch(actions.clearFeedbackById());
        }
    }, [id, dispatch]);

    // eslint-disable-next-line
    const {isAuthorized, user} = useSelector(
        ({auth}) => ({
            isAuthorized: auth.user?.id && new Cookies().get("access_token"),
            user: auth.user
        }),
        shallowEqual
    );

    const saveFeedbackDetails = (feedback) => {
        if (!id) {
            // server request for creating feedback details
            dispatch(action.createFeedback(feedback,user.id)).then(() => onHide());
        } else {
            // server request for updating feedback details
            dispatch(action.updateExistingFeedback(feedback,user.id)).then(() => {
                // successToast("Feedback details updated successfully")
                onHide()
            });
        }
    };

    return (
        <FeedbackEditForm
            saveFeedback={saveFeedbackDetails}
            actionsLoading={actionsLoading}
            feedbackData={feedbackFetchedById}
            onHide={onHide}
            id={id}
            show={show}
        />

    );
}
