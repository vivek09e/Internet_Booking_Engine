import React from "react";

import LandingPageSlice from "../../../redux/LandingPageSlice";

import { MenuItem, TextField } from "@mui/material";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStore";
import "../../../Internationalization.tsx";
import { useTranslation } from "react-i18next";

interface IRoom {
  flag: Boolean;
}
const Room: React.FC<IRoom> = ({ flag }) => {
  const { t } = useTranslation();
  const room: number = useSelector(
    (state: RootState) => state.limitsReducer.room
  );
  const roomArray = [];
  for (var i = 1; i <= room; i++) {
    roomArray.push(i);
  }

  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(LandingPageSlice.actions.updateRoom(getRoom));
    Cookies.set("Room", event.target.value as string);
  };
  const getRoom = Cookies.get("Room");
  return flag ? (
    <TextField
      select
      className="roomSelect"
      id="roomFiled"
      value={getRoom}
      label={t("Room")}
      onChange={handleChange}
    >
      {roomArray.map((room) => (
        <MenuItem key={room} value={room} id={"room" + room}>
          {room}
        </MenuItem>
      ))}
    </TextField>
  ) : null;
};

export default Room;
