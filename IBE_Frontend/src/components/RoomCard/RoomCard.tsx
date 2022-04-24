import React, { useEffect } from "react";
import Carousel from "./Carousel/Carousel";
import "../../Internationalization.tsx";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import TablePagination from "@mui/material/TablePagination";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { IRoomTypeDetails } from "./../../redux/RoomTypeDetailsSlice";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import IconButton from "@mui/material/IconButton";

import {
  Button,
  CardActions,
  Checkbox,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Card,
  TextField,
  MenuItem,
  Rating,
} from "@mui/material";
import BedRoundedIcon from "@mui/icons-material/BedRounded";
import "./RoomCard.scss";
import RoomDetailsModal from "../RoomDetailsModal/RoomDetailsModal";
import CardComponents from "../RoomDetailsModal/CardComponents/CardComponents";
import Review from "../ReviewPage/Review/Review";

export default function RoomCard() {
  const [checked, setChecked] = React.useState(true);
  const { t } = useTranslation();

  //Handling checkbox
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };
  var cardData = useSelector(
    (state: RootState) => state.roomdetailsReducer.RoomTypeDetailsList
  );
  const [sorting, setSorting] = React.useState("Sort By");

  const handleSortingChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSorting(event.target.value);
  };

  const [desc, setDesc] = React.useState(1);
  const [descFlag, setDescFlag] = React.useState(false);
  const [cardList, setCardList] = React.useState(cardData);

  const handleSort = () => {
    setDesc(-1 * desc);
    setDescFlag(!descFlag);
  };

  // * Sort the cards on the basis of given properties
  useEffect(() => {
    if (sorting === "Price") {
      if (desc > 0)
        setCardList(
          cardList
            .slice()
            .sort((a, b) => a.basicNightlyRate - b.basicNightlyRate)
        );
      else
        setCardList(
          cardList
            .slice()
            .sort((a, b) => b.basicNightlyRate - a.basicNightlyRate)
        );
    }
    if (sorting === "Size") {
      if (desc > 0)
        setCardList(
          cardList
            .slice()
            .sort((a, b) => a.areaInSquareFeet - b.areaInSquareFeet)
        );
      else
        setCardList(
          cardList
            .slice()
            .sort((a, b) => b.areaInSquareFeet - a.areaInSquareFeet)
        );
    }
  }, [sorting, desc]);

  // * To render the card list whenever card data changed
  useEffect(() => {
    setCardList(cardData);
  }, [cardData]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 7));
    setPage(0);
  };

  const sortings = ["Sort By", "Price", "Size"];
  const [open, setOpen] = React.useState(false);
  const [selectedRoomData, setSelectedRoomData] = React.useState<any>({});
  const handleClickOpen = (roomData: IRoomTypeDetails) => {
    setOpen(!open);
    setSelectedRoomData(roomData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Box className="room-result-header">
        <Typography variant="h6">{t("Room Results")}</Typography>
        <Box className="header-right">
          <TablePagination
            component="div"
            className="table-pagination"
            labelRowsPerPage={t("Showing")}
            rowsPerPageOptions={[2, 3, 5, cardList.length]}
            count={cardList.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Typography component={"span"} className="pipe">
            |
          </Typography>
          <TextField
            id="room-result-sort"
            className="room-result-sort"
            InputProps={{ disableUnderline: true }}
            select
            value={sorting}
            onChange={handleSortingChange}
            variant="standard"
          >
            {sortings.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {descFlag ? (
            <IconButton onClick={handleSort} size="small">
              <ArrowDownwardIcon fontSize="inherit" />
            </IconButton>
          ) : (
            <IconButton onClick={handleSort} size="small">
              <ArrowUpwardIcon fontSize="inherit" />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box className="room-card-container">
        {cardList
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((roomdata, index) =>
            roomdata.flag ? (
              <Card key={index} className="room-card">
                <Box>
                  <Carousel roomtypedetails={roomdata} imageType="low" />
                </Box>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    id={"roomSearch" + roomdata.roomTypeName}
                  >
                    {t(roomdata.roomTypeName)}
                  </Typography>
                  <Box className="room-card-rating">
                    <Rating
                      name="read-only"
                      value={roomdata.reviewDto.overAllRating}
                      readOnly
                    />
                    <Review rating={roomdata.reviewDto} />
                  </Box>
                  <CardComponents roomData={roomdata} />
                </CardContent>
                <CardActions>
                  <Box className="more-details">
                    <Button
                      className="select-room-button"
                      data-testid="button-select-room"
                      variant="contained"
                      onClick={(event) => handleClickOpen(roomdata)}
                    >
                      {t("Select Room")}
                    </Button>
                    {open ? (
                      <RoomDetailsModal
                        open={open}
                        onClose={handleClose}
                        roomData={selectedRoomData}
                      />
                    ) : (
                      <></>
                    )}
                  </Box>
                </CardActions>
              </Card>
            ) : (
              <React.Fragment></React.Fragment>
            )
          )}
      </Box>
    </React.Fragment>
  );
}
