import React from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import {MyResultUIProvider} from "./MyEventViewUIContext";
import {MyEventViewCard} from "./MyEventViewCard"
import {MyEventViewDialog} from "./my-event-view-dialog/MyEventViewDialog";
import {EventViewStatusDialog} from "./event-view-status-dialog/EventViewStatusDialog";

export function MyEventViewPage() {
    const navigate = useNavigate();
    const myEventViewPageBaseUrl = '/eventsList';

    const myEventViewUIEvents = {
        openViewMyResultBtnClick: (id) => {
            navigate(`${id}/view`);
        },
        openChangeStatusBtnClick: (id, status) => {
            navigate(`${id}/${status}/changeStatus`);
        },
        openCardsClick: (data) => {
            navigate(`${data}/cards`);
        }
    };

    const ViewDialogRoute = () => {
        const { id } = useParams();
        return (
            <MyEventViewDialog
                show={true}
                id={id}
                onHide={() => navigate(myEventViewPageBaseUrl)}
            />
        );
    };

    const ChangeStatusDialogRoute = () => {
        const { id, status } = useParams();
        return (
            <EventViewStatusDialog
                show={true}
                id={id}
                status={status}
                onHide={() => navigate(myEventViewPageBaseUrl)}
            />
        );
    };

    return (
        <MyResultUIProvider myResultUIEvents={myEventViewUIEvents}>
            <Routes>
                <Route path=":id/view" element={<ViewDialogRoute />} />
                <Route path=":id/:status/changeStatus" element={<ChangeStatusDialogRoute />} />
                <Route index element={<MyEventViewCard />} />
                <Route path="" element={<MyEventViewCard />} />
            </Routes>
        </MyResultUIProvider>
    );
}
