import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

interface ITenantLimits {
  Kid: number;
  Adult: number;
  Child: number;
  room: number;
  LOS: number;
  Bed: number;
  loading: boolean;
  CheckoutPageTimer: number;
}

const intitalState: ITenantLimits = {
  Kid: 1,
  Adult: 1,
  Child: 1,
  room: 1,
  LOS: 14,
  Bed: 2,
  CheckoutPageTimer: 10,
  loading: true,
};

const tenantLimitsSlice = createSlice({
  name: "tenantLimits",
  initialState: intitalState,
  reducers: {
    loadData: (state, action) => {
      state.Adult = action.payload.Adult;
      state.Child = action.payload.Child;
      state.Kid = action.payload.Kid;
      state.room = action.payload.room;
      state.LOS = action.payload.LOS;
      state.Bed = action.payload.Bed;
      state.CheckoutPageTimer = action.payload.CheckoutPageTimer;
      state.loading = false;
    },
  },
});

export const getLimits = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ELASTICBEANSTALKAPI}/tenantLimit/1`,
        {
          headers: {
            Authorization: "" + sessionStorage.getItem("token"),
          },
        }
      );
      dispatch(tenantLimitsSlice.actions.loadData(response.data));
    } catch (error) {
      console.log(error);
      console.log("Could not load Data !");
    }
  };
};
export default tenantLimitsSlice;
