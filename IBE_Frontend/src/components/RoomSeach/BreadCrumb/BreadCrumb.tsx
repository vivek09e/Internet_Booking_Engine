import React from "react";

import { useTranslation } from "react-i18next";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import './BreadCrumb.scss';

interface IActiveSteps{
  activeSteps:number
}
function Breadcrumb(props:IActiveSteps) {
  const { t } = useTranslation();
  const steps = [
    t("Search"),
    t("Choose Room"),
    t("Choose Addon"),
    t("Checkout"),
  ];
  
  return (
    <Box className="progress-tracker">
      <Stepper alternativeLabel activeStep={props.activeSteps}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel className="stepper-label">{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default Breadcrumb;
