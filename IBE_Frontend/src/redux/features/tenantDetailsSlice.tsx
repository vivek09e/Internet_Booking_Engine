import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
interface ITenantDetailsSlice {
  Guestfiield: Boolean;
  PropertyField: Boolean;
  RoomField: Boolean;
  RoomLimitfield: Boolean;
  WheelChairAssist: Boolean;
  PromoCodeFk: Boolean;
  RateField: Boolean;
  RoomTypeFilterFk: Boolean;
  BedTypeFilter: Boolean;
  middleNameField: Boolean;
  phoneEx: Boolean;
  languagesList: string[];
  currency: string[];
}
const initialState: ITenantDetailsSlice = {
  Guestfiield: true,
  PropertyField: true,
  RoomField: true,
  RoomLimitfield: true,
  WheelChairAssist: true,
  PromoCodeFk: true,
  RateField: true,
  languagesList: ["En", "Gr", "Fr"],
  currency: ["$ USD", "₹  INR", "€ HKD"],
  RoomTypeFilterFk: true,
  middleNameField:false,
  phoneEx: false,
  BedTypeFilter: true,
};

const tenantDetailSlice = createSlice({
  name: "filtersList",
  initialState: initialState,
  reducers: {
    loadFilter: (state, action) => {
      state.Guestfiield = action.payload.Guestfiield;
      state.PromoCodeFk = action.payload.PromoCodeFk;
      state.PropertyField = action.payload.PropertyField;
      state.RateField = action.payload.RateField;
      state.RoomField = action.payload.RoomField;
      state.RoomLimitfield = action.payload.RoomLimitfield;
      state.WheelChairAssist = action.payload.WheelChairAssist;
      state.BedTypeFilter = action.payload.BedTypeFilter;
      state.RoomTypeFilterFk = action.payload.RoomTypeFilterFk;
      state.phoneEx = action.payload.phoneEx;
      state.middleNameField = action.payload.middleNameField;
    },
    loadLanguages: (state, action) => {
      state.languagesList = action.payload;
    },
    loadCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const getFilters = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ELASTICBEANSTALKAPI}/api/tenant/1`,
        {
          headers: {
            Authorization: "" + sessionStorage.getItem("token"),
          },
        }
      );
      dispatch(tenantDetailSlice.actions.loadFilter(response.data.filters));
      dispatch(
        tenantDetailSlice.actions.loadLanguages(response.data.languagesList)
      );
      dispatch(tenantDetailSlice.actions.loadCurrency(response.data.currency));
    } catch (error) {
      console.log("Could not load Data !");
    }
  };
};

export default tenantDetailSlice;
