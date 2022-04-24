import React, { useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/reduxStore";

import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./ConfimationAccordion.scss";
import ConfirmationSlice from "../../../../../redux/ConfirmationPageSlice";

interface IFlag {
  flag: boolean;
}
export default function ConfirmationAccordion(props: IFlag) {
  const matches = props.flag;
  const [current, setCurrent] = useState(-1);

  //To change the state of Accordion
  const changeState = (panel: any) => (e: any, newValue: any) => {
    setCurrent(newValue ? panel : -1);
  };
  const confirmationData = useSelector(
    (state: RootState) => state.confirmationPageSlice
  );

  return (
    <Box>
      <Accordion expanded={matches || current === 0} onChange={changeState(0)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Room total summary
        </AccordionSummary>
        <AccordionDetails>
          <Box className="data-summary">
            <Box className="data-summary-row">
              <Typography className="small-gray">Nightly Rate</Typography>
              <Typography>
                $
                {Math.round(
                  confirmationData.promotionDto.price_factor *
                    confirmationData.bookingDto.basicNightlyRate
                )}
              </Typography>
            </Box>
            <Box className="data-summary-row">
              <Typography className="small-gray">Subtotal</Typography>
              <Typography>
                $
                {confirmationData.bookingDto.totalCost +
                  +confirmationData.roomTypeDto.roomOccupancyTax}
              </Typography>
            </Box>
            <Box className="data-summary-row">
              <Typography className="small-gray">
                Taxes, Surcharges, Fees
              </Typography>
              <Typography>
                ${confirmationData.roomTypeDto.roomOccupancyTax}
              </Typography>
            </Box>
            <Box className="data-summary-row">
              <Typography className="small-gray">Room Occupancy Tax</Typography>
              <Typography>
                ${confirmationData.roomTypeDto.propertyTax}
              </Typography>
            </Box>
            <Box className="data-summary-row">
              <Typography className="small-gray">Total For Stay</Typography>
              <Typography>
                $
                {confirmationData.bookingDto.totalCost +
                  confirmationData.roomTypeDto.propertyTax +
                  confirmationData.roomTypeDto.roomOccupancyTax}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider className="divider" />
      <Accordion expanded={matches || current == 1} onChange={changeState(1)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Guest Information
        </AccordionSummary>
        <AccordionDetails>
          <Box className="data-summary">
            <Box className="data-summary-row">
              <Typography className="small-gray">First Name</Typography>
              <Typography>
                {confirmationData.travelerInfoDto.firstName}
              </Typography>
            </Box>
            <Box className="data-summary-row">
              <Typography className="small-gray">Last Name</Typography>
              <Typography>
                {confirmationData.travelerInfoDto.lastName}
              </Typography>
            </Box>
            <Box className="data-summary-row">
              <Typography className="small-gray">Phone Number</Typography>
              <Typography>{confirmationData.travelerInfoDto.phone}</Typography>
            </Box>
            <Box className="data-summary-row">
              <Typography className="small-gray">Email</Typography>
              <Typography>
                {confirmationData.travelerInfoDto.emailId}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider className="divider" />
      <Accordion expanded={matches || current == 2} onChange={changeState(2)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Billing Address
        </AccordionSummary>
        <AccordionDetails>
          <Box className="data-summary">
            <Box className="data-summary-row">
              <Typography className="small-gray">Name</Typography>
              <Typography>
                {confirmationData.travelerInfoDto.billingInfo.firstName +
                  " " +
                  confirmationData.travelerInfoDto.billingInfo.lastName}
              </Typography>
            </Box>
            <Box className="data-summary-row">
              <Typography className="small-gray">Address</Typography>
              <Typography>
                {confirmationData.travelerInfoDto.billingInfo.mailingAddress1 +
                  " " +
                  confirmationData.travelerInfoDto.billingInfo.mailingAddress2}
              </Typography>
            </Box>
            <Box className="data-summary-row">
              <Typography className="small-gray">Country</Typography>
              <Typography>
                {confirmationData.travelerInfoDto.billingInfo.country}
              </Typography>
            </Box>
            <Box className="data-summary-row">
              <Typography className="small-gray">State</Typography>
              <Typography>
                {confirmationData.travelerInfoDto.billingInfo.state}
              </Typography>
            </Box>
            <Box className="data-summary-row">
              <Typography className="small-gray">Zip</Typography>
              <Typography>
                {confirmationData.travelerInfoDto.billingInfo.zip}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider className="divider" />
      <Accordion expanded={matches || current == 3} onChange={changeState(3)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Payment Information
        </AccordionSummary>
        <AccordionDetails>
          <Box className="data-summary">
            <Box className="data-summary-row">
              <Typography className="small-gray">Amount Paid</Typography>
              <Typography>
                $
                {confirmationData.bookingDto.totalCost +
                  confirmationData.roomTypeDto.roomOccupancyTax}
              </Typography>
            </Box>
            <Box className="data-summary-row">
              <Typography className="small-gray">Card Number</Typography>
              <Typography>
                {"XXXXXXXXXXXX" +
                  confirmationData.paymentDto.cardNumber.slice(-4)}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider className="divider" />
    </Box>
  );
}
