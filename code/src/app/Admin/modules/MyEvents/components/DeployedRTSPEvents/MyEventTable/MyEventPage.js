import React, { useState } from "react";
import { MyEventUIProvider } from "./MyEventUIContext";
import { MyEventViewDialog } from "./my-event-view-dialog/MyEventViewDialog";
import { MyEventCard } from "./MyEventCard";
export function MyEventPage({ history }) {
  const myEventPageBaseUrl = "/my-events";
  const [event, setEvent] = useState({});
  const [cameraName, setCameraName] = useState({});
  const [show, setShow] = useState(false);

  const myEventUIEvents = {
    openViewMyEventBtnClick: (event, cameraName) => {
      setEvent(event);
      setShow(true);
      setCameraName(cameraName);
    }
  };

  return (
    <MyEventUIProvider myEventUIEvents={myEventUIEvents}>
      {show && (
        <MyEventViewDialog
          cameraName={cameraName}
          event={event}
          show={show}
          onHide={() => {
            setShow(false);
            history.push(myEventPageBaseUrl);
          }}
        />
      )}

      <MyEventCard />
    </MyEventUIProvider>
  );
}
