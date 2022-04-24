import { NoDrinksOutlined } from "@mui/icons-material";
import { MenuItem, TextField } from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStore";
import RoomTypeDetailsSlice from "../../../redux/RoomTypeDetailsSlice";

const Bed = () => {
  const noOfBeds = useSelector((state: RootState) => state.limitsReducer.Bed);
  const bedArray: number[] = [];
  for (let i = 1; i <= noOfBeds; i++) {
    bedArray.push(i);
  }
  const dispatch = useDispatch();
  const [bedNo, setBedNo] = useState("1");
  const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    Cookies.set("Bed", event.target.value);
    setBedNo(event.target.value);
    let val: number = +event.target.value;
    dispatch(
      RoomTypeDetailsSlice.actions.alterFlag({
        bedNo: val,
      })
    );
  };
  return (
    <TextField
      select
      className="bedSelect"
      value={bedNo}
      label="Beds"
      onChange={handlechange}
    >
      {bedArray.map((bed) => (
        <MenuItem key={bed} value={bed}>
          {bed}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Bed;
