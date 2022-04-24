import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Box, CardMedia, Typography } from "@mui/material";
import RoomBreakdown from "../../RoomBreakdown/RoomBreakdown";
import {
  IRoomImage,
  IDatePrice,
  IRoomTypeDetails,
} from "../../../redux/RoomTypeDetailsSlice";
import "../../../Internationalization.tsx";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Carousel.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStore";

interface IRoomDetails {
  roomtypedetails: IRoomTypeDetails;
  imageType: string;
}

const Carousel: React.FC<IRoomDetails> = (props) => {
  const { t } = useTranslation();

  //Price Factor for currency conversion
  const currencyFactor = useSelector(
    (state: RootState) => state.landingPageReducer
  );

  useEffect(() => {}, [currencyFactor]);
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
    >
      {props.roomtypedetails.roomImages.map(
        (Image, index) =>
          Image.imageType == props.imageType && (
            <SwiperSlide key={index}>
              <CardMedia
                className="card-image"
                component="img"
                image={Image.s3Url}
                alt="Room Image"
              />
              <Box top={152} left={0} className="on-card-price">
                <Box className="price-box">
                  <Box className="card-rate-card">
                    <Box className="card-price-container">
                      <Box className="card-prices">
                        <Typography component={"h1"}>
                          {currencyFactor.cur}
                          {Math.round(
                            props.roomtypedetails.basicNightlyRate *
                              currencyFactor.priceFactor
                          )}
                        </Typography>
                        <Typography
                          className="card-price-container-del"
                          component={"del"}
                        >
                          {currencyFactor.cur}
                          {Math.round(
                            props.roomtypedetails.basicNightlyRate *
                              currencyFactor.priceFactor
                          )}
                        </Typography>
                      </Box>
                      <Box className="per-night">
                        <Typography component={"small"}>
                          {t("per night")}
                        </Typography>
                        <RoomBreakdown roomdetails={props.roomtypedetails} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box top={250} left={16} className="property-name">
                <Typography component={"h1"}>
                  {t(props.roomtypedetails.roomTypeName)}
                </Typography>
              </Box>
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
};
export default Carousel;
