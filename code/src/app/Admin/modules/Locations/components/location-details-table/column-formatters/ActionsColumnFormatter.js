import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";
import CustomizedSwitch from "../../../../../../../utils/SuperAdmin/CustomizedSwitch";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditLocationDialog, changeLocationStatus }
) {

  return (
    <>
      {/*eslint-disable-next-line*/}
      <a
        title="Edit user"
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => openEditLocationDialog(row.id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            title="Edit Location Details"
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>

        <CustomizedSwitch
            checked={row.status}
            onChange={() => changeLocationStatus(row)}
            color={"primary"}
            className={"cursor-pointer"}
            name={'locationStatus'}
        />
    </>
  );
}
