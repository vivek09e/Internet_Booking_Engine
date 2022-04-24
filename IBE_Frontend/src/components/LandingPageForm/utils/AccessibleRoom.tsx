import React, { useEffect } from "react";

import AccessibleIcon from "@mui/icons-material/Accessible";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import LandingPageSlice from "../../../redux/LandingPageSlice";
import "../../../Internationalization.tsx";
import { useTranslation } from "react-i18next";

import { Box, Checkbox } from "@mui/material";

interface IAccessibleRoom {
  flag: Boolean;
}
const AccessibleRoom: React.FC<IAccessibleRoom> = ({ flag }) => {
  const [checked, setChecked] = React.useState(true);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(LandingPageSlice.actions.updateAssistSuport(!checked));

    Cookies.set("assit", JSON.stringify(!checked));
    setChecked(!checked);
  };

  useEffect(() => {
    let getAssit = Cookies.get("assit");
    setChecked(getAssit === "true");
  }, []);
  return flag ? (
    <Box className="Accessible">
      <Checkbox
        className="accessible"
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <AccessibleIcon />
      <Box>{t("Accessible")}</Box>
    </Box>
  ) : null;
};

export default AccessibleRoom;
