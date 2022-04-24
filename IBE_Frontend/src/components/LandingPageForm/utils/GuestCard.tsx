import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStore";
import { addGuest, substractGuest } from "../../../redux/features/GuestSlice";
import "../../../Internationalization.tsx";
import { useTranslation } from "react-i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { Box, Button, Grid, Typography } from "@mui/material";

interface IGuestCard {
  name: string;
}
export default function GuestCard({ name }: IGuestCard) {
  const { t } = useTranslation();
  const kidsCount = useSelector((state: RootState) => state.limitsReducer.Kid);
  const adultCount = useSelector(
    (state: RootState) => state.limitsReducer.Adult
  );
  const guest = useSelector((state: RootState) =>
    state.guest.value.filter((g) => g.type === name)
  );
  const dispatch = useDispatch();

  const handleAddEvent = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    dispatch(addGuest(name));
  };

  const handleSubstractEvent = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    dispatch(substractGuest(name));
  };

  return (
    <Box
      className="guest-card"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Typography>{name}</Typography>
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button disabled={guest[0]?.count == 0}>
          <RemoveRoundedIcon
            onClick={(event) => {
              handleSubstractEvent(event);
            }}
          />
        </Button>
        <Typography>{guest[0]?.count}</Typography>
        <Button
          disabled={
            (guest[0]?.type == "Kids" && guest[0]?.count == kidsCount) ||
            (guest[0]?.type == "Adult" && guest[0]?.count == adultCount)
          }
        >
          <AddRoundedIcon
            onClick={(event) => {
              handleAddEvent(event);
            }}
          />
        </Button>
      </Grid>
    </Box>
  );
}
