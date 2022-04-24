import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStore";

import TextField from "@mui/material/TextField";
import { DateRange } from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import DateRangePickerDay, {
  DateRangePickerDayProps,
} from "@mui/lab/DateRangePickerDay";
import { Grid, Typography } from "@mui/material";
import { DesktopDateRangePicker } from "@mui/lab";
import LandingPageSlice from "../../../redux/LandingPageSlice";

export default function Calender() {
  const currencyFactor = useSelector(
    (state: RootState) => state.landingPageReducer
  );

  const dispatch = useDispatch();
  const flag = useSelector((state: RootState) => state.limitsReducer.loading);

  useEffect(() => {}, [currencyFactor]);
  const los = useSelector((state: RootState) => state.limitsReducer.LOS);
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const [rate, setRate] = useState([]);
  var dNow = new Date();
  var currentDate =
    dNow.getMonth() + "/" + dNow.getDate() + "/" + dNow.getFullYear();

  // To fetch the data of calender
  const fetchData = () => {
    const PATH_GET_MIN_DATE: string = `${process.env.REACT_APP_ELASTICBEANSTALKAPI}/GetMinRate`;
    fetch(PATH_GET_MIN_DATE, {
      method: "GET",
      headers: {
        Authorization: "" + sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((rate) => {
        setRate(rate);
      });
  };

  useEffect(() => {
    let val = Cookies.get("Date");
    if (val) {
      setValue(JSON.parse(val));
    }
  }, []);
  function dateCompare(d1: string, d2: string) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    if (date1 >= date2) {
      return true;
    } else return false;
  }

  useEffect(() => {
    if (!flag) fetchData();
  }, [flag]);
  const renderWeekPickerDay = (
    date: Date,

    dateRangePickerDayProps: DateRangePickerDayProps<Date>
  ) => {
    return (
      <div>
        <DateRangePickerDay
          {...dateRangePickerDayProps}
          className="box-datepickup"
        >
          <Grid>
            <Grid container justifyContent="end">
              <Typography className="date-calender">
                {date.getDate()}
              </Typography>
            </Grid>
            <Grid>
              {rate[
                (
                  ("0" + date.getDate()).slice(-2).toString() +
                  "-" +
                  ("0" + (date.getMonth() + 1)).slice(-2).toString() +
                  "-" +
                  date.getFullYear().toString()
                ).toString() as any
              ] &&
              dateCompare(
                date.getMonth() +
                  "/" +
                  date.getDate() +
                  "/" +
                  date.getFullYear(),
                currentDate
              ) ? (
                <Typography className="rate-calender">
                  {currencyFactor.cur}
                  {Math.round(
                    rate[
                      (
                        ("0" + date.getDate()).slice(-2).toString() +
                        "-" +
                        ("0" + (date.getMonth() + 1)).slice(-2).toString() +
                        "-" +
                        date.getFullYear().toString()
                      ).toString() as any
                    ] * currencyFactor.priceFactor
                  )}
                </Typography>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </DateRangePickerDay>
      </div>
    );
  };

  function addDays(date: Date | null, days: number) {
    if (date == null) return undefined;
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  return (
    <Box className="Calender">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDateRangePicker
          startText="Check-in"
          endText="Check-out"
          disablePast
          value={value}
          maxDate={addDays(value[0], los)}
          onChange={(newValue: any) => {
            setValue(newValue);
            let arr: Date[] = [];
            arr.push(new Date(newValue[0]));
            arr.push(new Date(newValue[1]));
            arr[0].setDate(arr[0].getDate() + 1);
            arr[1].setDate(arr[1].getDate() + 1);
            dispatch(LandingPageSlice.actions.updateCheckinDate(newValue[0]));
            dispatch(LandingPageSlice.actions.updateCheckOutDate(newValue[1]));
            Cookies.set("checkinDate", JSON.stringify(arr[0]), {
              expires: 2,
            });
            Cookies.set("checkoutDate", JSON.stringify(arr[1]), {
              expires: 2,
            });

            Cookies.set("Date", JSON.stringify(newValue), { expires: 2 });
            Cookies.set("Dates", JSON.stringify(arr), { expires: 2 });
          }}
          className="desktop-range-picker"
          renderDay={renderWeekPickerDay}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box data-testid="daypicker-id" sx={{ mx: 2 }}>
                {" "}
                to{" "}
              </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}
