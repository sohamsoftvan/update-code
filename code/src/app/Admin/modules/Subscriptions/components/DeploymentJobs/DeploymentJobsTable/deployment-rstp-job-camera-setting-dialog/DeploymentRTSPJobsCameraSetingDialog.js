import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateCameraSettingRTSPStatus } from "../../../../_redux/DeployedRTSPJobs/DeployedRTSPJobsSettingsAPI";
import DeployedRTSPJobsCameraSetting from "../../../../../Modal/DeployedRTSPJobsCameraSettingModal";
import CommonModal from "../../../../../../../../utils/SuperAdmin/CommonModal";
import {fireAlert} from "../../../../../../../../utils/SuperAdmin/SweetAlert";
import {FireAlertMessage} from "../../../../../../../../utils/SuperAdmin/enums/firAlert.enums";
import * as action from "../../../../_redux/DeploymentRTSPJobs/DeploymentRTSPJobsAction";

export function DeploymentRTSPJobsCameraSettingsDialog({ id, show, onHide }) {
  const dispatch = useDispatch();
  const { entities } = useSelector(
    state => ({
      entities: state.deploymentRTSPJobs.entities
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
        setSettings(rtspJob[0]?.camera_settings || []);
        setRtspId(rtspJob[0]?.id || []);
      }
    }
    // eslint-disable-next-line
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
                      dispatch(action.fetchDeploymentRTSPJobs());
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
