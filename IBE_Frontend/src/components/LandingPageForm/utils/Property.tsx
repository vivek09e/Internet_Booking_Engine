import React, { useState } from "react";
import "../../../Internationalization.tsx";
import { useTranslation } from "react-i18next";

import LandingPageSlice from "../../../redux/LandingPageSlice";
import { MenuItem, TextField } from "@mui/material";

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

interface IProperty {
  flag: Boolean;
}
const Property: React.FC<IProperty> = ({ flag }) => {
  const [property, setProperty] = useState<string>("team-1");
  const dispatch = useDispatch();
  const handlepropertyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(LandingPageSlice.actions.updatePromocode(pVal));
    setProperty(event.target.value as string);
    Cookies.set("property", event.target.value as string);
  };
  const pVal = Cookies.get("property");
  const { t } = useTranslation();
  return flag ? (
    <TextField
      select
      className="propertyField"
      value={pVal}
      label={t("Property")}
      onChange={handlepropertyChange}
      id="propertyField"
    >
      <MenuItem value={1} id="propertyField1">
        Team-1
      </MenuItem>
    </TextField>
  ) : null;
};

export default Property;
