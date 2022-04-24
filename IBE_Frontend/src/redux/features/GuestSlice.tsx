import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface IGuest {
  type: string;
  count: number;
}

export interface IGuestState {
  value: IGuest[];
}

const initialState: IGuestState = {
  value: [
    {
      type: "Kids",
      count: 0,
    },
    { type: "Adult", count: 0 },
  ],
};

export const GuestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    flushGuestFilter: (state) => {
      state.value = [];
    },
    isGuestFilter: (state, action) => {
      // state.value.push(action.payload);
    },
    addGuest: (state, action) => {
      state.value.forEach((guest) => {
        if (guest.type === action.payload) {
          guest.count = guest.count + 1;
          Cookies.set(action.payload, JSON.stringify(guest.count));
        }
      });
    },
    substractGuest: (state, action) => {
      state.value.forEach((guest) => {
        if (guest.type === action.payload) {
          guest.count = guest.count - 1;
          Cookies.set(action.payload, JSON.stringify(guest.count));
        }
      });
    },
  },
});

export const { isGuestFilter, addGuest, substractGuest } = GuestSlice.actions;

export default GuestSlice;
