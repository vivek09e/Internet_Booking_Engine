import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { IPackage } from "../components/RoomDetailsModal/PackageCard/Package";
import { IDatePrice } from "./RoomTypeDetailsSlice";

export interface ITripItinerary {
  basicNightlyRate: number;
  Tax: number;
  promoName: string;
  dueNow: number;
  dueAtResort: number;
  package: IPackage;
  subtotal: number;
}
const initialState: ITripItinerary = {
  basicNightlyRate: 0,
  Tax: 0,
  promoName: "",
  dueAtResort: 0,
  dueNow: 0,
  subtotal: JSON.parse(Cookies.get("subTotal") ?? "0"),
  package: JSON.parse(
    Cookies.get("ItenaryData") ??
      JSON.stringify({
        promo: {
          promotion_id: 0,
          promotion_description: "",
          promotion_title: "",
          is_deactivated: false,
          minimum_days_of_stay: 1,
          price_factor: 1,
          category: "STANDARD",
          minimumRooms: 1,
        },
        roomdetails: {
          roomTypeId: 0,
          roomTypeName: "",
          areaInSquareFeet: 0,
          noOfDoubleBed: 0,
          noOfSingleBed: 0,
          maxCapacity: 0,
          propertyId: 0,
          countOfRoomAvailable: 0,
          basicNightlyRate: 0,
          lowResolutionImage: "",
          roomImages: [],
          roomTypeDescription: "",
          occupancyTax: 0,
          flag: true,
          propertyTax: 0,
          amenities: [],
          dateWisePrices: [],
        },
      })
  ),
};

const itinerarySlice = createSlice({
  name: "TripItenary",
  initialState: initialState,
  reducers: {
    updatePackage: (state, action) => {
      state.package = action.payload;

      state.Tax =
        state.package.roomdetails?.occupancyTax +
        state.package.roomdetails?.propertyTax;
      state.basicNightlyRate =
        action.payload.roomdetails?.basicNightlyRate *
        action.payload.promo?.price_factor;
      state.promoName = action.payload.promo?.promotion_title;

      if (state.subtotal === 0) {
        action.payload.roomdetails?.dateWisePrices.map((data: IDatePrice) => {
          state.subtotal += data.price * state.package.promo?.price_factor;
        });
      }
    },
  },
});

export default itinerarySlice;
