import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/system";
import Cookies from "js-cookie";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import "./CountDown.scss";
import { RootState } from "../../../redux/reduxStore";
import { useSelector } from "react-redux";

const CountDown = () => {
  const minutesToAdd: number = useSelector(
    (state: RootState) => state.limitsReducer.CheckoutPageTimer
  );
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const naviagate = useNavigate();
  let currentDate;
  let date = Cookies.get("startTime");
  let getDate: Date = new Date();
  if (date != null) {
    getDate = new Date(JSON.parse(Cookies.get("startTime") ?? ""));
  }

  currentDate = getDate;

  const added10Min = new Date(currentDate.getTime() + minutesToAdd * 60000);
  useEffect(() => {
    const target = added10Min;

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (m <= 0 && s <= 0) {
        Cookies.set("IternaryFlag", "0");
        naviagate({
          pathname: "/",
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box className="count-down">
      <AccessTimeIcon /> {minutes} Minutes {seconds} Seconds left to complete
      checkout!
    </Box>
  );
};

export default CountDown;
