import React, { useState } from "react";

import PromoCode from "./utils/PromoCode";
import Property from "./utils/Property";
import RateType from "./utils/RateType";
import Room from "./utils/Room";
import Guests from "./utils/Guests";
import AccessibleRoom from "./utils/AccessibleRoom";
import Calender from "./Calender/Calender";

import "../../Internationalization.tsx";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getRoomDetails } from "../../redux/RoomTypeDetailsSlice";

import { Box, Button } from "@mui/material";
import "./Calender/Calender.scss";
import "./LandingPageform.scss";
import Cookies from "js-cookie";
import { fetchPromotions } from "../../redux/PromotionsSlice";
import LandingPageSlice from "../../redux/LandingPageSlice";

const LandingPageForm = () => {
  const { t } = useTranslation();
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  dispatch(LandingPageSlice.actions.updatePageFlag(1));
  const roomTypeDetails = useSelector(
    (state: RootState) => state.roomdetailsReducer
  );
  const LandingPageData = useSelector(
    (state: RootState) => state.landingPageReducer
  );

  const tenantfilter = useSelector(
    (state: RootState) => state.tenantfilterReducer
  );

  //Handle submit on landing form
  const handleSubmit = (event: any) => {
    let date: string[] = JSON.parse(Cookies.get("Dates") ?? " ");
    const param = {
      property: LandingPageData.property,
      checkinDate: date[0],
      checkoutDate: date[1],
      guests: LandingPageData.guests,
      rateType: LandingPageData.rateType,
      room: Cookies.get("Room") as string,
      promocode: LandingPageData.promocode,
      assistSupport: JSON.stringify(LandingPageData.assistSupport),
    };

    naviagate({
      pathname: "/search",
      search: `?${createSearchParams(param)}`,
    });
  };
  return (
    <Box className="LandingPageForm">
      <form className="form">
        <Property flag={tenantfilter.PropertyField} />
        <Calender />
        <Box className="GuestRoom">
          <Guests flag={tenantfilter.Guestfiield} />
          <Room flag={tenantfilter.RoomField} />
        </Box>
        <AccessibleRoom flag={tenantfilter.WheelChairAssist} />
        <RateType flag={tenantfilter.RateField} />
        <PromoCode flag={tenantfilter.PromoCodeFk} />
        <Button
          className="searchButton"
          variant="contained"
          onClick={handleSubmit}
        >
          {t("Search Button")}
        </Button>
      </form>
    </Box>
  );
};

export default LandingPageForm;
