import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export interface ILandingPageData {
  property: string;
  checkinDate: Date;
  checkoutDate: Date;
  guests: string;
  rateType: string;
  room: number;
  promocode: string;
  assistSupport: boolean;
  priceFactor: number;
  cur: string;
  currency: ICurrency;
  pageFlag: number;
}
interface quotes {
  USDEUR: number;
}
interface ICurrency {
  success: boolean;
  terms: string;
  privacy: string;
  timestamp: number;
  source: string;
  quotes: quotes;
}

const initialState: ILandingPageData = {
  pageFlag: 1,
  property: "team-1",
  checkinDate: new Date(),
  checkoutDate: new Date(),
  guests: "",
  rateType: "",
  room: JSON.parse(Cookies.get("Room") ?? "1"),
  promocode: "",
  assistSupport: false,
  priceFactor: 1,
  cur: "$",
  currency: {
    success: false,
    terms: "",
    privacy: "",
    timestamp: 0,
    source: "",
    quotes: {
      USDEUR: 0.9,
    },
  },
};

const LandingPageSlice = createSlice({
  name: "Landingpagedata",
  initialState: initialState,
  reducers: {
    updateProperty: (state, action) => {
      state.property = action.payload;
    },
    updateCheckinDate: (state, action) => {
      state.checkinDate = action.payload;
    },
    updateCheckOutDate: (state, action) => {
      state.checkoutDate = action.payload;
    },
    updateGuest: (state, action) => {
      state.guests = action.payload;
    },
    updateRateType: (state, action) => {
      state.rateType = action.payload;
    },
    updateRoom: (state, action) => {
      state.room = action.payload;
    },
    updatePromocode: (state, action) => {
      state.promocode = action.payload;
    },
    updateAssistSuport: (state, action) => {
      state.assistSupport = action.payload;
    },
    updateCurrency: (state, action) => {
      state.currency = action.payload;
    },
    updatePageFlag: (state, action) => {
      state.pageFlag = action.payload;
    },
    updatePriceFactor: (state, action) => {
      if (action.payload === "$") {
        state.priceFactor = 1;
        state.cur = "$";
      } else if (action.payload === "€") {
        state.priceFactor = state.currency.quotes.USDEUR;
        state.cur = "€";
      } else if (action.payload === "₹") {
        state.priceFactor = 76;
        state.cur = "₹";
      }
    },
  },
});

export const fetchCurrency = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.get(
        `http://api.currencylayer.com/live?access_key=641566a46814d7b2527c5f5086fe3919&currencies=EUR`
      );
      dispatch(LandingPageSlice.actions.updateCurrency(response.data));
    } catch (error) {
      console.log(error);
      console.log("Could not load Data !");
    }
  };
};

export default LandingPageSlice;
