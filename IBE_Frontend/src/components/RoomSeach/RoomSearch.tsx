import React from "react";

import HorizontalForm from "../HorizontalForm/HorizontalForm";
import RoomCard from "../RoomCard/RoomCard";
import FilterComponent from "./utils/FilterComponent";
import { Box } from "@mui/material";

import "./RoomSearch.scss";
import Bar from "../Bar/Bar";
import "../../Internationalization.tsx";
import { useTranslation } from "react-i18next";
import Breadcrumb from "./BreadCrumb/BreadCrumb";
import TripItinerary from "../Checkout/TripItinerary/TripItinerary";
import Cookies from "js-cookie";
import LandingPageSlice from "../../redux/LandingPageSlice";
import { useDispatch } from "react-redux";

function RoomSeach() {
  const flag = Cookies.get("IternaryFlag");
  const dispatch = useDispatch();
  dispatch(LandingPageSlice.actions.updatePageFlag(2));
  const { t } = useTranslation();
  return (
    <Box className="room-search-page">
      <Bar pagename={t("Book Now")} />
      <Breadcrumb activeSteps={1} />
      <Box className="room-search-content">
        <HorizontalForm />
        <Box className="filter-room-result">
          <Box className="left-sidebar">
            <FilterComponent />
          </Box>
          <Box className="right-sidebar">
            <RoomCard />
          </Box>
          <Box className="trip-itinerary">
            {flag === "1" ? <TripItinerary /> : <></>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RoomSeach;
