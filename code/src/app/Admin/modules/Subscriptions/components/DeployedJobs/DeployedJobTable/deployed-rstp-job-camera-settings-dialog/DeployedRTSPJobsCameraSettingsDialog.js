import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateCameraSettingRTSPStatus } from "../../../../_redux/DeployedRTSPJobs/DeployedRTSPJobsSettingsAPI";
import * as actions from "../../../../_redux/DeployedRTSPJobs/DeployedRTSPJobsAction";
import DeployedRTSPJobsCameraSetting from "../../../../../Modal/DeployedRTSPJobsCameraSettingModal";
import CommonModal from "../../../../../../../../utils/SuperAdmin/CommonModal";
import {fireAlert} from "../../../../../../../../utils/SuperAdmin/SweetAlert";
import {FireAlertMessage} from "../../../../../../../../utils/SuperAdmin/enums/firAlert.enums";

export function DeployedRTSPJobsCameraSettingsDialog({ id, show, onHide }) {
  const dispatch = useDispatch();
  const { entities } = useSelector(
    state => ({
      entities: state.deployedRTSPJobs.entities
    }),
    shallowEqual
  );

  const [settings, setSettings] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [newSetting, setNewSetting] = useState({});
  const [rtspId, setRtspId] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      const rtspJob = entities?.filter(job => job.id === id * 1);
      if (rtspJob?.length) {
        setSettings(
          rtspJob[0]?.deployment_job_rtsp_details?.camera_settings || []
        );
        setRtspId(rtspJob[0]?.deployment_job_rtsp_details?.id || []);
      }
    }
  }, [id, entities]);

  const changeCameraSettingStatus = () => {
    // updateCameraSettingRTSPStatus(newSetting.id, newSetting.status)
    //   .then(response => {
    //     if (response && response.isSuccess) {
    //       dispatch(actions.fetchDeployedRTSPJobs()).then(() =>
    //         setIsSuccess(true)
    //       );
    //       setTimeout(() => {
    //         setShowAlert(false);
    //         setIsSuccess(false);
    //       }, 800);
    //     } else {
    //       throw new Error("Error while updating camera settings for this job");
    //     }
    //   })
    //   .catch(error => {
    //     warningToast("Something went wrong");
    //   });
  };

  const ShowAlertForSetting = (row) => {


    fireAlert(row, FireAlertMessage?.statusChanges, () => {

      updateCameraSettingRTSPStatus(row.id, !row.status)
          .then(response => {
            if (response && response.isSuccess) {
              dispatch(actions.fetchDeployedRTSPJobs());
            } else {
              throw new Error("Error while updating camera settings for this job");
            }
          })
          .catch(error => {
            if (error.detail) {
              console.log("error.detail", error.detail);
            }
          });
    });

    // setNewSetting({ id, status });
    // setShowAlert(true);
  };

  return (

      <CommonModal
          size="lg"
          show={show}
          handleClose={() => onHide(false)}
          arialabelledby="example-modal-sizes-title-lg"
          title={"Job Camera Settings"}
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
