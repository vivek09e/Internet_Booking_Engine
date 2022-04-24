import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
export interface IRoomImage {
  id: string;
  s3Url: string;
  imageType: string;
}
export interface IDatePrice {
  date: string;
  price: number;
}

export interface IRoomTypeDetails {
  roomTypeId: number;
  roomTypeName: string;
  areaInSquareFeet: number;
  noOfDoubleBed: number;
  noOfSingleBed: number;
  maxCapacity: number;
  propertyId: number;
  countOfRoomAvailable: number;
  basicNightlyRate: number;
  lowResolutionImage: string;
  roomImages: IRoomImage[];
  roomTypeDescription: string;
  occupancyTax: number;
  flag: boolean;
  propertyTax: number;
  amenities: string[];
  dateWisePrices: IDatePrice[];
  reviewDto: IRoomReviews;
}

export interface IRoomTypeDetailsList {
  RoomTypeDetailsList: IRoomTypeDetails[];
  flagArray: number[];
  flagArrayBed: number[];
  noOfBed: number;
  reviewFlag: boolean;
}

const intitalState: IRoomTypeDetailsList = {
  RoomTypeDetailsList: [],
  flagArray: [],
  flagArrayBed: [],
  noOfBed: 1,
  reviewFlag: true,
};

export interface IRoomReviews {
  reviewId: number;
  overAllRating: number;
  amenitiesRating: number;
  cleanlinessRating: number;
  facilitiesRating: number;
  roomComfortAndQualityRating: number;
  serviceRating: number;
  valueForMoneyRating: number;
  numberOfReview: number;
  guestComment: string;
}

const RoomTypeDetailsSlice = createSlice({
  name: "roomDetailsSlice",
  initialState: intitalState,
  reducers: {
    loadData: (state, action) => {
      state.RoomTypeDetailsList = action.payload;
    },
    addInFlagArray: (state, action) => {
      if (action.payload.type === "room") {
        if (action.payload.checked) {
          if (!state.flagArray.includes(action.payload.value))
            state.flagArray.push(action.payload.value);
        } else {
          state.flagArray = state.flagArray.filter(
            (val) => val !== action.payload.value
          );
        }
      } else if (action.payload.type === "bed") {
        if (action.payload.checked) {
          if (!state.flagArrayBed.includes(action.payload.value))
            state.flagArrayBed.push(action.payload.value);
        } else {
          state.flagArrayBed = state.flagArrayBed.filter(
            (val) => val !== action.payload.value
          );
        }
      }

      if (state.flagArray.length === 0 && state.flagArrayBed.length === 0) {
        state.RoomTypeDetailsList.map((room) => {
          room.flag = true;
        });
      } else if (
        state.flagArray.length !== 0 &&
        state.flagArrayBed.length === 0
      ) {
        state.RoomTypeDetailsList.map((room, index: number) => {
          if (state.flagArray.includes(index)) room.flag = true;
          else room.flag = false;
        });
      } else if (
        state.flagArray.length === 0 &&
        state.flagArrayBed.length !== 0
      ) {
        state.RoomTypeDetailsList.map((room, index: number) => {
          if (state.flagArrayBed.includes(index)) room.flag = true;
          else room.flag = false;
        });
      } else {
        state.RoomTypeDetailsList.map((room, index: number) => {
          if (
            state.flagArrayBed.includes(index) &&
            state.flagArray.includes(index)
          )
            room.flag = true;
          else room.flag = false;
        });
      }
    },
    alterFlag: (state, action) => {
      state.noOfBed = action.payload.bedNo;
      state.RoomTypeDetailsList.map((room) => {
        if (room.noOfDoubleBed + room.noOfSingleBed < state.noOfBed)
          room.flag = false;
        else room.flag = true;
      });
    },
    alterReviewFlag: (state, action) => {
      state.reviewFlag = action.payload;
    },
  },
});

export const getRoomDetails = (
  startDate: string,
  endDate: string,
  noOfRoom: number
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ELASTICBEANSTALKAPI}/GetByDate`,
        {
          headers: {
            fromDate: startDate,
            toDate: endDate,
            capacity: noOfRoom,
            Authorization: "" + sessionStorage.getItem("token"),
          },
        }
      );
      dispatch(RoomTypeDetailsSlice.actions.loadData(response.data));
    } catch (error) {
      console.log(error);
      console.log("Could not load Data !");
    }
  };
};
export const submitReview = (postData: IRoomReviews) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const params = JSON.stringify(postData);
      const response = await axios.post(
        `${process.env.REACT_APP_ELASTICBEANSTALKAPI}/Review`,
        params,
        {
          headers: {
            Authorization: "" + sessionStorage.getItem("token"),
            "content-type": "application/json",
          },
        }
      );
      dispatch(RoomTypeDetailsSlice.actions.alterReviewFlag(false));
    } catch (error) {
      console.log(error);
      console.log("Could not load Data !");
    }
  };
};

export default RoomTypeDetailsSlice;
