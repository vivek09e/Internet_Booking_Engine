import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStore";
import Package from "../PackageCard/Package";
import {
  IDatePrice,
  IRoomTypeDetails,
} from "../../../redux/RoomTypeDetailsSlice";
import { Typography } from "@mui/material";
import './FindPromocode.scss';

interface IPromoCode {
  roomData: IRoomTypeDetails;
  code: string;
}

const FindPromocode: React.FC<IPromoCode> = (props): JSX.Element => {
  const promoCodes = useSelector(
    (state: RootState) => state.promocodeReducer.PromoCodes
  );

  const CODE: string = props.code;
    let date: Date = new Date();
    for (var i = 0; i < promoCodes.length; i++) {
      if (promoCodes[i].code === CODE) {
        var dateParts: string[] = promoCodes[i].expiryDate.split("-");
        let expiryDate: Date = new Date(
          +dateParts[2],
          +dateParts[1] - 1,
          +dateParts[0]
        );
        if(expiryDate < date)
        {
          return (
            <Typography data-testid="promo-test" className="warning">
              OOPS! This promocode has expire on {promoCodes[i].expiryDate}. If you think it is a mistake contact our support service.
              <details>
                Support: support@team1hotel.com
              </details>
            </Typography>
          );
        }
        else if (promoCodes[i].minStay <= props.roomData.dateWisePrices.length) {
          const promocodebased = {
            promotion_id: Number(promoCodes[i].id),
            promotion_title: CODE.toString(),
            promotion_description: CODE + " has been applied",
            is_deactivated: false,
            minimum_days_of_stay: promoCodes[i].minStay,
            price_factor: promoCodes[i].priceFactor,
            category: "PROMO",
            minimumRooms: 1,
          };
          return (
            <Package
              data-testid="promo-test"
              promo={promocodebased}
              roomdetails={props.roomData}
            />
          );
        } else {
          return (
            <Typography data-testid="promo-test" className="warning">
              PROMO CODE DOES NOT SATISFIED THE GIVEN TERMS AND CONDITIONS
              <details>
                Minimum days of stay required is {promoCodes[i].minStay}
              </details>
            </Typography>
          );
        }
      }
    }
    return (
      <Typography data-testid="promo-test" className="warning">
        The promo code is invalid
      </Typography>
    );
};

export default FindPromocode;
