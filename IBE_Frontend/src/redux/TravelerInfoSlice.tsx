import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { getConfirmationPageData } from "./ConfirmationPageSlice";
export interface IBillingInfo {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  mailingAddress1: string;
  mailingAddress2: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}
export interface IBookingInfo {
  id: number;
  adultCount: number;
  checkInDate: string;
  checkOutDate: string;
  guestId: number;
  promotionName: string;
  propertyId: number;
  amountDueAtResort: number;
  childCount: number;
  statusId: number;
  totalCost: number;
  roomTypeID: number;
  numberOfRoom: number;
  basicNightlyRate: number;
  promoType: string;
}

export interface ITravelerInfo {
  phone: string;
  firstName: string;
  lastName: string;
  middleName: string;
  emailId: string;
  phoneCode: string;
  bookingId: number;
  billingInfo: IBillingInfo;
}
interface Iquery {
  state: string;
  country: string;
}

interface IzipCode {
  query: Iquery;
  results: string[];
}

export interface IPaymentInfo {
  cardNumber: string;
  payExpiryMM: number;
  payExpiryYY: number;
  cvvCode: number;
}
export interface ICheckout {
  travelerInfo: ITravelerInfo;
  payment: IPaymentInfo;
  zipCodeLength: number;
  zipCodeInfo: IzipCode;
  bookingInfo: IBookingInfo;
  cancleInfo: ICancelInfo;
  loading: boolean;
  cancelFlag: boolean;
}

export interface ICancelInfo {
  bookingId: number;
  guestId: number;
  reviewId: number;
}

