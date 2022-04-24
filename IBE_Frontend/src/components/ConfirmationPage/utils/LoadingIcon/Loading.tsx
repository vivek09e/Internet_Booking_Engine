import { Box, CircularProgress } from "@mui/material";
import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <Box className="circular-progress">
      <CircularProgress />
    </Box>
  );
};

export default Loading;
