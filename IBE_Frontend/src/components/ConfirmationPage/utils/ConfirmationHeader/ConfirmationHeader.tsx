import React, { useEffect } from "react";
import { RootState } from "../../../../redux/reduxStore";
import ConfirmationContent from "../ConfirmationContent/ConfirmationContent";

import { useRef } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import emailjs from "emailjs-com";
import { getConfirmationPageData } from "../../../../redux/ConfirmationPageSlice";

import { Box, Button, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import "./ConfimationHeader.scss";
import TripItinerary from "../../../Checkout/TripItinerary/TripItinerary";
import { ICancelInfo } from "../../../../redux/TravelerInfoSlice";
import Submited from "../../../ReviewPage/Review/Submited";

export default function ConfirmationHeader() {
  const [open, setOpen] = React.useState(false);

  const CancelInfo: ICancelInfo = useSelector(
    (state: RootState) => state.travelerReducer.cancleInfo
  );
  const cancelFlag: boolean = useSelector(
    (state: RootState) => state.travelerReducer.cancelFlag
  );

  useEffect(() => {}, [cancelFlag]);
  var CryptoJS = require("crypto-js");

  const travelerData = useSelector(
    (state: RootState) => state.confirmationPageSlice.travelerInfoDto
  );

  const roomData = useSelector(
    (state: RootState) => state.confirmationPageSlice.roomTypeDto
  );

  const onComplete = () => {
    var encodedBookingId: string = CryptoJS.AES.encrypt(
      CancelInfo.bookingId.toString(),
      process.env.REACT_APP_ENCRYPTION_KEY as string
    ).toString();
    var encodedGuestID: string = CryptoJS.AES.encrypt(
      CancelInfo.guestId.toString(),
      process.env.REACT_APP_ENCRYPTION_KEY as string
    ).toString();
    var encodedReviewID: string = CryptoJS.AES.encrypt(
      CancelInfo.reviewId.toString(),
      process.env.REACT_APP_ENCRYPTION_KEY as string
    ).toString();

    const cancelURL: string =
      `${process.env.REACT_APP_CLOUDFRONT_URL}/cancel/` +
      "?bookingId=" +
      encodedBookingId +
      "&guestId=" +
      encodedGuestID;

    const reveiwUrl: string =
      `${process.env.REACT_APP_CLOUDFRONT_URL}` +
      "/review?reviewId=" +
      encodedReviewID;

    setOpen(true);
    let date: string[] = JSON.parse(Cookies.get("Dates") ?? " ");
    let checkinDate: string =
      date[0].substring(8, 10) +
      "-" +
      date[0].substring(5, 7) +
      "-" +
      date[0].substring(0, 4);
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID as string,
        process.env.REACT_APP_TEMPLATE_ID as string,
        {
          subject:
            "You’re booked! Pack your bags – see you on " + checkinDate + " !",
          name: travelerData.firstName + " " + travelerData.lastName,
          Booking_date: checkinDate,
          location: roomData.name,
          user: travelerData.emailId,
          reply_to: "tecapec843@whwow.com",
          cancelLink: cancelURL,
          reviewLink: reveiwUrl,
        },
        process.env.REACT_APP_EMAILAPIKEY as string
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleClick = () => {
    setFlag(true);
    setTimeout(() => {
      handlePrint();
      setFlag(false);
    }, 10);
  };

  const [flag, setFlag] = React.useState(false);
  const urlSearchParams = new URLSearchParams(window.location.search);

  const params = Object.fromEntries(urlSearchParams.entries());

  const bookingId = useSelector(
    (state: RootState) => state.confirmationPageSlice.bookingDto.id
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConfirmationPageData(+params.bookingId));
  }, []);

  return (
    <div ref={componentRef}>
      {cancelFlag ? (
        <Submited message="Your room has been cancelled!!" />
      ) : (
        <>
          <Box className="confirmation-page-header">
            <Box>
              <Typography>Upcoming Reservation {bookingId}</Typography>
            </Box>
            <Box>
              <Button className="outlined-button" onClick={handleClick}>
                Print
              </Button>

              <Button className="outlined-button" onClick={onComplete}>
                Email
              </Button>
            </Box>
          </Box>
          <Box className="print-invoice">
            <Typography>
              Your booking Invoice for booking Id {bookingId}
            </Typography>
          </Box>
          <Collapse className="Collapse" in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              EMAIL SENT
            </Alert>
          </Collapse>

          <ConfirmationContent flag={flag} />
        </>
      )}
    </div>
  );
}
