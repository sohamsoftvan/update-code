/* eslint-disable */
import React, { Fragment, useState} from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CustomizedButtons from "../../../../../../utils/SuperAdmin/CustomizedButtons";
import CustomizedSwitch from "../../../../../../utils/SuperAdmin/CustomizedSwitch";
import AddDeployedRTSPJobsCamera from "./AddDeployedRTSPJobsCamera";

const DeployedRTSPJobsCameraSetting = ({
    settings = [],
    rtspId,
    isSuccess,
    ShowAlertForSetting,
    changeCameraSettingStatus,
    setShowAlert,
    showAlert,
    onHide
}) => {
    const [cameraSettings, setCameraSettings] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const toogleCameraModal = () => {
        setModalOpen(prev => {
            const newModalOpen = !prev;
            if (!newModalOpen) {
                setIsUpdate(false);
            }
            return newModalOpen;
        });
    }

    const openAddModal = () => {
        setCameraSettings([]);
        setIsUpdate(false);
        toogleCameraModal();
    }

    const openAddUpdateModal = (settings) => {
        setCameraSettings(settings);
        setIsUpdate(true);
        toogleCameraModal();
    }

    return (
        <Fragment>
            <div>
                <CustomizedButtons
                    size={"medium"}
                    color={"secondary"}
                    title={"Add new camera"}
                    flag={false}
                    submit={openAddModal}
                    className={"mb-4 mt-3 float-right"}
                />
            </div>
            {!settings.length ? (
                <div className="row col-12 view-title">
                    <span className="w-100 font-weight-bold">No Cameras Found!</span>
                </div>
            ) : null}
            {settings.map((setting, index) => (
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
                            <a style={{ wordBreak: "break-all" }} href={setting?.rtsp_url}>
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
                                <CheckIcon color={"primary"} style={{ fontSize: "2rem" }} />
                            ) : (
                                <ClearIcon color={"error"} style={{ fontSize: "2rem" }} />
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
                                <CheckIcon color={"primary"} style={{ fontSize: "2rem" }} />
                            ) : (
                                <ClearIcon color={"error"} style={{ fontSize: "2rem" }} />
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
                                <CheckIcon color={"primary"} style={{ fontSize: "2rem" }} />
                            ) : (
                                <ClearIcon color={"error"} style={{ fontSize: "2rem" }} />
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
                            onChange={() =>
                                ShowAlertForSetting(setting?.id, !setting?.status)}
                            color={"primary"}
                            className={"cursor-pointer"}
                        />
                    </div>
                    <div>
                        <CustomizedButtons
                            size={"medium"}
                            color={"secondary"}
                            title={"Update settings"}
                            flag={false}
                            submit={() => openAddUpdateModal(setting)}
                            className={"mb-4 mt-3 float-right"}
                        />
                    </div>
                    <SweetAlert
                        info={!isSuccess}
                        success={isSuccess}
                        showCancel={!isSuccess}
                        showConfirm={!isSuccess}
                        confirmBtnText="Confirm"
                        confirmBtnBsStyle="primary"
                        cancelBtnBsStyle="light"
                        cancelBtnStyle={{ color: "black" }}
                        title={
                            isSuccess
                                ? "Status Changed Successfully"
                                : "Are you sure ? to Change the Status"
                        }
                        onConfirm={changeCameraSettingStatus}
                        onCancel={() => setShowAlert(false)}
                        show={showAlert}
                        focusCancelBtn
                    />
                </Fragment>
            ))}
            
            <AddDeployedRTSPJobsCamera
                onHide={onHide}
                isUpdate={isUpdate}
                toogleCameraModal={toogleCameraModal}
                modalOpen={modalOpen}
                cameraSettings={cameraSettings}
                rtspId={rtspId}
            />
        </Fragment>
    );
};

export default DeployedRTSPJobsCameraSetting;
