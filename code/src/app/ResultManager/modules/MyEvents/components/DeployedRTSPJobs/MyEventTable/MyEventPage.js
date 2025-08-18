import React from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

import {MyEventUIProvider} from "./MyEventUIContext"
import {MyEventCard} from "./MyEventCard"

export function MyEventPage() {
    const navigate = useNavigate();
    const myEventPageBaseUrl = '/events';

    const myEventUIEvents = {
        openChangeStatusBtnClick: (id, status) => {
            navigate(`${id}/${status}/changeStatus`);
        },
        openCardsClick: (data) => {
            navigate(`${data}/cards`);
        }
    };

    const ChangeStatusDialogRoute = () => {
        const { id, status } = useParams();
        return (
            <div>
                {/* Add your change status dialog component here */}
                <p>Change Status for ID: {id}, Status: {status}</p>
                <button onClick={() => navigate(myEventPageBaseUrl)}>Back</button>
            </div>
        );
    };

    const CardsRoute = () => {
        const { data } = useParams();
        return (
            <div>
                {/* Add your cards component here */}
                <p>Cards for: {data}</p>
                <button onClick={() => navigate(myEventPageBaseUrl)}>Back</button>
            </div>
        );
    };

    return(
        <MyEventUIProvider myEventUIEvents={myEventUIEvents}>
            <Routes>
                <Route path=":id/:status/changeStatus" element={<ChangeStatusDialogRoute />} />
                <Route path=":data/cards" element={<CardsRoute />} />
                <Route index element={<MyEventCard />} />
                <Route path="" element={<MyEventCard />} />
            </Routes>
        </MyEventUIProvider>
    )
}