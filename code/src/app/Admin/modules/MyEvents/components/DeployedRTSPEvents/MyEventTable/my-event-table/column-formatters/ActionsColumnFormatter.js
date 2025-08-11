import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openViewMyEventDialog, filterEntities, cameraName }
) {
  return (
    <>
      {/*eslint-disable-next-line*/}
      <a
        title="Information"
        className="btn btn-icon btn-light btn-hover-light-inverse btn-sm mx-3"
        onClick={() =>
          openViewMyEventDialog(filterEntities[rowIndex], cameraName)
        }
      >
        <span className="svg-icon svg-icon-md svg-icon-light-inverse">
          <VisibilityIcon
            color={"action"}
            style={{ fontSize: "2rem", color: "#147b82" }}
          />
        </span>
      </a>
    </>
  );
}
