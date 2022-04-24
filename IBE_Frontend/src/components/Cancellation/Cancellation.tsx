import React, { useEffect } from "react";

import { Box, Button, Typography } from "@mui/material";
import "./Cancellation.scss";
import { ICancelInfo, postCancleInfo } from "../../redux/TravelerInfoSlice";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import Submited from "../ReviewPage/Review/Submited";
var CryptoJS = require("crypto-js");

//URL http://localhost:3000/cancel/?bookingId=1&guestId=3; 

export default function Cancellation() {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const handleKeep = () => {
    naviagate({
      pathname: "/",
    });
  };
  const cancelFlag:boolean= useSelector((state:RootState)=> state.travelerReducer.cancelFlag)
  useEffect(()=>{},[cancelFlag])

  const handleCancel = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    const bookingID = CryptoJS.AES.decrypt(
      params.bookingId.replaceAll(" ", "+"),
      process.env.REACT_APP_ENCRYPTION_KEY as string
    );

    const guestId = CryptoJS.AES.decrypt(
      params.guestId.replaceAll(" ", "+"),
      process.env.REACT_APP_ENCRYPTION_KEY as string
    );
    const originalBookingID = bookingID.toString(CryptoJS.enc.Utf8);
    const originalGuestID = guestId.toString(CryptoJS.enc.Utf8);
    const cancelIfo: ICancelInfo = {
      bookingId: +originalBookingID,
      guestId: +originalGuestID,
      reviewId: -1,
    };
    dispatch(postCancleInfo(cancelIfo));
    
  };
  return (
    <>
    {cancelFlag?((<Submited message="Your room has been cancelled!!"/>)):(
      <Box className="cancel-booking">
      <Box className="cancel-booking-box">
        <Typography>Are you sure you want to cancle your booking?</Typography>
        <Box className="cancel-choices">
          <Button variant="contained" onClick={handleKeep}>Keep this Booking</Button>
          <Button variant="contained" onClick={handleCancel}>
            Cancel this Booking
          </Button>
        </Box>
      </Box>
    </Box>
    )}
    </>

  );
}
