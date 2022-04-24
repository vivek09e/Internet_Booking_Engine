import { Box, Button, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import RoomBreakdown from "../../RoomBreakdown/RoomBreakdown";
import "./Package.scss";
import { IPromotion } from "../../../redux/PromotionsSlice";
import {
  IDatePrice,
  IRoomTypeDetails,
} from "../../../redux/RoomTypeDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import itinerarySlice from "../../../redux/ItenarySlice";
import travelerInfoSlice from "../../../redux/TravelerInfoSlice";

export interface IPackage {
  promo: IPromotion;
  roomdetails: IRoomTypeDetails;
}

//Fetching the price factor required for currency conversion
const Package: React.FC<IPackage> = (props) => {
  const dispatch = useDispatch();
  const currencyFactor = useSelector(
    (state: RootState) => state.landingPageReducer
  );
  const naviagate = useNavigate();

  const handleClick = (event: any) => {
    dispatch(travelerInfoSlice.actions.updateCancelInfo({
      guestId: -1,
      bookingId: -1,
      reviewId: -1,
    }))
    Cookies.set("startTime", JSON.stringify(new Date()));
    Cookies.set("ItenaryData", JSON.stringify(props));
    Cookies.set("IternaryFlag", "1");
    let subTotal: number = 0;
    props.roomdetails.dateWisePrices.map((data: IDatePrice) => {
      subTotal += data.price;
    });
    subTotal *= props.promo.price_factor;
    subTotal += props.roomdetails.occupancyTax;
    Cookies.set("subTotal", JSON.stringify(subTotal));

    dispatch(itinerarySlice.actions.updatePackage(props));
    naviagate({
      pathname: "/checkout",
    });
  };

  useEffect(() => {}, [currencyFactor]);
  return (
    <Card className="package-details">
      <Box className="package-details-left">
        <Typography component={"h2"}>
          {props.promo?.promotion_title.toUpperCase().replaceAll("_", " ")}
        </Typography>
        <Typography>
          {props.promo?.promotion_description.charAt(0).toUpperCase() +
            props.promo?.promotion_description
              .slice(1)
              .toLowerCase()
              .replaceAll("_", " ")}
        </Typography>
      </Box>
      <Box className="package-details-right">
        <Typography className="align-self">
          {currencyFactor.cur}
          {Math.round(
            currencyFactor.priceFactor *
              props.roomdetails?.basicNightlyRate *
              props.promo?.price_factor
          ).toFixed(2)}{" "}
          <del>
            {currencyFactor.cur}
            {Math.round(
              currencyFactor.priceFactor * props.roomdetails?.basicNightlyRate
            ).toFixed(2)}
          </del>
        </Typography>
        <Typography>
          per night{" "}
          <RoomBreakdown promo={props.promo} roomdetails={props.roomdetails} />
        </Typography>
        <Button
          className="select-package-button"
          variant="contained"
          onClick={handleClick}
        >
          Select Package
        </Button>
      </Box>
    </Card>
  );
};

export default Package;
