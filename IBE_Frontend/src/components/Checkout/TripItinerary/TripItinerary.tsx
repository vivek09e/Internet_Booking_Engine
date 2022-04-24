import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStore";

import { Box, Button, Divider, Typography } from "@mui/material";

import "./TripItinerary.scss";
import RoomBreakdown from "../../RoomBreakdown/RoomBreakdown";
import { createSearchParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PromoCard from "../PromoDialog/PromoDialog";
import { useEffect } from "react";
import { ITripItinerary } from "../../../redux/ItenarySlice";

export default function TripItinerary() {
  var propertyInfo = useSelector((state: RootState) => state.propertiesReducer);
  var data = useSelector((state: RootState) => state.landingPageReducer);
  const IternaryData: ITripItinerary = {
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
  const LandingPageData = useSelector(
    (state: RootState) => state.landingPageReducer
  );
  const naviagate = useNavigate();
  const handleClickRemove = () => {
    Cookies.set("IternaryFlag", "0");
    naviagate({
      pathname: "/",
    });
  };
  const handleClickSearch = () => {
    const param = {
      property: Cookies.get("property") ?? " ",
      checkinDate: JSON.parse(Cookies.get("checkinDate") ?? " "),
      checkoutDate: JSON.parse(Cookies.get("checkoutDate") ?? " "),
      guests: LandingPageData.guests,
      rateType: Cookies.get("RateType") ?? " ",
      room: Cookies.get("Room") ?? " ",
      promocode: Cookies.get("promo") ?? " ",
      assistSupport: Cookies.get("assit") ?? " ",
    };

    naviagate({
      pathname: "/search",
      search: `?${createSearchParams(param)}`,
    });
  };
  const handleClickCheckout = () => {
    naviagate({
      pathname: "/checkout",
    });
  };

  const guestData = useSelector((state: RootState) => state.guest.value);
  let arr: string[] = [];
  const page: number = useSelector(
    (state: RootState) => state.landingPageReducer.pageFlag
  );
  useEffect(() => {}, [page]);
  useEffect(() => {}, [IternaryData.subtotal]);

  return (
    <Box className="trip-itinerary-container">
      <Box className="trip-itinerary">
        <Box className="trip-itinerary-header-container">
          <Typography className="bold-text">Your Trip Itinerary</Typography>
          <Button className="remove-button" onClick={handleClickRemove}>
            Remove
          </Button>
        </Box>
        <Box className="trip-itinerary-content-container">
          <Typography className="bold-text">
            {propertyInfo.property.name}
          </Typography>
          <Typography className="light-text">
            {data.checkinDate.toString().slice(4, 10) +
              " - " +
              data.checkoutDate.toString().slice(4, 15) +
              " | "}{" "}
            {guestData.map((option, index) => {
              if (!arr.includes(option.type)) {
                arr.push(option.type);
                let count: number = JSON.parse(Cookies.get(option.type) ?? "0");
                if (count > 0) return count + " " + option.type + " ";
              }
            })}
          </Typography>

          <Typography className="light-text">
            {IternaryData.package.roomdetails.roomTypeName}
          </Typography>
          <Typography className="light-text">
            ${IternaryData.package.roomdetails.basicNightlyRate}/night
          </Typography>
          <Typography className="light-text">
            {Cookies.get("Room")} room
          </Typography>
          <Typography className="light-text">
            {IternaryData.package.promo.promotion_title +
              ", $" +
              Math.round(
                IternaryData.package.roomdetails.basicNightlyRate *
                  IternaryData.package.promo.price_factor
              )}
            /night <PromoCard {...IternaryData} />
          </Typography>
          <Divider className="divider" />
          <Box className="price-data">
            <Box className="price-data-content">
              <Typography className="light-text">
                Subtotal
                <RoomBreakdown
                  promo={IternaryData.package.promo}
                  roomdetails={IternaryData.package.roomdetails}
                />
              </Typography>{" "}
              <Typography>${IternaryData.subtotal}</Typography>
            </Box>
            <Box className="price-data-content">
              <Typography className="light-text">
                Taxes, Surcharges, Fees
              </Typography>
              <Typography>
                ${IternaryData.package.roomdetails.occupancyTax}
              </Typography>
            </Box>
          </Box>
          <Divider className="divider" />
          <Box className="price-data">
            <Box className="price-data-content">
              <Typography className="light-text">Due Now</Typography>{" "}
              <Typography>
                $
                {IternaryData.subtotal +
                  IternaryData.package.roomdetails.occupancyTax}
              </Typography>
            </Box>
            <Box className="price-data-content">
              <Typography className="light-text">Due At Resort</Typography>{" "}
              <Typography>
                ${IternaryData.package.roomdetails.propertyTax}
              </Typography>
            </Box>
          </Box>
          <Box className="continue-button">
            {page === 2 ? (
              <Button
                className="continue-btn remove-button"
                onClick={handleClickCheckout}
              >
                GO TO CHECKOUT
              </Button>
            ) : (
              <></>
            )}
            {page === 3 ? (
              <Button
                className="continue-btn remove-button"
                onClick={handleClickSearch}
              >
                Continue Searching
              </Button>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
