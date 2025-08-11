import React, { useEffect, useState } from "react";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import DeployedRTSPJobsCameraSetting from "./DeployedRTSPJobsCameraSetting";

export function DeployedRTSPJobsCameraSettingsDialog({ show, onHide,cameraModalData,deployedJobs}) {
    const [settings, setSettings] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [newSetting, setNewSetting] = useState({});
    const [rtspId, setRtspId] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
            if (cameraModalData) {
                setSettings(deployedJobs ?
                    cameraModalData.deployment_job_rtsp_details?.camera_settings : cameraModalData?.camera_settings || []
                );
                setRtspId(deployedJobs ? cameraModalData.deployment_job_rtsp_details?.id : cameraModalData?.id|| []);
            }
    }, [cameraModalData,deployedJobs]);

    const changeCameraSettingStatus = () => {
        // updateCameraSettingRTSPStatus(newSetting.id, newSetting.status)
        //     .then(response => {
        //         if (response && response.isSuccess) {
        //             dispatch(actions.fetchDeployedRTSPJobs()).then(() =>
        //                 setIsSuccess(true)
        //             );
        //             setTimeout(() => {
        //                 setShowAlert(false);
        //                 setIsSuccess(false);
        //             }, 800);
        //         } else {
        //             throw new Error("Error while updating camera settings for this job");
        //         }
        //     })
        //     .catch(error => {
        //         warningToast("Something went wrong");
        //     });
    };

    const ShowAlertForSetting = (id, status) => {
        setNewSetting({ id, status });
        setShowAlert(true);
    };

    return (

        <CommonModal
            size="lg"
            show={show}
            handleClose={onHide}
            arialabelledby="example-modal-sizes-title-lg"
            title={`Job Camera Settings`}
            closeButtonFlag={true}
            applyButton={false}
            content={
               <>
                   <DeployedRTSPJobsCameraSetting
                       onHide={onHide}
                       isSuccess={isSuccess}
                       setShowAlert={setShowAlert}
                       showAlert={showAlert}
                       setIsSuccess={setIsSuccess}
                       changeCameraSettingStatus={changeCameraSettingStatus}
                       ShowAlertForSetting={ShowAlertForSetting}
                       rtspId={rtspId}
                       settings={settings}
                   />
               </>
            }
        />



    );
}
