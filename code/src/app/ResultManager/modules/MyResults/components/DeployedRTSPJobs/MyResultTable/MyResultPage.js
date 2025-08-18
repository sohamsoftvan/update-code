import React from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import {MyResultUIProvider} from "./MyResultUIContext";
import {MyResultCard} from "./MyResultCard"
import {MyResultViewDialog} from "./my-result-view-dialog/MyResultViewDialog";
import {ResultStatusDialog} from "./result-status-dialog/ResultStatusDialog";

export function MyResultPage() {
    const navigate = useNavigate();
    const myResultPageBaseUrl = "/my-results";

    const myResultUIEvents = {
        openViewMyResultBtnClick: (id) => {
            navigate(`${id}/view`);
        },
        openChangeStatusBtnClick: (id, status) => {
            navigate(`${id}/${status}/changeStatus`);
        },
        openCardsClick: (data) => {
            navigate(`${data}/cards`);
        },
    };

    const ViewDialogRoute = () => {
        const { id } = useParams();
        return (
            <MyResultViewDialog
                show={true}
                id={id}
                onHide={() => navigate(myResultPageBaseUrl)}
            />
        );
    };

    const ChangeStatusDialogRoute = () => {
        const { id, status } = useParams();
        return (
            <ResultStatusDialog
                show={true}
                id={id}
                status={status}
                onHide={() => navigate(myResultPageBaseUrl)}
            />
        );
    };

    return (
        <MyResultUIProvider myResultUIEvents={myResultUIEvents}>
            <Routes>
                <Route path=":id/view" element={<ViewDialogRoute />} />
                <Route path=":id/:status/changeStatus" element={<ChangeStatusDialogRoute />} />
                <Route index element={<MyResultCard />} />
                <Route path="" element={<MyResultCard />} />
            </Routes>
        </MyResultUIProvider>
    );
}
