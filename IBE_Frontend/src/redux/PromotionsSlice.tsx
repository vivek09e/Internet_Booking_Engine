import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

export interface IPromotion {
  promotion_id: number;
  promotion_description: string;
  promotion_title: string;
  is_deactivated: boolean;
  minimum_days_of_stay: number;
  price_factor: number;
  category: string;
  minimumRooms: number;
}
interface IpromotionsList {
  PromoList: IPromotion[];
}

const intitalState: IpromotionsList = {
  PromoList: [],
};

const PromotionSlice = createSlice({
  name: "Promotions",
  initialState: intitalState,
  reducers: {
    loadData: (state, action) => {
      state.PromoList = action.payload;
    },
  },
});
export const fetchPromotions = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ELASTICBEANSTALKAPI}/GetAllPromotions`,
        {
          headers: {
            Authorization: "" + sessionStorage.getItem("token"),
          },
        }
      );
      dispatch(PromotionSlice.actions.loadData(response.data));
    } catch (error) {
      console.log(error);
      console.log("Could not load Data !");
    }
  };
};

export default PromotionSlice;
