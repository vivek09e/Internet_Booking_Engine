import React, { useEffect, useState } from "react";

import { IRoomReviews } from "../../../redux/RoomTypeDetailsSlice";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  IconButton,
  Typography,
  Divider,
  Rating,
  LinearProgress,
  LinearProgressProps,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import "./Review.scss";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

// To slide the dialog from up
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface IReview {
  rating: IRoomReviews;
}

const Review: React.FC<IReview> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  //handle to open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //handle to close dialog
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <InfoIcon fontSize="inherit" />
      </IconButton>

      <Dialog
        className="rate-breakdown-card"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
      >
        <Box className="room-breakdown-title-box">
          <Typography className="rate-breakdown-title">Reviews</Typography>
          <IconButton
            className="rate-breakdown-close"
            onClick={handleClickClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="review-content">
          <Box className="review-left">
            <Typography>Cleanliness</Typography>
            <Box className="progress-bar">
              <LinearProgressWithLabel
                value={props.rating.cleanlinessRating * 20}
              />
            </Box>
          </Box>
          <Box className="review-right">
            <Typography>Facilities</Typography>
            <Box className="progress-bar">
              <LinearProgressWithLabel
                value={props.rating.facilitiesRating * 20}
              />
            </Box>
          </Box>
        </Box>
        <Box className="review-content">
          <Box className="review-left">
            <Typography>Amenities</Typography>
            <Box className="progress-bar">
              <LinearProgressWithLabel
                value={props.rating.amenitiesRating * 20}
              />
            </Box>
          </Box>
          <Box className="review-right">
            <Typography>Service</Typography>
            <Box className="progress-bar">
              <LinearProgressWithLabel
                value={props.rating.serviceRating * 20}
              />
            </Box>
          </Box>
        </Box>
        <Box className="review-content">
          <Box className="review-left">
            <Typography>Value for Money</Typography>
            <Box className="progress-bar">
              <LinearProgressWithLabel
                value={props.rating.valueForMoneyRating * 20}
              />
            </Box>
          </Box>
          <Box className="review-right">
            <Typography>Comfort & Quality</Typography>
            <Box className="progress-bar">
              <LinearProgressWithLabel
                value={props.rating.roomComfortAndQualityRating * 20}
              />
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
export default Review;
