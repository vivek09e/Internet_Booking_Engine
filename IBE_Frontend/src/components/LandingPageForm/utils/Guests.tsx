import React, { useState } from "react";
import GuestCard from "./GuestCard";
import Cookies from "js-cookie";
import { RootState } from "../../../redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import LandingPageSlice from "../../../redux/LandingPageSlice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { isGuestFilter, IGuest } from "../../../redux/features/GuestSlice";
import "../../../Internationalization.tsx";
import { useTranslation } from "react-i18next";

interface IGuests {
  flag: Boolean;
}

const names = ["Kids", "Adult"];

const Guests: React.FC<IGuests> = ({ flag }) => {
  const dispatch = useDispatch();
  const guest = useSelector((state: RootState) => state.guest.value);

  const [guestString, setGuestString] = React.useState<string[]>([]);
  const guestData: string[] = [];
  const KidsCount: number = JSON.parse(Cookies.get("Kids") ?? "0");
  const AdultCount: number = JSON.parse(Cookies.get("Adult") ?? "0");
  if (KidsCount !== 0) {
    guestData.push(KidsCount + " Kids");
  }
  if (AdultCount !== 0) {
    guestData.push(" " + AdultCount + " Adult");
  }
  React.useEffect(() => {
    names.forEach((g) => {
      dispatch(isGuestFilter({ type: g, count: 0 }));
    });
  }, []);

  React.useEffect(() => {
    let displayValue: string[] = [];
    let guestsPresent = guest.filter((g) => g.count !== 0);
    guestsPresent.forEach((g) => {
      displayValue.push(g.count + " " + g.type + " ");
    });
    setGuestString(displayValue);
    dispatch(LandingPageSlice.actions.updateGuest(guest));
  }, [guest]);

  const renderVal = (options: String[]) => {
    return options.map((option) => {
      return <span>{option}</span>;
    });
  };
  const { t } = useTranslation();

  return flag ? (
    <FormControl className="Guest">
      <InputLabel htmlFor="component-outlined">{t("Guests")}</InputLabel>
      <Select
        multiple
        value={guestData}
        input={<OutlinedInput label="Guests" />}
        renderValue={renderVal}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <GuestCard name={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : null;
};

export default Guests;
