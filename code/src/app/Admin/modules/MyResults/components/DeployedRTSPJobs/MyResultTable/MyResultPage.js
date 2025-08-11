import React, { useState } from "react";
import { MyResultUIProvider } from "./MyResultUIContext";
import { MyResultCard } from "./MyResultCard";
import { MyResultViewDialog } from "./my-result-view-dialog/MyResultViewDialog";

export function MyResultPage({ history }) {
  const myResultPageBaseUrl = "/my-results";
  const [row, setRow] = useState({});
  const [show, setShow] = useState(false);

  const myResultUIEvents = {
    openViewMyResultBtnClick: (id, row, cameraName) => {
      row["camera_name"] = cameraName[parseInt(row.camera_id)];
      setRow(row);
      setShow(true);
    }
  };

  return (
    <MyResultUIProvider myResultUIEvents={myResultUIEvents}>
      {show && (
        <MyResultViewDialog
          row={row}
          show={show}
          id={row?._id?.$oid}
          onHide={() => {
            setShow(false);
            history.push(myResultPageBaseUrl);
          }}
        />
      )}
      <MyResultCard />
    </MyResultUIProvider>
  );
}
