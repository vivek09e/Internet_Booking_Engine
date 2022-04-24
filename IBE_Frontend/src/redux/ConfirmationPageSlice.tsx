import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import itinerarySlice from "./ItenarySlice";
import { IPromotion } from "./PromotionsSlice";
import travelerInfoSlice, {
  IBookingInfo,
  IPaymentInfo,
  ITravelerInfo,
} from "./TravelerInfoSlice";

export interface IRoomType {
  id: string;
  name: string;
  roomOccupancyTax: number;
  propertyTax: number;
  imageUrl: string;
}
export interface IConfirmation {
  roomTypeDto: IRoomType;
  promotionDto: IPromotion;
  travelerInfoDto: ITravelerInfo;
  paymentDto: IPaymentInfo;
  bookingDto: IBookingInfo;
}

const intialState: IConfirmation = {
  roomTypeDto: {
    id: "",
    name: "",
    roomOccupancyTax: 0,
    propertyTax: 0,
    imageUrl: "",
  },
  promotionDto: {
    category: "",
    minimumRooms: 1,
    promotion_id: 0,
    promotion_description: "",
    promotion_title: "",
    is_deactivated: false,
    minimum_days_of_stay: 0,
    price_factor: 0,
  },
  travelerInfoDto: {
    phone: "",
    firstName: "",
    lastName: "",
    middleName: "",
    emailId: "",
    phoneCode: "",
    bookingId: -1,
    billingInfo: {
      id: -1,
      firstName: "",
      lastName: "",
      middleName: "",
      mailingAddress1: "",
      mailingAddress2: "",
      country: "",
      state: "",
      city: "",
      zip: "",
    },
  },
  paymentDto: {
    cardNumber: "",
    payExpiryMM: 0,
    payExpiryYY: 0,
    cvvCode: 0,
  },
  bookingDto: {
    id: -1,
    adultCount: 0,
    checkInDate: "",
    checkOutDate: "",
    guestId: -1,
    promotionName: "",
    propertyId: 1,
    amountDueAtResort: 0,
    childCount: 0,
    statusId: -1,
    totalCost: 0,
    roomTypeID: -1,
    numberOfRoom: 0,
    basicNightlyRate: 0,
    promoType: "STANDARD",
  },
};

const ConfirmationSlice = createSlice({
  name: "ConfirmationPageSlice",
  initialState: intialState,
  reducers: {
    updateInfo: (state, action) => {
      state.bookingDto = action.payload.bookingDto;
      state.paymentDto = action.payload.paymentDto;
      state.promotionDto = action.payload.promotionDto;
      state.roomTypeDto = action.payload.roomTypeDto;
      state.travelerInfoDto = action.payload.travelerInfoDto;
    },
  },
});

export const getConfirmationPageData = (bookingId: number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      if (bookingId > 0) {
        const response = await axios.get(
          `${process.env.REACT_APP_ELASTICBEANSTALKAPI}/travelerInfo/${bookingId}`,
          {
            headers: {
              Authorization: "" + sessionStorage.getItem("token"),
            },
          }
        );
        dispatch(ConfirmationSlice.actions.updateInfo(response.data));
      }
    } catch (error) {
      console.log(error);
      console.log("Could not load Data !");
    }
  };
};
export default ConfirmationSlice;
