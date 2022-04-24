import React from "react";

import Cookies from "js-cookie";
import LandingPageSlice from "../../../redux/LandingPageSlice";

import { MenuItem, TextField } from "@mui/material";
import { useDispatch } from "react-redux";

interface IRatetype {
  flag: Boolean;
}
const RateType: React.FC<IRatetype> = ({ flag }) => {
  const dispatch = useDispatch();
  const handleRateType = (event: React.ChangeEvent<HTMLInputElement>) => {
    Cookies.set("RateType", event.target.value as string);
    dispatch(LandingPageSlice.actions.updateRateType(getRateType));
  };
  const getRateType = Cookies.get("RateType");
  return flag ? (
    <TextField
      select
      className="rateTypeField"
      value={getRateType}
      label="RateType"
      onChange={handleRateType}
    >
      <MenuItem value="Corporate">Corporate</MenuItem>
    </TextField>
  ) : null;
};

export default RateType;
