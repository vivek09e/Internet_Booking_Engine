import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./ConfirmationPage.scss";
import ConfirmationHeader from "./utils/ConfirmationHeader/ConfirmationHeader";
import { Box, Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import Loading from "./utils/LoadingIcon/Loading";
import {getConfirmationPageData} from "../../redux/ConfirmationPageSlice";
import Cookies from "js-cookie";

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.travelerReducer.loading
  );
  

  const confimationDetails = useSelector(
    (state: RootState) => state.confirmationPageSlice
  );
  Cookies.set("IternaryFlag", "0");
  //handle update reservations button click
  const handleUpdateReservation = () => {
    navigate({
      pathname: "/search",
    });
  };
  

  useEffect(() => {}, [loading]);
  return (
    <Box>
      {!loading ? (
        <Box className="confirmation-page">
          <ConfirmationHeader />
        </Box>
      ) : (
        <Loading />
      )}
    </Box>
  );
}
