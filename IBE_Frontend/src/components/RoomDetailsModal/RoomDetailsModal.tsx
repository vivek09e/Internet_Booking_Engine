import React, { useState } from "react";
import Carousel from "../RoomCard/Carousel/Carousel";
import Package from "./PackageCard/Package";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import "../../Internationalization.tsx";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Dialog,
  Slide,
  Typography,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Tab,
  TextField,
  IconButton,
  Rating,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import "./RoomDetailsModal.scss";
import { IDatePrice, IRoomTypeDetails } from "../../redux/RoomTypeDetailsSlice";
import CardComponents from "./CardComponents/CardComponents";
import FindPromocode from "./FindPromocode/FindPromocode";
import Review from "../ReviewPage/Review/Review";

// To slide the dialog from up
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
interface IRoomDetails {
  roomData: IRoomTypeDetails;
  open: boolean;
  onClose: () => void;
}

const RoomDetailsModal: React.FC<IRoomDetails> = (props) => {
  const promotions = useSelector(
    (state: RootState) => state.promotionReducer.PromoList
  );
  const [value, setValue] = React.useState("1");

  //To handle change in values
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // To check the condition if the PROMOTION is applied on weekend
  function checkWeekend(dateWisePrices: IDatePrice[]): boolean {
    if (dateWisePrices.length >= 7) return true;
    else {
      for (var i = 0; i < dateWisePrices.length; i++) {
        if (
          dateWisePrices[i].date.toLowerCase().includes("saturday") ||
          dateWisePrices[i].date.toLowerCase().includes("sunday")
        )
          return true;
      }
      return false;
    }
  }

  const [promoCode, SetPromoCode] = useState<string>(
    Cookies.get("promo") ?? ""
  );
  const { t } = useTranslation();
  const standard = {
    promotion_id: 0,
    promotion_title: "Standard Rate",
    promotion_description:
      "Spend $10 every night you stay and earn $100 in dining credit at the resort",
    is_deactivated: false,
    minimum_days_of_stay: 0,
    price_factor: 1,
    category: "Standard",
    minimumRooms: 1,
  };

  const viewpoint = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Dialog
        className="room-modal-dialog"
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        onClose={props.onClose}
        BackdropProps={{ style: { backgroundColor: "black", opacity: 0.08 } }}
      >
        <Card className="modal-room-card">
          <CardMedia>
            <Carousel roomtypedetails={props.roomData} imageType="high" />
            <IconButton className="modal-close" onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          </CardMedia>
          <CardContent>
            <Box
              data-testid="room-modal-content"
              className="room-modal-content"
            >
              <Box className="room-modal-left-content">
                <Box className="details">
                  <CardComponents roomData={props.roomData} />
                </Box>
                <Box>{t(props.roomData.roomTypeDescription)}</Box>
                <Box>
                  <Divider />
                </Box>
              </Box>
              <Box className="room-modal-right-content">
                <Box className="review-rating">
                  <Rating
                    name="read-only"
                    value={props.roomData.reviewDto.overAllRating}
                    readOnly
                  />
                </Box>
                Amenities
                {props.roomData.amenities?.map((option) => (
                  <Typography className="amenities" key={option}>
                    <CheckCircleOutlineIcon />
                    {option}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box className="promo-cards">
              <Typography component={"h1"}>Standard Rates</Typography>

              <Box
                data-testid="promo-cards-promos"
                className="promo-cards-promos"
              >
                <Package promo={standard} roomdetails={props.roomData} />
                <Typography component={"h1"}>Deals and Packages</Typography>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      orientation={viewpoint ? "vertical" : "horizontal"}
                      onChange={handleChange}
                    >
                      <Tab label="Standard Deals" value="1" />
                      <Tab label="Exclusive Deals" value="2" />
                      <Tab label="PROMO" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel className="tab-panel" value="1">
                    <Box className="promo-cards-promos">
                      {promotions.map((promo, index) => {
                        return !promo.is_deactivated &&
                          promo.minimum_days_of_stay <=
                            props.roomData.dateWisePrices.length &&
                          promo.category === "Standard" &&
                          (!promo.promotion_title
                            .toLowerCase()
                            .includes("weekend") ||
                            checkWeekend(props.roomData.dateWisePrices)) ? (
                          <Package promo={promo} roomdetails={props.roomData} />
                        ) : (
                          <></>
                        );
                      })}
                    </Box>
                  </TabPanel>
                  <TabPanel className="tab-panel" value="2">
                    <Box className="promo-cards-promos">
                      {promotions.map((promo, index) => {
                        return !promo.is_deactivated &&
                          promo.minimum_days_of_stay <=
                            props.roomData.dateWisePrices.length &&
                          promo.category === "Exclusive" &&
                          promo.minimumRooms <=
                            JSON.parse(Cookies.get("Room") ?? "1") ? (
                          <Package promo={promo} roomdetails={props.roomData} />
                        ) : (
                          <></>
                        );
                      })}
                    </Box>
                  </TabPanel>
                  <TabPanel className="tab-panel" value="3">
                    <Box className="promo-cards-promos">
                      <Typography component={"h2"}>YOUR PROMO CODE</Typography>
                      <TextField
                        hiddenLabel
                        className="promo-cards-textbar"
                        id="filled-hidden-label-small"
                        defaultValue="Small"
                        variant="outlined"
                        value={promoCode}
                        onChange={(e) => {
                          SetPromoCode(e.target.value);
                        }}
                      />
                      <FindPromocode
                        code={promoCode}
                        roomData={props.roomData}
                      />
                    </Box>
                  </TabPanel>
                </TabContext>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};
export default RoomDetailsModal;
