import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import { Box, Typography } from "@mui/material";
import "./Bar.scss";

interface iBar {
  pagename: string;
}
export default function Bar(props: iBar) {
  const barImage = useSelector((state: RootState) => state.themeReducer.barImage);
  return (
    <Box className="bar">
      <img alt="" src={barImage} height="250px" width="100%"/>
      <Typography className="page-name">{props.pagename}</Typography>
    </Box>
  );
}
