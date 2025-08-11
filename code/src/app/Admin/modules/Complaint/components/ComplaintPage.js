import {Route} from "react-router-dom";
import React from "react";
import {ComplaintUIProvider} from "./ComplaintUIContext";
import {ComplaintCard} from "./ComplaintCard";
import {ComplaintEditDialog} from "./complaint-details-edit-dialog/ComplaintEditDialog";
import {ComplaintImageViewDialog} from "./complaint-image-view-dialog/ComplaintImageViewDialog";

export function ComplaintPage({history}) {

    const complaintPageBaseUrl = '/complaints';

    const complaintUIEvents = {
        newComplaintBtnClick: () => {
            history.push(`${complaintPageBaseUrl}/new`);
        },
        viewComplaintImgBtnClick: (id) => {
            history.push(`${complaintPageBaseUrl}/${id}/view`)
        }
    };

    return (
        <ComplaintUIProvider complaintUIEvents={complaintUIEvents}>
            <Route path={`${complaintPageBaseUrl}/new`}>
                {({history, match}) => (
                    <ComplaintEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push(complaintPageBaseUrl);
                        }}
                    />
                )}
            </Route>
            <Route path={`${complaintPageBaseUrl}/:id/view`}>
                {({history, match}) => (
                    <ComplaintImageViewDialog
                        show={match != null}
                        id={match?.params?.id}
                        onHide={() => {
                            history.push(complaintPageBaseUrl);
                        }}
                    />
                )}
            </Route>
            <ComplaintCard/>
        </ComplaintUIProvider>
    );
}
