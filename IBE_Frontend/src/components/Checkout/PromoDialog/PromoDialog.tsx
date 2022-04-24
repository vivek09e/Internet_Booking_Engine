import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStore";
import { IPackage } from "../../RoomDetailsModal/PackageCard/Package";

import {
  IRoomImage,
  IDatePrice,
  IRoomTypeDetails,
} from "../../../redux/RoomTypeDetailsSlice";

import {
  Box,
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
import "./PromoDialog.scss";



// To slide the dialog from up
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface ITripItinerary {
    basicNightlyRate: number;
    Tax: number;
    promoName: string;
    dueNow: number;
    dueAtResort: number;
    package: IPackage;
    subtotal: number;
  }


const PromoCard: React.FC<ITripItinerary> = (props) => {
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


        <DialogTitle>{props.package?.promo.promotion_title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.package?.promo.promotion_description}
          </DialogContentText>
        </DialogContent>

        <DialogTitle>
          Package Total
          <span className="room-breakdown-small-text">
            ${(props.package?.roomdetails.basicNightlyRate * props.package?.promo.price_factor).toFixed(0)}
          </span>
        </DialogTitle>
      </Dialog>
    </>
  );
};
export default PromoCard;
