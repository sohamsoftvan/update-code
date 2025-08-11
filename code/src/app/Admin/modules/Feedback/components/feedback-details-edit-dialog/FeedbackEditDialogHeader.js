import React, {useEffect, useState} from "react";
import {shallowEqual, useSelector} from "react-redux";

export function FeedbackEditDialogHeader({id}) {

    const {actionsLoading} = useSelector(
        (state) => ({
            actionsLoading: state.feedback.actionsLoading,
        }),
        shallowEqual
    );

    const [titlePrefix, setTitlePrefix] = useState("");
    useEffect(() => {
        setTitlePrefix(id ? "Edit" : "Add New");
        // eslint-disable-next-line
    }, [actionsLoading]);

    return (
        <>
            <div className="modal-header">
                <h5 className="modal-title" id="example-modal-sizes-title-lg">{titlePrefix} Feedback</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </>
    );
}
