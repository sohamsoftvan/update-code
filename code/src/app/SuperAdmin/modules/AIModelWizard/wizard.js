import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../../../scss/components/_forms-wizard.scss";
import { warningToast } from "../../../../utils/ToastMessage";
import { ToastContainer } from "react-toastify";
import { saveAIModelData } from "../AIModel/_redux/AiModelAction";
import { saveS3DataHandlerData } from "./_redux/S3DataHandler/S3DataHandlerAction";
import { saveTrainingSettingsData } from "./_redux/TrainingSettings/TrainingSettingsAction";
import { saveModelBannerImageData } from "./_redux/ModelBannerImage/ModeBannerImageAction";
import { saveModelResultImageData } from "./_redux/ModelResultImage/ModelResultImageAction";
import CustomizedButtons from "../../../../utils/SuperAdmin/CustomizedButtons";

const getNavStates = (indx, length) => {
  let styles = [];
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push("done");
    } else if (i === indx) {
      styles.push("doing");
    } else {
      styles.push("todo");
    }
  }
  return { current: indx, styles: styles };
};

const checkNavState = (currentStep, stepsLength) => {
  if (currentStep > 0 && currentStep < stepsLength - 1) {
    return {
      showPreviousBtn: true,
      showNextBtn: true,
      showSaveBtn: false
    };
  } else if (currentStep === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true,
      showSaveBtn: false
    };
  } else if (currentStep === stepsLength - 1) {
    return {
      showPreviousBtn: true,
      showNextBtn: false,
      showSaveBtn: true
    };
  } else {
    return {
      showPreviousBtn: true,
      showNextBtn: false,
      showSaveBtn: false
    };
  }
};

