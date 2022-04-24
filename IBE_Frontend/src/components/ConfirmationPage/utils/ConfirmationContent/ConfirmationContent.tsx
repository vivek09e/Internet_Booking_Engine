import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/reduxStore";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import "./ConfirmationContent.scss";
import ConfirmationAccordion from "./ConfirmationAccordion/ConfirmationAccordion";
import {
  ICancelInfo,
  postCancleInfo,
} from "../../../../redux/TravelerInfoSlice";
import Submited from "../../../ReviewPage/Review/Submited";

interface IFlag {
  flag: boolean;
}
export default function ConfirmationContent(props: IFlag) {

  const dispatch = useDispatch();
 
  let arr: string[] = [];

  const navigate = useNavigate();
  const travelerCancelInfo: ICancelInfo = useSelector(
    (state: RootState) => state.travelerReducer.cancleInfo
  );
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //To handle the cancle room button condition
  const handleCancleRoom = () => {
    dispatch(postCancleInfo(travelerCancelInfo));
    
  };

  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  const confimationDetails = useSelector(
    (state: RootState) => state.confirmationPageSlice
  );

  return (
    <Box className="confirmation-outer-box">
      <Box className="room-details">
        <Box className="room-details-first">
          <Typography>
            Room {+confimationDetails.roomTypeDto.id - 30}:
            {confimationDetails.roomTypeDto.name}
          </Typography>{" "}
          <Typography className="guest-data">
            <PersonOutlineIcon className="person-icon" />
            {(confimationDetails.bookingDto.adultCount>0?(confimationDetails.bookingDto.adultCount + " Adults, "):"") +(confimationDetails.bookingDto.childCount>0?(confimationDetails.bookingDto.childCount + " Kids"):"")}
          </Typography>
        </Box>
      </Box>
      <Box className="room-details-second">
        <Box className="room-details-second-first">
          <Box>
            <img
              className="room-details-second-image"
              src={confimationDetails.roomTypeDto.imageUrl}
            />
          </Box>
          <Box className="room-details-second-second">
            <Box className="room-details-second-dates">
              <Box className="checkin-container">
                <Typography className="small-size">Check in</Typography>
                <Typography className="small-size">
                  {confimationDetails.bookingDto.checkInDate
                    .toString().slice(9,11)}
                </Typography>
                <Typography className="small-size">
                  { month[+confimationDetails.bookingDto.checkInDate
                    .toString().slice(6,8)]
                     + " " +
                    confimationDetails.bookingDto.checkInDate
                      .toString()
                      .slice(1, 5)}
                </Typography>
              </Box>
              <Box className="checkin-container">
                <Typography className="small-size">Check out</Typography>
                <Typography className="small-size">
                  {confimationDetails.bookingDto.checkOutDate
                    .toString()
                    .toString().slice(9,11)}
                </Typography>
                <Typography className="small-size">
                  {month[+confimationDetails.bookingDto.checkOutDate
                    .toString().slice(6,8)] + " " +
                    confimationDetails.bookingDto.checkOutDate
                      .toString()
                      .slice(1, 5)}
                </Typography>
              </Box>
            </Box>
            <Typography className="bold-text">
              {confimationDetails.promotionDto.promotion_title}
            </Typography>
            <Typography>
              {confimationDetails.promotionDto.promotion_description}
            </Typography>
            <Typography className="terms">
              Cancellations made 7 days or more in advance of the event date,
              will receive a 100% refund.
            </Typography>
          </Box>
        </Box>
        <Box className="room-details-second-last">
          <Button className="remove-button" onClick={handleClickOpen}>
            Cancle Room
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to cancle your booking?"}
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                No
              </Button>
              <Button onClick={handleCancleRoom}>Yes</Button>
            </DialogActions>
          </Dialog>
          <Typography>
            ${Math.round(confimationDetails.bookingDto.totalCost)}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <ConfirmationAccordion flag={props.flag} />
    </Box>
  );
}
