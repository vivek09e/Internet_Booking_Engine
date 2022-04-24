import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import "../../../Internationalization.tsx";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStore";
import RoomTypeDetailsSlice from "../../../redux/RoomTypeDetailsSlice";
interface IBedTypeFlag {
  flag: Boolean;
}
const BedTypeFilter: React.FC<IBedTypeFlag> = ({ flag }) => {
  const { t } = useTranslation();

  //Function to open bed type filter
  const [open, setOpen] = React.useState(false);

  //Function to open filter list
  const handleClick = () => {
    setOpen(!open);
  };

  const roomtypeDetails = useSelector(
    (state: RootState) => state.roomdetailsReducer
  );
  const dispatch = useDispatch();
  const [kingBed, setKingbed] = useState<boolean>(false);
  const [queenBed, setQueenBed] = useState<boolean>(false);

  //Function to handle change in Bed
  const handleChangeBed = (event: React.ChangeEvent<HTMLInputElement>) => {
    let checked = false;
    if (event.target.checked) checked = true;
    let bed = event.target.value as string;
    roomtypeDetails.RoomTypeDetailsList.map((room, index: number) => {
      if (bed === "King" && room.noOfDoubleBed > 0) {
        setKingbed(checked);
        dispatch(
          RoomTypeDetailsSlice.actions.addInFlagArray({
            checked: checked,
            value: index,
            type: "bed",
          })
        );
      } else if (bed === "Queen" && room.noOfSingleBed > 0) {
        setQueenBed(checked);
        dispatch(
          RoomTypeDetailsSlice.actions.addInFlagArray({
            checked: checked,
            value: index,
            type: "bed",
          })
        );
      }
    });
  };

  return flag ? (
    <Box className="item-of-filter">
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={t("FilterBedType")} id="bedTypeFilter" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <Checkbox
                onChange={handleChangeBed}
                name="King Bed"
                value="King"
                checked={kingBed}
              />
              <ListItemText primary={"King Bed"} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <Checkbox
                onChange={handleChangeBed}
                name="Queen Bed"
                value="Queen"
                id="queenBedTypeFilter"
                checked={queenBed}
              />
              <ListItemText primary={"Queen Bed"} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  ) : null;
};

export default BedTypeFilter;