function AIModelMultiStepWizard(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    showPreviousBtn: false,
    showNextBtn: true,
    compState: 0,
    navState: getNavStates(0, props.steps.length),
    showSaveBtn: false,
    temp: true
  });

  const setNavState = (next) => {
    setState(prevState => ({
      ...prevState,
      navState: getNavStates(next, props.steps.length),
      compState: next < props.steps.length ? next : prevState.compState,
      ...checkNavState(next, props.steps.length)
    }));
  };

  const isNextPageRequest = (curPage, newPage) => {
    return curPage < newPage;
  };

  const isValid1Data = () => {
    let aiModelFormData = props.aiModel.aiModelFormData;

    if (aiModelFormData === "") {
      warningToast("Please Fill the Form");
      return false;
    }
    if (aiModelFormData["modelName"] === "") {
      warningToast("Please Enter Model Name");
      return false;
    }
    if (aiModelFormData["modelDescription"] === "") {
      warningToast("Please Enter Model Description");
      return false;
    }
    if (aiModelFormData["modelCpuInferSpeed"] === "") {
      warningToast("Please Enter Model CPU Infer Speed");
      return false;
    }
    if (aiModelFormData["modelGpuInferSpeed"] === "") {
      warningToast("Please Enter Model GPU Infer Speed");
      return false;
    }
    if (aiModelFormData["modelVersionId"] === "") {
      warningToast("Please Enter Model Version Id");
      return false;
    }
    if (aiModelFormData["modelAccuracy"] === "") {
      warningToast("Please Enter Model Accuracy");
      return false;
    }
    if (aiModelFormData["frameworkVersionNumber"] === "") {
      warningToast("Please Enter Framework Version Number");
      return false;
    }
    if (aiModelFormData["modelTypeId"] === "") {
      warningToast("Please Select Model Type");
      return false;
    }
    if (aiModelFormData["modelDeviceId"] === "") {
      warningToast("Please Select Device");
      return false;
    }
    if (aiModelFormData["modelSize"] === "") {
      warningToast("Please Enter Model Size");
      return false;
    }
    if (aiModelFormData["modelDepth"] === "") {
      warningToast("Please Enter Model Depth");
      return false;
    }
    if (aiModelFormData["modelFrameworkId"] === "") {
      warningToast("Please Select Framework");
      return false;
    }
    return true;
  };

  const isValid2Data = () => {
    let s3DataHandlerFormData = props.s3DataHandler.s3DataHandlerFormData;

    if (s3DataHandlerFormData === "") {
      warningToast("Please Fill the Form");
      return false;
    }
    if (s3DataHandlerFormData["modelS3Url"] === "") {
      warningToast("Please Enter Model S3 URL");
      return false;
    }
    if (s3DataHandlerFormData["model_s3modelS3Key_key"] === "") {
      warningToast("Please Enter Model S3 Key");
      return false;
    }
    if (s3DataHandlerFormData["modelS3Name"] === "") {
      warningToast("Please Enter S3 Name");
      return false;
    }
    if (s3DataHandlerFormData["modelVersion"] === "") {
      warningToast("Please Enter Model Version");
      return false;
    }

    return true;
  };

  const isValid3Data = () => {
    let trainingSettingsFormData = props.trainingSettings.trainingSettingsFormData;

    if (trainingSettingsFormData === "") {
      warningToast("Please Fill the Form");
      return false;
    }
    if (trainingSettingsFormData["imageSize"] === "") {
      warningToast("Please Enter Image Size");
      return false;
    }
    if (trainingSettingsFormData["modelTrainingBatchSize"] === "") {
      warningToast("Please Enter Model Training Batch Size");
      return false;
    }
    if (trainingSettingsFormData["batchSize"] === "") {
      warningToast("Please Enter Batch Size");
      return false;
    }
    if (trainingSettingsFormData["modelEpochs"] === "") {
      warningToast("Please Enter Model  Epochs");
      return false;
    }
    if (trainingSettingsFormData["modelLabelsList"] === "") {
      warningToast("Please Enter Model Labels List");
      return false;
    }

    return true;
  };

  const isValid4Data = () => {
    let modelResultImageFormData = props.modelResultImage.modelResultImageFormData;

    if (modelResultImageFormData === "") {
      warningToast("Please Fill the Form");
      return false;
    }
    if (!modelResultImageFormData["image"]) {
      warningToast("Please Choose Image");
      return false;
    }

    return true;
  };

  const isValid5Data = () => {
    let modelBannerImageFormData = props.modelBannerImage.modelBannerImageFormData;

    if (modelBannerImageFormData === "") {
      warningToast("Please Fill the Form");
      return false;
    }

    if (!modelBannerImageFormData["image"]) {
      warningToast("Please Choose Image");
      return false;
    }

    return true;
  };

  const isValidData = (curPage, newPage) => {
    if (isNextPageRequest(curPage, newPage)) {
      if (curPage === 0 && isValid1Data()) {
        return true;
      }
      if (curPage === 1 && isValid2Data()) {
        return true;
      }
      if (curPage === 2 && isValid3Data()) {
        return true;
      }
      if (curPage === 3 && isValid4Data()) {
        return true;
      }
      if (curPage === 4 && isValid5Data()) {
        return true;
      }
      if (newPage > curPage + 1) {
        warningToast("Can not Jump without selecting previous Selection");
        return false;
      }
      return false;
    }
    return true;
  };

  const handleOnClick = (evt) => {
    if (isValidData(state.compState, evt.currentTarget.value)) {
      if (
        evt.currentTarget.value === props.steps.length - 1 &&
        state.compState === props.steps.length - 1
      ) {
        setNavState(props.steps.length);
      } else {
        setNavState(evt.currentTarget.value);
      }
    }
  };

  useEffect(() => {
    if (props.aiModel.aiModelCreatedData && state.temp) {
      setState(prevState => ({ ...prevState, temp: false }));
      remaing4API(props.aiModel.aiModelCreatedData);
    }
  }, [props.aiModel.aiModelCreatedData, state.temp]);

  useEffect(() => {
    if (props.modelBannerImage.apicalled) {
      const origin = window.location.origin;
      window.location.replace(origin.concat("/aiModel/view/modelData"));
    }
  }, [props.modelBannerImage.apicalled]);

  const remaing4API = (response) => {
    setTimeout(() => {
      props.saveS3DataHandlerData(
        { ...props.s3DataHandler.s3DataHandlerFormData },
        response.data.id
      );
    }, 1000);
    setTimeout(() => {
      props.saveTrainingSettingsData(
        { ...props.trainingSettings.trainingSettingsFormData },
        response.data.id
      );
    }, 2000);
    setTimeout(() => {
      props.saveModelResultImageData(
        { ...props.modelResultImage.modelResultImageFormData },
        response.data.id
      );
    }, 3000);
    setTimeout(() => {
      props.saveModelBannerImageData(
        { ...props.modelBannerImage.modelBannerImageFormData },
        response.data.id
      );
    }, 4000);
  };

  const save = (evt) => {
    if (isValid5Data()) {
      props.saveAIModelData({ ...props.aiModel.aiModelFormData });
    }
  };

  const next = () => {
    if (isValidData(state.compState, state.compState + 1))
      setNavState(state.compState + 1);
  };

  const previous = () => {
    if (state.compState > 0) {
      setNavState(state.compState - 1);
    }
  };

  const getClassName = (className, i) => {
    return className + "-" + state.navState.styles[i];
  };

  const renderSteps = () => {
    return props.steps.map((s, i) => (
      <li
        className={getClassName("form-wizard-step", i)}
        onClick={handleOnClick}
        key={i}
        value={i}
      >
        <em>{i + 1}</em>
        <span style={{ fontSize: "1.2rem" }}>{props.steps[i].name}</span>
      </li>
    ));
  };

  return (
    <div>
      <ol className="forms-wizard">{renderSteps()}</ol>
      {props.steps[state.compState].component}
      <div className="divider" />
      <div className="clearfix">
        <div style={props.showNavigation ? {} : { display: "none" }}>
          <CustomizedButtons
            submit={previous}
            title={"Previous"}
            color={"primary"}
            className={"btn-shadow float-left"}
            style={{ display: state.showPreviousBtn ? {} : { display: "none" }}}
          />
          {state.showNextBtn ? (
            <CustomizedButtons
              submit={next}
              title={"Next"}
              color={"primary"}
              className={"btn-shadow float-right"}
            />
          ) : (
            <div></div>
          )}
          {state.showSaveBtn ? (
            <CustomizedButtons
              submit={save}
              title={"Save"}
              color={"success"}
              className={"btn-shadow float-right"}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const mapStateToProps = state => ({
  aiModel: state.aiModel,
  s3DataHandler: state.s3DataHandler,
  trainingSettings: state.trainingSettings,
  modelBannerImage: state.modelBannerImage,
  modelResultImage: state.modelResultImage
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveAIModelData: aiModelData => {
      dispatch(saveAIModelData(aiModelData));
    },
    saveS3DataHandlerData: (s3DataHandlerData, id) => {
      dispatch(saveS3DataHandlerData(s3DataHandlerData, id));
    },
    saveTrainingSettingsData: (trainingSettingsData, id) => {
      dispatch(saveTrainingSettingsData(trainingSettingsData, id));
    },
    saveModelBannerImageData: (modelBannerImageData, id) => {
      dispatch(saveModelBannerImageData(modelBannerImageData, id));
    },
    saveModelResultImageData: (modelResultImageData, id) => {
      dispatch(saveModelResultImageData(modelResultImageData, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AIModelMultiStepWizard);
