import Calender from "../LandingPageForm/Calender/Calender";
import Guests from "../LandingPageForm/utils/Guests";
import Room from "../LandingPageForm/utils/Room";
import Bed from "./Bed/Bed";
import "../../Internationalization.tsx";

import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import { getRoomDetails } from "../../redux/RoomTypeDetailsSlice";
import { useTranslation } from "react-i18next";

import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Box, Button } from "@mui/material";

import "./HorizontalForm.scss";
import { useEffect } from "react";

const HorizontalForm = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const LandingPageData = useSelector(
    (state: RootState) => state.landingPageReducer
  );
  const navigate = useNavigate();
  let checkinDate: string =
    params.checkinDate.substring(8, 10) +
    "-" +
    params.checkinDate.substring(5, 7) +
    "-" +
    params.checkinDate.substring(0, 4);
  let checkoutDate: string =
    params.checkoutDate.substring(8, 10) +
    "-" +
    params.checkoutDate.substring(5, 7) +
    "-" +
    params.checkoutDate.substring(0, 4);
  let x: number = +params.room;
  useEffect(() => {
    dispatch(getRoomDetails(checkinDate, checkoutDate, x));
  }, []);

  //To handle change in Mouse Click in date
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    let date: string[] = JSON.parse(Cookies.get("Dates") ?? " ");
    let checkinDate: string =
      date[0].substring(8, 10) +
      "-" +
      date[0].substring(5, 7) +
      "-" +
      date[0].substring(0, 4);
    let checkoutDate: string =
      date[1].substring(8, 10) +
      "-" +
      date[1].substring(5, 7) +
      "-" +
      date[1].substring(0, 4);
    let x: number = +JSON.parse(Cookies.get("Room") ?? " ");
    dispatch(getRoomDetails(checkinDate, checkoutDate, x));
    const param = {
      property: Cookies.get("property") ?? " ",
      checkinDate: JSON.parse(Cookies.get("checkinDate") ?? " "),
      checkoutDate: JSON.parse(Cookies.get("checkoutDate") ?? " "),
      guests: LandingPageData.guests,
      rateType: Cookies.get("RateType") ?? " ",
      room: Cookies.get("Room") ?? " ",
      promocode: Cookies.get("promo") ?? " ",
      assistSupport: Cookies.get("assit") ?? " ",
    };

    navigate({
      pathname: "/search",
      search: `?${createSearchParams(param)}`,
    });
  };
  const tenantfilter = useSelector(
    (state: RootState) => state.tenantfilterReducer
  );
  return (
    <Box className="horizontal-form">
      <Box className="guest-room">
        <Guests flag={tenantfilter.Guestfiield} />
        <Room flag={tenantfilter.RoomField} />
        <Bed />
      </Box>
      <Calender />
      <Button
        className="search-button"
        variant="contained"
        onClick={handleClick}
      >
        {t("Search Button")}
      </Button>
    </Box>
  );
};

export default HorizontalForm;
