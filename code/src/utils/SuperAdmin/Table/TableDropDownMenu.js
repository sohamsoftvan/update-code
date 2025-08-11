import React from "react";

import EditIcon from '@mui/icons-material/Edit';
import {Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {CloudUpload} from "@mui/icons-material";

function TableDropDownMenu({
                               editFlag,
                               editName,
                               editModalDataTable,
                               deleteFlag,
                               deleteName,
                               deleteModalDataTable,
                               infoFlag, infoName, infoModalDataTable,
                               cameraFlag, cameraModalDataTable, cameraName,uploadModal,uploadFrame,uploadName,
                           }) {

    return (
        <>
            <div className={"d-flex"}>



                {infoFlag && (
                    <Tooltip title={<div>{infoName}</div>} placement={"top"}>
                        <InfoIcon
                            className={"cursor-pointer mr-2"}
                            onClick={infoModalDataTable}
                            style={{fontSize: "20px"}}
                        />
                    </Tooltip>
                )}
                {editFlag && (
                    <Tooltip title={<div>{editName}</div>} placement="top">
                        <EditIcon
                            className={"cursor-pointer mr-2"}
                            onClick={editModalDataTable}
                            style={{fontSize: "20px"}}
                        />
                    </Tooltip>
                )}

                {deleteFlag && (
                    <Tooltip title={<div>{deleteName}</div>} placement={"top"}>
                        <DeleteIcon
                            className={"cursor-pointer mr-2"}
                            onClick={deleteModalDataTable}
                            style={{fontSize: "20px"}}
                        />
                    </Tooltip>
                )}
                {cameraFlag && (
                    <Tooltip title={<div>{cameraName}</div>} placement={"top"}>
                        <CameraAltIcon
                            className={"cursor-pointer mr-2"}
                            onClick={cameraModalDataTable}
                            style={{fontSize: "20px"}}
                        />
                    </Tooltip>
                )}
                {uploadFrame && (<Tooltip title={<div>{uploadName}</div>} placement={"top"}>
                    <CloudUpload
                        className={"cursor-pointer mr-2"}
                        onClick={uploadModal}
                        style={{ fontSize: "26px" }}
                    />
                </Tooltip>)}



            </div>
        </>
    );
}

export default TableDropDownMenu;
