import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStore";
import RoomTypeDetailsSlice, {
  IRoomTypeDetails,
} from "../../../redux/RoomTypeDetailsSlice";
import "../../../Internationalization.tsx";
import { useTranslation } from "react-i18next";
interface IRoomTypeflag {
  flag: Boolean;
}
const RoomTypeFilter: React.FC<IRoomTypeflag> = ({ flag }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //Fetching  room  details
  const roomtypeDetails = useSelector(
    (state: RootState) => state.roomdetailsReducer
  );

  //Function to filter out the room details on the basis of room type
  const handleChange = (event: any, index: number) => {
    let temp: boolean[] = arr;
    let checked = false;
    if (event.target.checked) checked = true;
    temp[index] = checked;
    setArr(temp);
    dispatch(
      RoomTypeDetailsSlice.actions.addInFlagArray({
        checked: checked,
        value: index,
        type: "room",
      })
    );
  };
  const [open, setOpen] = React.useState(false);

  //Function to open the filters
  const handleClick = () => {
    setOpen(!open);
  };
  const [arr, setArr] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  return flag ? (
    <Box className="item-of-filter">
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={t("FilterRoomType")} id="roomTypeFilter" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding id="roomTypeFilter1">
            {roomtypeDetails.RoomTypeDetailsList.map(
              (roomType: IRoomTypeDetails, index: number) => {
                return (
                  <ListItemButton>
                    <Checkbox
                      onChange={(event) => handleChange(event, index)}
                      value={arr[index]}
                      checked={arr[index]}
                      id={"roomtypeFilterComp" + roomType.roomTypeName}
                    />
                    <ListItemText primary={t(roomType.roomTypeName)} />
                  </ListItemButton>
                );
              }
            )}
          </List>
        </Collapse>
      </List>
    </Box>
  ) : null;
};

export default RoomTypeFilter;
