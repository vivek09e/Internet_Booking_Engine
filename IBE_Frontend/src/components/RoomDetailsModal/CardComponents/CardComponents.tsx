import React from "react";

import BedRoundedIcon from "@mui/icons-material/BedRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { Box, Typography } from "@mui/material";
import "../../../Internationalization.tsx";
import { useTranslation } from "react-i18next";
import {
  IDatePrice,
  IRoomTypeDetails,
} from "../../../redux/RoomTypeDetailsSlice";

interface IRoomDetails {
  roomData: IRoomTypeDetails;
}

export default function CardComponents(props: IRoomDetails) {
  const { t } = useTranslation();
  return (
    <>
      <Typography gutterBottom color="GrayText" component="div">
        {t("Inclusive")} {props.roomData.areaInSquareFeet} ft<sup>2</sup>
      </Typography>
      <Typography gutterBottom color="GrayText" component="div">
        <Box className="center-align">
          <PersonOutlineRoundedIcon />
          1-{props.roomData.maxCapacity}
        </Box>
      </Typography>
      <Typography variant="body2" color="text.secondary" component="div">
        <Box className="center-align">
          <BedRoundedIcon />{" "}
          <Box ml={1}>
            {" "}
            {props.roomData.noOfSingleBed === 0
              ? null
              : t("Single") + " " + props.roomData.noOfSingleBed}{" "}
            {props.roomData.noOfDoubleBed === 0
              ? null
              : t("Double") + " " + props.roomData.noOfDoubleBed}
          </Box>
        </Box>
      </Typography>
    </>
  );
}