const initialState: ICheckout = {
  travelerInfo: {
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
  loading: false,
  payment: {
    cardNumber: "",
    payExpiryMM: 0,
    payExpiryYY: 0,
    cvvCode: 0,
  },
  zipCodeLength: 5,
  zipCodeInfo: {
    query: {
      state: "Delhi",
      country: "INDIA",
    },
    results: [],
  },
  bookingInfo: {
    id: -1,
    adultCount: 0,
    checkInDate: Cookies.get("checkinDate") as string,
    checkOutDate: Cookies.get("checkoutDate") as string,
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
  cancleInfo: {
    guestId: -1,
    bookingId: -1,
    reviewId: -1,
  },
  cancelFlag: false,
};

const travelerInfoSlice = createSlice({
  name: "TravelerInfo",
  initialState: initialState,
  reducers: {
    updateBillingInfo: (state, action) => {
      state.travelerInfo.billingInfo = action.payload;
    },
    updateCancelInfo: (state, action) => {
      state.cancleInfo = action.payload;
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateTravelerInfo: (state, action) => {
      state.travelerInfo = action.payload;
    },
    updatePaymentMethod: (state, action) => {
      state.payment = action.payload;
    },
    updateCancelFlag: (state, action) => {
      state.cancelFlag = action.payload;
    },
    updateZipLength: (state, action) => {
      state.zipCodeInfo = action.payload;
      if (state.zipCodeInfo.results.length > 0) {
        state.zipCodeLength = state.zipCodeInfo.results[0].length;
      } else state.zipCodeLength = 5;
    },
    updateBookingInfo: (state, action) => {
      state.bookingInfo = action.payload;
    },
    updateInfo: (state, action) => {
      if (action.payload.filed === "travelerFirstName")
        state.travelerInfo.firstName = action.payload.value;
      else if (action.payload.filed === "travelerMiddleName")
        state.travelerInfo.middleName = action.payload.value;
      else if (action.payload.filed === "travelerLastName")
        state.travelerInfo.lastName = action.payload.value;
      else if (action.payload.filed === "phoneNumber")
        state.travelerInfo.phone = action.payload.value;
      else if (action.payload.filed === "emailID")
        state.travelerInfo.emailId = action.payload.value;
      else if (action.payload.filed === "billingFirstName")
        state.travelerInfo.billingInfo.firstName = action.payload.value;
      else if (action.payload.filed === "billingLastName")
        state.travelerInfo.billingInfo.lastName = action.payload.value;
      else if (action.payload.filed === "billingMiddleName")
        state.travelerInfo.billingInfo.middleName = action.payload.value;
      else if (action.payload.filed === "billingAdd1")
        state.travelerInfo.billingInfo.mailingAddress1 = action.payload.value;
      else if (action.payload.filed === "billingAdd2")
        state.travelerInfo.billingInfo.mailingAddress2 = action.payload.value;
      else if (action.payload.filed === "billingState")
        state.travelerInfo.billingInfo.state = action.payload.value;
      else if (action.payload.filed === "billingZip")
        state.travelerInfo.billingInfo.zip = action.payload.value;
      else if (action.payload.filed === "billingCity")
        state.travelerInfo.billingInfo.city = action.payload.value;
      else if (action.payload.filed === "billingCountry")
        state.travelerInfo.billingInfo.country = action.payload.value;
      else if (action.payload.filed === "paymentCardNumber")
        state.payment.cardNumber = action.payload.value;
      else if (action.payload.filed === "paymentExpiryMonth")
        state.payment.payExpiryMM = action.payload.value;
      else if (action.payload.filed === "paymentExpiryYY")
        state.payment.payExpiryYY = action.payload.value;
      else if (action.payload.filed === "paymentCvvCode")
        state.payment.cvvCode = action.payload.value;
    },
  },
});
export interface IPostTravelerData {
  travelerInfoDto: ITravelerInfo;
  paymentDto: IPaymentInfo;
  bookingDto: IBookingInfo;
}

const paramCheckFunction = (postData: IPostTravelerData) => {
  const checkFlag = true;
  if (
    postData.bookingDto.checkInDate &&
    postData.bookingDto.checkOutDate &&
    postData.bookingDto.numberOfRoom
  )
    return checkFlag;
  else return false;
};

export const postTravelerInfo = (postData: IPostTravelerData) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      if (paramCheckFunction(postData)) {
        dispatch(travelerInfoSlice.actions.updateLoading(true));
        const params = JSON.stringify(postData);
        const response = await axios.post(
          `${process.env.REACT_APP_ELASTICBEANSTALKAPI}/travelerInfo`,
          params,
          {
            headers: {
              Authorization: "" + sessionStorage.getItem("token"),
              "content-type": "application/json",
            },
          }
        );
        dispatch(travelerInfoSlice.actions.updateCancelInfo(response.data));
        dispatch(getConfirmationPageData(response.data.bookingId));
        dispatch(travelerInfoSlice.actions.updateLoading(false));
      } else {
        console.log("checkParam failed");
      }
    } catch (error) {
      console.log(error);
      console.log("Could not load Data !");
    }
  };
};

export const postCancleInfo = (postData: ICancelInfo) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      if (postData.bookingId !== -1) {
        dispatch(travelerInfoSlice.actions.updateLoading(true));
        const params = JSON.stringify(postData);
        const response = await axios.post(
          `${process.env.REACT_APP_ELASTICBEANSTALKAPI}/travelerInfo/cancel`,
          params,
          {
            headers: {
              Authorization: "" + sessionStorage.getItem("token"),
              "content-type": "application/json",
            },
          }
        );
        dispatch(travelerInfoSlice.actions.updateCancelInfo(response.data));
        dispatch(travelerInfoSlice.actions.updateLoading(false));
        dispatch(travelerInfoSlice.actions.updateCancelFlag(true));
      } else console.log("BookingID: ", postData);
    } catch (error) {
      console.log(error);
      console.log("Could not load Data !");
    }
  };
};

export const getZipLength = (countryCode: string, statename: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.get(
        `https://app.zipcodebase.com/api/v1/code/state?apikey=5e4c5dd0-b032-11ec-a180-951d206ea98d&state_name=${statename}&country=${countryCode}&limit=1`
      );
      dispatch(travelerInfoSlice.actions.updateZipLength(response.data));
    } catch (error) {
      console.log(error);
      console.log("Could not load Data !");
    }
  };
};
export default travelerInfoSlice;
