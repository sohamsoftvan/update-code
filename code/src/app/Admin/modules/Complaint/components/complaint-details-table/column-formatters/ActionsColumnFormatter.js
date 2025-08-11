import React from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../../../../../_metronic/_helpers";

export function ActionsColumnFormatter(
    cellContent,
    row,
    rowIndex,
    {openViewComplaintImage}
) {
  return (
    <>
        {/*eslint-disable-next-line*/}
        <a
            title="Edit user"
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
            onClick={() => openViewComplaintImage(row.id)}
        >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG title="View Complaint Image" src={toAbsoluteUrl("/media/svg/icons/Code/Info-circle.svg")}/>
        </span>
        </a>
    </>
  );
}
