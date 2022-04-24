import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RoomSearch from "./components/RoomSeach/RoomSearch";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reduxStore";
import { getTheme } from "./redux/themeSlice";
import { getFilters } from "./redux/features/tenantDetailsSlice";
import { getLimits } from "./redux/tenantLimits";
import { getRoomDetails } from "./redux/RoomTypeDetailsSlice";

import "./App.scss";
import axios from "axios";
import { fetchPromotions } from "./redux/PromotionsSlice";
import { fetchPromoCode } from "./redux/PromoCodeSlice";

import { fetchCurrency } from "./redux/LandingPageSlice";
import Checkout from "./components/Checkout/Checkout";
import { getProperties } from "./redux/PropertiesSlice";
import Cookies from "js-cookie";
import ConfirmationPage from "./components/ConfirmationPage/ConfirmationPage";
import Cancellation from "./components/Cancellation/Cancellation";
import ReviewPage from "./components/ReviewPage/ReviewPage";
import { getConfirmationPageData } from "./redux/ConfirmationPageSlice";

let profile = {
  username: process.env.REACT_APP_USERNAME,
  password: process.env.REACT_APP_PASSWORD,
};

/* A function to get tokends */

export const getToken = async (dispatch: any) => {
  try {
    const token = await axios.post(
      `${process.env.REACT_APP_ELASTICBEANSTALKAPI}/authenticate`,
      profile
    );
    sessionStorage.setItem("token", token.data.token);
    dispatch(getFilters());
    dispatch(getTheme());
    dispatch(getLimits());
    dispatch(fetchPromotions());
    dispatch(fetchPromoCode());
    dispatch(fetchCurrency());
    dispatch(getProperties());
  } catch (error) {
    console.log("Error in the Authenticating! ");
  }
};

function App() {
  const dispatch = useDispatch();
  Cookies.set("IternaryFlag", "0");

  useEffect(() => {
    getToken(dispatch);
  }, [dispatch]);
  const primaryColor = useSelector(
    (state: RootState) => state.themeReducer.primaryColor
  );
  const secondaryColor = useSelector(
    (state: RootState) => state.themeReducer.secondaryColor
  );
  const tenantLangCurr = useSelector(
    (state: RootState) => state.tenantfilterReducer
  );

  const data = {
    languageList: tenantLangCurr.languagesList,
    coinSymbolList: tenantLangCurr.currency,
  };

  /**
   * Implemented Theming
   */
  document.documentElement.style.cssText += `--primary-color: ${primaryColor};`;
  document.documentElement.style.cssText += `--secondary-color: ${secondaryColor};`;
  return (
    <React.Fragment>
      <Header name={data} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<RoomSearch />} />
        <Route path="home" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/cancel" element={<Cancellation />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
