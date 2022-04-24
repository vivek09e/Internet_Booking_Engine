import React from "react";
import { TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStore";
import LandingPageSlice from "../../../redux/LandingPageSlice";
interface IPomoCode {
  flag: Boolean;
}
const PromoCode: React.FC<IPomoCode> = ({ flag }) => {
  const LandingPageData = useSelector(
    (state: RootState) => state.landingPageReducer
  );
  const dispatch = useDispatch();

  //Setting Cookies for landing page
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(LandingPageSlice.actions.updatePromocode(getPromo));
    Cookies.set("promo", event.target.value);
  };
  const getPromo = Cookies.get("promo");
  return flag ? (
    <TextField
      className="promocode"
      variant="outlined"
      value={getPromo}
      label="Promo"
      onChange={handleChange}
      id="promoField"
    />
  ) : null;
};

export default PromoCode;
