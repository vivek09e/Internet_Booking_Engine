import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStore";

import { Box, Typography } from "@mui/material";
import "./NeedHelp.scss";

export default function NeedHelp() {
  var propertyInfo = useSelector((state: RootState) => state.propertiesReducer);
  return (
    <Box className="need-help">
      <Box className="need-help-container">
        <Typography className="bold-text">Need Help</Typography>
        <Typography>Call {propertyInfo.property.number}</Typography>
        <Typography>{propertyInfo.property.callTiming}</Typography>
      </Box>
    </Box>
  );
}
