import {Route} from "react-router-dom";
import React from "react";
import {FeedbackUIProvider} from "./FeedbackUIContext";
import {FeedbackCard} from "./FeedbackCard";
import {FeedbackEditDialog} from "./feedback-details-edit-dialog/FeedbackEditDialog";

export function FeedbackPage({history}) {

    const feedbackPageBaseUrl = '/feedbacks';

    const feedbackUIEvents = {
        newFeedbackBtnClick: () => {
            history.push(`${feedbackPageBaseUrl}/new`);
        },
        editFeedbackBtnClick: (id) => {
            history.push(`${feedbackPageBaseUrl}/${id}/edit`);
        }
    };

    return (
        <FeedbackUIProvider feedbackUIEvents={feedbackUIEvents}>
            <Route path={`${feedbackPageBaseUrl}/new`}>
                {({history, match}) => (
                    <FeedbackEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push(feedbackPageBaseUrl);
                        }}
                    />
                )}
            </Route>
            <Route path={`${feedbackPageBaseUrl}/:id/edit`}>
                {({history, match}) => (
                    <FeedbackEditDialog
                        show={match != null}
                        id={match?.params.id}
                        onHide={() => {
                            history.push(feedbackPageBaseUrl);
                        }}
                    />
                )}
            </Route>
            <FeedbackCard/>
        </FeedbackUIProvider>
    );
}
