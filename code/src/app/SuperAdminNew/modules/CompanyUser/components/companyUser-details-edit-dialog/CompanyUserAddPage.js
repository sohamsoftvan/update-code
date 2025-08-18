import React, {useState} from 'react';
import {Box ,Typography} from "@mui/material";
import Sidebar from "../../../../../../utils/SuperAdmin/Sidebar";
import Addstep, {companySteps} from "../../../../../../utils/SuperAdmin/Addstep";
import StepNavigation from "../../../../../../utils/SuperAdmin/StepNavigation";
import GoBack from "../../../../../../utils/SuperAdmin/GoBack";
import {useNavigate} from "react-router-dom";
import {CompanyDetailsDialog} from "./CompanyDetailsDialog";
import {initialCompanyValues} from "../../../../../../utils/SuperAdmin/enums/CompanyOption";
import {UserSignUpDetailsDialog} from "./UserSignUpDetailsDialog";


function CompanyUserAddPage() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialCompanyValues);
  const [userFormData, setUserFormData] = useState({
    user_email: "",
    password: "",
    confirm_password: "",
  });
  const [deploymentRegions, setDeploymentRegions] = useState(null)

  const [errors, setErrors] = useState({});

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
  };


  const handleFinish = () => {
  }

  const steps = Addstep('company');

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
                steps={companySteps}
                lastSecondWord={'company'}
            />

            <Box
                style={{
                  flexGrow: 1,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "grey"
                }}
            >
              <Typography variant={"h4"} className={"ml-3 mt-2 mb-5"}>{Addstep('company')[activeStep]}</Typography>

              <Box className={"tusk_dataSources-scroll"}>
                <>
                  {Addstep('company')[activeStep] === 'Company Details' ? (
                      <>
                        <CompanyDetailsDialog
                            formData={formData}
                            errors={errors}
                            setErrors={setErrors}
                            setFormData={setFormData}
                            companyDetails={true}
                            deploymentRegions={deploymentRegions}
                            setDeploymentRegions={setDeploymentRegions}
                        />
                      </>
                  ) : Addstep('company')[activeStep] === 'User Details' &&(
                      <>
                        <UserSignUpDetailsDialog
                            formData={userFormData}
                            setFormData={setUserFormData}
                            errors={errors}
                            setErrors={setErrors}
                        />

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

export default CompanyUserAddPage;
