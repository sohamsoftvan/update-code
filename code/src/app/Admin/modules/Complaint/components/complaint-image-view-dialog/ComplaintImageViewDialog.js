/* eslint-disable */
import React, {useEffect} from "react";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {fetchComplaintById} from "../../_redux/ComplaintAction";
import CustomizedButtons from "../../../../../../utils/SuperAdmin/CustomizedButtons";


export function ComplaintImageViewDialog({id, show, onHide}) {

    const dispatch = useDispatch();

    const {complaintFetchedById} = useSelector(
        (state) => ({
            complaintFetchedById: state.complaint.complaintFetchedById
        }),
        shallowEqual
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchComplaintById(id));
        }
        // eslint-disable-next-line
    }, [id])

    return (
        <CommonModal
            show={show}
            handleClose={onHide}
            title="Complaint Image"
            content={
                <div className={"complaint-image-display"}>
                {complaintFetchedById?.img_url ?
                    <img className="w-100" src={complaintFetchedById?.img_url} alt={"Complaint Image"}/>
                    :
                    <b>No Image Uploaded For This Complaint</b>
                }
                </div>
            }
            applyButton={false}
            dialogClassName="result-modal"
        />
    );
}
