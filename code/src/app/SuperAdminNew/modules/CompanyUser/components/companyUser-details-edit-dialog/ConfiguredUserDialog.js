import React, {useEffect, useState} from 'react';
import {Box ,Typography} from "@mui/material";
import Sidebar from "../../../../../../utils/SuperAdmin/Sidebar";
import Addstep, {configureSteps} from "../../../../../../utils/SuperAdmin/Addstep";
import StepNavigation from "../../../../../../utils/SuperAdmin/StepNavigation";
import GoBack from "../../../../../../utils/SuperAdmin/GoBack";
import {useNavigate} from "react-router-dom";
import {AllDeployedJobsData, AllLocationOption} from "../../../../../../utils/SuperAdmin/enums/CompanyOption";
import DeployedRTSPJobsCameraDialog from "./DeployedRTSPJobsCameraDialog";
import AddLocationDialog from "./AddLocationDialog";


function ConfiguredUserDialog() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const [deployedModelOptions, setDeployedModelOptions] = useState([]);
  const [selectedDeployedModel, setSelectedDeployedModel] = useState(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setDeployedModelOptions(AllDeployedJobsData.map(data => ({
      value: data?.deployment_job_rtsp_details?.model_details?.id,
      label: data?.deployment_job_rtsp_details?.model_details?.model_name
    })))
  }, [AllDeployedJobsData]);
  const handleBackMainPage = () => {
    navigate("/company/company-user");
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleNext = () => {
    if (activeStep === 0) {
      console.log("Api call in Company Details")
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
    if (activeStep === 1) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
    if (activeStep === 2) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }


  };
  const validateField = (name, value) => {
    let msg = "";
    if (!value) {
      msg = `${name.replace(/_/g, " ")} is required`;
    }
    setErrors((prev) => ({...prev, [name]: msg}));
    return msg;
  };

  const handleFinish = () => {

  }

  const handleDeployedModelChange = (selected) => {
    const value = selected?.value || "";
    setSelectedDeployedModel(selected)
    validateField("deployed_model", value);
  }
  const steps = Addstep('configure');

  return (
      <>
        <Box
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "grey"
            }}
        >
          <Box style={{alignSelf: "flex-start"}}>
            <GoBack onBack={handleBackMainPage}/>
          </Box>

          <Box style={{display: "flex"}}>
            <Sidebar
                activeStep={activeStep}
                steps={configureSteps}
                lastSecondWord={'configure'}
            />

            <Box
                style={{
                  flexGrow: 1,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "grey"
                }}
            >
              <Typography variant={"h4"}
                          className={"ml-3 mt-2 mb-5"}>{Addstep('configure')[activeStep]}</Typography>

              <Box className={"tusk_dataSources-scroll"}>
                <>
                  {Addstep('configure')[activeStep] === 'Location' ? (
                      <>
                        <AddLocationDialog cameraModalData={AllLocationOption}/>
                      </>
                  ) : Addstep('configure')[activeStep] === 'Camera' && (
                      <>
                        <DeployedRTSPJobsCameraDialog deployedModelOptions={deployedModelOptions}
                                                      handleDeployedModelChange={handleDeployedModelChange}
                                                      cameraModalData={AllDeployedJobsData[0]}
                                                      selectedDeployedModel={selectedDeployedModel}/>
                      </>
                  )}

                </>
              </Box>

              <StepNavigation
                  activeStep={activeStep}
                  stepsCount={steps.length}
                  onBack={handleBack}
                  onNext={handleNext}
                  onFinish={handleFinish}
              />
            </Box>

          </Box>

        </Box>
      </>
  );
}

export default ConfiguredUserDialog;
