import React from 'react';
import {Box} from "@mui/material";
import CustomizedButtons from "./CustomizedButtons";

const StepNavigation = ({ activeStep, onBack, onNext, onFinish, stepsCount }) => {
  return (
    <Box className={"mt-2 mb-4"} style={{ display: "flex", justifyContent: "flex-end"}}>
      {/* Render a spacer if there is no 'Previous' button */}
      {activeStep === 0 ? <Box style={{ flex: 1 }} /> : null}
      {activeStep > 0 && (
          <CustomizedButtons submit={onBack} title={"Previous"} className={"mr-1"} color={"secondary"}/>
      )}

      {activeStep < stepsCount - 1 ? (
              <CustomizedButtons submit={onNext} title={"Next"} className={"mr-2"} color={"primary"}/>
      ) : (
          <CustomizedButtons submit={onFinish} title={"Finish"} className={"mr-2"} color={"primary"}/>
      )}
    </Box>
  );
};

export default StepNavigation;
