import React from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../../../../../../../_metronic/_helpers";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";

export function ActionsColumnFormatter(
    cellContent,
    row,
    rowIndex,
    {openViewDeploymentJobDialog, openViewDeploymentRTSPJobDialog,  openViewCameraSettingsDialog,}
) {
    return (
        <>
            {/*eslint-disable-next-line*/}
            <a
                className="btn btn-icon btn-light btn-hover-light-inverse btn-sm mx-3"
                onClick={() => row.isRTSP ? openViewDeploymentRTSPJobDialog(row.id) : openViewDeploymentJobDialog(row.id)}
            >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                  <SVG title="Deployment Information" src={toAbsoluteUrl("/media/svg/icons/Code/Info-circle.svg")}/>
                </span>
            </a>
            {row.isRTSP && (
                // eslint-disable-next-line
                <a
                    title="Open Camera Settings"
                    className="btn btn-icon btn-light btn-hover-light-inverse btn-sm"
                    onClick={() => openViewCameraSettingsDialog(row.id)}
                >
          <span
              title="Open Camera Settings"
              className="svg-icon svg-icon-md svg-icon-light-inverse"
              style={{ color: "#147b82" }}
          >
            <CameraEnhanceIcon />
          </span>
                </a>
            )}
        </>
    );
}
