/* eslint-disable */
import React, {Fragment, useEffect, useState} from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CustomizedButtons from "../../../../../../utils/SuperAdmin/CustomizedButtons";
import CustomizedSwitch from "../../../../../../utils/SuperAdmin/CustomizedSwitch";
import {AddDeployedRTSPJobsCameraDialog} from "./AddDeployedRTSPJobsCameraDialog";
import ReactSelectDropDownCommon from "../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import {fireAlert} from "../../../../../../utils/SuperAdmin/SweetAlert";
import {FireAlertMessage} from "../../../../../../utils/SuperAdmin/enums/firAlert.enums";

const DeployedRTSPJobsCameraDialog = ({cameraModalData, selectedDeployedModel,deployedModelOptions,handleDeployedModelChange}) => {
    const [cameraSettings, setCameraSettings] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const [settings, setSettings] = useState([]);
    const [rtspId, setRtspId] = useState({});

    useEffect(() => {
        if (cameraModalData) {
            setSettings(
                cameraModalData.deployment_job_rtsp_details?.camera_settings || []
            );
            setRtspId(cameraModalData.deployment_job_rtsp_details?.id || []);
        }
    }, [cameraModalData]);


    const handleSwitchChange = (setting) => {
        fireAlert(
            setting, // row (you can pass the whole setting object)
            FireAlertMessage?.statusChanges,
            (id) => {
                // This is the deleteCallback, but you can use it for your status update
                // Call your API or logic to update the status here
                // Return a promise!
                // return updateCameraStatus(id, !setting.status); // You need to implement this function
            },
            () => {
                // This is the getCallback, called after status update
                // Refresh your data here, e.g., refetch cameraModalData
                // fetchCameraData(); // You need to implement this function
            }
        );
    };
    const toogleCameraModal = () => {
        setModalOpen(false);
    }

    const openAddModal = () => {
        setCameraSettings([]);
        setModalOpen(true)
    }


    return (
        <Fragment>
            <div className={"d-flex justify-content-between align-items-center mb-3"} style={{marginBottom: "1rem"}}>
                <ReactSelectDropDownCommon
                    isSearchable={true}
                    className={"w-50"}
                    placeholder="Select Deployed Model"
                    options={deployedModelOptions}
                    value={selectedDeployedModel}
                    onChange={handleDeployedModelChange}
                />
                <CustomizedButtons
                    size={"medium"}
                    color={"secondary"}
                    title={"Add new camera"}
                    flag={false}
                    submit={openAddModal}
                    className={"mb-4 mt-3 float-right"}
                />
            </div>
            {!settings.length  ? (
                <div className="row col-12 view-title">
                    <span className="w-100 font-weight-bold">No Cameras Found!</span>
                </div>
            ) :
            settings.map((setting, index) => (
                <Fragment key={setting?.id || index}>
                    <div className="row col-12 view-title">
                        <span className="w-100 font-weight-bold">
                            Camera {index + 1} Details
                        </span>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
                            <span>
                                <b>Camera IP</b>
                            </span>
                        </div>
                        <div className="col col-md-6">{setting?.camera_ip}</div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
                            <span>
                                <b>Camera Name</b>
                            </span>
                        </div>
                        <div className="col col-md-6">{setting?.camera_name}</div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
                            <span>
                                <b>Camera Resolution</b>
                            </span>
                        </div>
                        <div className="col col-md-6">{setting?.camera_resolution}</div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
                            <span>
                                <b>Process FPS</b>
                            </span>
                        </div>
                        <div className="col col-md-6">{setting?.process_fps}</div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
                            <span>
                                <b>RTSP URL</b>
                            </span>
                        </div>
                        <div className="col col-md-6">
                            <a style={{wordBreak: "break-all"}} href={setting?.rtsp_url}>
                                {setting?.rtsp_url}
                            </a>
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
                            <span>
                                <b>Is Active</b>
                            </span>
                        </div>
                        <div className="col col-md-6">
                            {setting?.is_active ? (
                                <CheckIcon color={"primary"} style={{fontSize: "2rem"}}/>
                            ) : (
                                <ClearIcon color={"error"} style={{fontSize: "2rem"}}/>
                            )}
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
                            <span>
                                <b>Is Processing</b>
                            </span>
                        </div>
                        <div className="col col-md-6">
                            {setting?.is_processing ? (
                                <CheckIcon color={"primary"} style={{fontSize: "2rem"}}/>
                            ) : (
                                <ClearIcon color={"error"} style={{fontSize: "2rem"}}/>
                            )}
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
                            <span>
                                <b>Is TCP</b>
                            </span>
                        </div>
                        <div className="col col-md-6">
                            {setting?.is_tcp ? (
                                <CheckIcon color={"primary"} style={{fontSize: "2rem"}}/>
                            ) : (
                                <ClearIcon color={"error"} style={{fontSize: "2rem"}}/>
                            )}
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
                            <span>
                                <b>Status</b>
                            </span>
                        </div>
                        <CustomizedSwitch
                            checked={setting?.status}
                            onChange={() => handleSwitchChange(setting)}
                            color={"primary"}
                            className={"cursor-pointer"}
                        />
                    </div>
                </Fragment>
            ))}

            <AddDeployedRTSPJobsCameraDialog
                onHide={toogleCameraModal}
                isUpdate={isUpdate}
                toogleCameraModal={toogleCameraModal}
                modalOpen={modalOpen}
                cameraSettings={cameraSettings}
                rtspId={rtspId}
            />
        </Fragment>
    );
};

export default DeployedRTSPJobsCameraDialog;
