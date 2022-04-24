import React, { FC } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Submited.scss";
import { useDispatch } from "react-redux";
import travelerInfoSlice from "../../../redux/TravelerInfoSlice";

interface ISubmit {
  message: string;
}

const Submited: FC<ISubmit> = (props) => {
  const naviagate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(travelerInfoSlice.actions.updateCancelFlag(false));
    naviagate({
      pathname: "/",
    });
  };
  return (
    <Box className="review-submitted">
      <Typography className="review-text" variant="h3">
        <CheckCircleIcon fontSize="large" className="circular-icon" />
        {props.message}
      </Typography>
      <Button
        variant="contained"
        className="book-another"
        onClick={handleClick}
      >
        Book Another Trip!
      </Button>
    </Box>
  );
};

export default Submited;
