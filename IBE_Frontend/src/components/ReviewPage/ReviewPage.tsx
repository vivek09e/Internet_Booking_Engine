import React, { useEffect } from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import { Box, Button, TextField } from "@mui/material";
import "./ReviewPage.scss";
import { IRoomReviews, submitReview } from "../../redux/RoomTypeDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import Submited from "./Review/Submited";

export default function ReviewPage() {
  const [rate, setRate] = React.useState<number | null>(0);
  const [cleanliness, setCleanliness] = React.useState<number | null>(0);
  const [facilities, setFacilities] = React.useState<number | null>(0);
  const [amenities, setAmenities] = React.useState<number | null>(0);
  const [comfort, setComfort] = React.useState<number | null>(0);
  const [valueForMoney, setValueForMoney] = React.useState<number | null>(0);
  const [service, setService] = React.useState<number | null>(0);
  const [comment, setComment] = React.useState("");
  var CryptoJS = require("crypto-js");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const dispatch = useDispatch();
  const reviewFlag: Boolean = useSelector(
    (state: RootState) => state.roomdetailsReducer.reviewFlag
  );
  useEffect(() => {}, [reviewFlag]);
  const handleClick = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const reviewtId = CryptoJS.AES.decrypt(
      params.reviewId.replaceAll(" ", "+"),
      process.env.REACT_APP_ENCRYPTION_KEY as string
    );
    const originalReviewID = reviewtId.toString(CryptoJS.enc.Utf8);
    const ratings: IRoomReviews = {
      reviewId: +originalReviewID,
      overAllRating: rate as number,
      amenitiesRating: amenities as number,
      cleanlinessRating: cleanliness as number,
      facilitiesRating: facilities as number,
      roomComfortAndQualityRating: comfort as number,
      serviceRating: service as number,
      valueForMoneyRating: valueForMoney as number,
      numberOfReview: 0,
      guestComment: comment,
    };
    dispatch(submitReview(ratings));
  };
  return (
    <Box className="review-booking">
      {reviewFlag ? (
        <Box className="review-booking-box">
          <Typography>Hoping you had a great experience!</Typography>
          <Typography>Please submit your review</Typography>
          <Box className="review-choices">
            <Typography>Cleanliness</Typography>
            <Rating
              name="cleanliness"
              className="room-rating"
              value={cleanliness}
              onChange={(event, newValue) => {
                setCleanliness(newValue);
              }}
            />
          </Box>

          <Box className="review-choices">
            <Typography>Facilities</Typography>
            <Rating
              name="facilities"
              value={facilities}
              onChange={(event, newValue) => {
                setFacilities(newValue);
              }}
            />
          </Box>

          <Box className="review-choices">
            <Typography>Amenities</Typography>
            <Rating
              name="amenities"
              value={amenities}
              onChange={(event, newValue) => {
                setAmenities(newValue);
              }}
            />
          </Box>

          <Box className="review-choices">
            <Typography>Comfort and Quality</Typography>
            <Rating
              name="comfort"
              value={comfort}
              onChange={(event, newValue) => {
                setComfort(newValue);
              }}
            />
          </Box>

          <Box className="review-choices">
            <Typography>Service</Typography>
            <Rating
              name="service"
              value={service}
              onChange={(event, newValue) => {
                setService(newValue);
              }}
            />
          </Box>

          <Box className="review-choices">
            <Typography>Value for Money</Typography>
            <Rating
              name="valueformoney"
              value={valueForMoney}
              onChange={(event, newValue) => {
                setValueForMoney(newValue);
              }}
            />
          </Box>
          <Box className="review-choices">
            <Typography>Overall Rating</Typography>
            <Rating
              name="valueformoney"
              value={rate}
              onChange={(event, newValue) => {
                setRate(newValue);
              }}
            />
          </Box>
          <Box className="review-choices">
            <TextField
              id="outlined-multiline-static"
              fullWidth={true}
              label="Comment"
              multiline
              rows={3}
              defaultValue="Default Value"
              value={comment}
              onChange={handleChange}
            />
          </Box>
          <Button
            variant="contained"
            className="submit-button"
            onClick={handleClick}
          >
            Submit
          </Button>
        </Box>
      ) : (
        <Submited message="Review Submitted! Thank you for you feedback!!" />
      )}
    </Box>
  );
}
