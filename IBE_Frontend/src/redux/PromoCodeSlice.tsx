import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

export interface IPromoCode {
  id: string;
  code: string;
  minStay: number;
  priceFactor: number;
  minAmount: number;
  maxDiscountAmount: number;
  expiryDate: string;
}
interface IPromoCodeList {
  PromoCodes: IPromoCode[];
}

const intitalState: IPromoCodeList = {
  PromoCodes: [],
};

const PromoCodeSlice = createSlice({
  name: "Promocodes",
  initialState: intitalState,
  reducers: {
    loadData: (state, action) => {
      state.PromoCodes = action.payload;
    },
  },
});

export const fetchPromoCode = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ELASTICBEANSTALKAPI}/PromoCode`,
        {
          headers: {
            Authorization: "" + sessionStorage.getItem("token"),
            tenantId: "1",
            propertyId: "1",
          },
        }
      );
      dispatch(PromoCodeSlice.actions.loadData(response.data));
    } catch (error) {
      console.log(error);
      console.log("Could not load Data !");
    }
  };
};
export default PromoCodeSlice;
