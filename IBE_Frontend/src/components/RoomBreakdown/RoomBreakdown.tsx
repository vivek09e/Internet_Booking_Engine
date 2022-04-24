import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import "./RoomBreakdown.scss";
import {
  IRoomImage,
  IDatePrice,
  IRoomTypeDetails,
} from "../../redux/RoomTypeDetailsSlice";
import { IPromotion } from "../../redux/PromotionsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import LandingPageForm from "../LandingPageForm/LandingPageForm";

// To slide the dialog from up
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface IRoomBreakdown {
  roomdetails: IRoomTypeDetails;
  promo?: IPromotion;
}

const RoomBreakdown: React.FC<IRoomBreakdown> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  var price = 0;
  const currencyFactor = useSelector(
    (state: RootState) => state.landingPageReducer
  );

  useEffect(() => {}, [currencyFactor]);
  //handle to open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //handle to close dialog
  const handleClickClose = () => {
    setOpen(false);
  };
  //To calculate total price
  function addPrice(p: number) {
    price += p;
  }
  return (
    <>
      <IconButton size="small" onClick={handleClickOpen} className="info-class">
        <InfoIcon fontSize="inherit" />
      </IconButton>

      <Dialog
        className="rate-breakdown-card"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
      >
        <Box className="room-breakdown-title-box">
          <Typography className="rate-breakdown-title">
            Rate Breakdown
          </Typography>
          <IconButton
            className="rate-breakdown-close"
            onClick={handleClickClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogTitle>Room Type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.roomdetails?.roomTypeName}
          </DialogContentText>
        </DialogContent>
        <DialogTitle>Nightly Rate (Per Room)</DialogTitle>
        <DialogContent>
          <Typography component={"h3"}>
            {props.promo ? props.promo.promotion_title : <></>}
          </Typography>
          {props.roomdetails?.dateWisePrices?.map((rate, index) => {
            if (props.promo) {
              addPrice(rate.price * props.promo.price_factor);
            } else addPrice(rate.price);
            return (
              <DialogContentText
                className="rate-breakdown-price-list"
                key={index}
              >
                <Box>{rate.date}</Box>
                <Box>
                  {currencyFactor.cur}
                  {props.promo
                    ? Math.round(
                        rate.price *
                          props.promo.price_factor *
                          currencyFactor.priceFactor
                      )
                    : Math.round(rate.price * currencyFactor.priceFactor)}
                </Box>
              </DialogContentText>
            );
          })}
        </DialogContent>
        <DialogTitle>
          Room Total
          <span className="room-breakdown-small-text">
            {currencyFactor.cur}
            {Math.round(price * currencyFactor.priceFactor)}
          </span>
        </DialogTitle>
        <Divider />
        <DialogTitle>Taxes and Fees (Per Room)</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Resort Fee:{" "}
            <span className="room-breakdown-small-text">
              {currencyFactor.cur}
              {Math.round(
                props.roomdetails?.propertyTax * currencyFactor.priceFactor
              )}
            </span>
          </DialogContentText>
          <DialogContentText>
            Occupancy Tax:{" "}
            <span className="room-breakdown-small-text">
              {currencyFactor.cur}
              {Math.round(
                props.roomdetails?.occupancyTax * currencyFactor.priceFactor
              )}
            </span>
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogTitle className="rate-breakdown-padding">
          Due Now
          <span className="room-breakdown-small-text">
            {currencyFactor.cur}
            {Math.round(
              (price + props.roomdetails?.occupancyTax) *
                currencyFactor.priceFactor
            )}
          </span>
        </DialogTitle>
        <DialogTitle className="rate-breakdown-padding">
          Due at Resort
          <span className="room-breakdown-small-text">
            {currencyFactor.cur}
            {Math.round(
              props.roomdetails?.propertyTax * currencyFactor.priceFactor
            )}
          </span>
        </DialogTitle>
        <Divider />
      </Dialog>
    </>
  );
};
export default RoomBreakdown;
