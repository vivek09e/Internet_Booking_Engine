import React, { useState } from "react";

import Breadcrumb from "../RoomSeach/BreadCrumb/BreadCrumb";
import TripItinerary from "./TripItinerary/TripItinerary";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, createSearchParams } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import * as yup from "yup";
import PhoneInput from "react-phone-number-input";

import travelerInfoSlice, {
  getZipLength,
  IBookingInfo,
  IPostTravelerData,
  postTravelerInfo,
} from "../../redux/TravelerInfoSlice";
import Cookies from "js-cookie";
import CountDown from "./CountDown/CountDown";
import NeedHelp from "./NeedHelp/NeedHelp";

import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  FormControl,
  Button,
  Checkbox,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./Checkout.scss";
import "react-phone-number-input/style.css";
import LandingPageSlice from "../../redux/LandingPageSlice";

export default function Checkout() {
  const checkoutDetails = useSelector(
    (state: RootState) => state.travelerReducer
  );

  const IternaryData = useSelector(
    (state: RootState) => state.tripIternaryReducer
  );

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Email should be valid")
      .required("Email is required"),
    phone: yup.string().min(5).max(15).required("Phone Number is required"),
  });

  const billingschema = yup.object().shape({
    firstNameb: yup.string().required("First Name is required"),
    lastNameb: yup.string().required("Last Name is required"),
    address1: yup.string().required("Address 1 is required"),
    city: yup.string().required("City is required"),
    zip: yup
      .string()
      .min(
        checkoutDetails.zipCodeLength,
        "Must be exactly " + checkoutDetails.zipCodeLength
      )
      .max(
        checkoutDetails.zipCodeLength,
        "Must be exactly " + checkoutDetails.zipCodeLength
      )
      .required("Zip is required"),
  });

  const paymentschema = yup.object().shape({
    cardNumber: yup
      .string()
      .matches(/^[0-9]*$/, "Invalid characters, Only numbers are allowed")
      .min(15)
      .max(16)
      .required("Card Number is required"),
    cvv: yup.string().min(3).max(4).required(),
    expiryMonth: yup.number().required(),
    expiryYear: yup.number().required(),
  });

  const naviagate = useNavigate();

  const {
    register: registerhandleTravelerSubmit,
    handleSubmit: handleTravelerSubmit,
    formState: { errors: travelerError },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit: handleBillingSubmit,
    formState: { errors: billingError },
  } = useForm({
    resolver: yupResolver(billingschema),
  });

  const {
    register: paymentRegister,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentError },
  } = useForm({
    resolver: yupResolver(paymentschema),
  });

  const middleNameField = useSelector(
    (state: RootState) => state.tenantfilterReducer.middleNameField
  );
  const countryCode = useSelector(
    (state: RootState) => state.tenantfilterReducer.phoneEx
  );

  const monthArray = [];
  const currentDate = new Date();
  for (var i = 1; i <= 12; i++) {
    monthArray.push(i);
  }

  const yearArray = [];

  for (
    i = currentDate.getFullYear();
    i <= currentDate.getFullYear() + 10;
    i++
  ) {
    yearArray.push(i % 100);
  }

  const [travelerexpandedPanel, settravelerExpandedPanel] =
    React.useState(true);
  const [billingexpandedPanel, setbillingExpandedPanel] = React.useState(false);
  const [paymentexpandedPanel, setpaymentExpandedPanel] = React.useState(false);

  const dispatch = useDispatch();
  dispatch(LandingPageSlice.actions.updatePageFlag(3));
  const [termsagreed, setTermsAgreed] = React.useState(true);

  const handleCheckedChange = () => {
    setTermsAgreed(!termsagreed);
  };

  const handleBillingInfoSubmit = () => {
    const bookingInfo: IBookingInfo = {
      id: -1,
      adultCount: JSON.parse(Cookies.get("Adult") ?? "0"),
      checkInDate: Cookies.get("checkinDate") as string,
      checkOutDate: Cookies.get("checkoutDate") as string,
      guestId: -1,
      promotionName: tripIternaryDetails.package.promo.promotion_title,
      propertyId: JSON.parse(property.id),
      amountDueAtResort: tripIternaryDetails.dueAtResort,
      childCount: JSON.parse(Cookies.get("Kids") ?? "0"),
      statusId: -1,
      totalCost: tripIternaryDetails.subtotal,
      roomTypeID: tripIternaryDetails.package.roomdetails.roomTypeId,
      numberOfRoom: JSON.parse(Cookies.get("Room") ?? "1"),
      basicNightlyRate:
        tripIternaryDetails.package.roomdetails.basicNightlyRate,
      promoType: tripIternaryDetails.package.promo.category,
    };
    dispatch(travelerInfoSlice.actions.updateBookingInfo(bookingInfo));
    setpaymentExpandedPanel(true);
    setbillingExpandedPanel(false);
  };

  const handleBookingInfoEdit = () => {
    settravelerExpandedPanel(true);
    setbillingExpandedPanel(false);
  };
  const tripIternaryDetails = useSelector(
    (state: RootState) => state.tripIternaryReducer
  );
  const property = useSelector(
    (state: RootState) => state.propertiesReducer.property
  );

  const bookingId: number = useSelector(
    (state: RootState) => state.travelerReducer.cancleInfo.bookingId
  );

  const handlePaymentInfoSubmit = () => {
    const data: IPostTravelerData = {
      travelerInfoDto: checkoutDetails.travelerInfo,
      paymentDto: checkoutDetails.payment,
      bookingDto: checkoutDetails.bookingInfo,
    };
    dispatch(postTravelerInfo(data));
  };

  React.useEffect(() => {
    if (bookingId != -1)
      naviagate({
        pathname: "/confirmation?bookingId=" + bookingId,
      });
  }, [bookingId]);

  const handlePaymentInfoEdit = () => {
    setpaymentExpandedPanel(false);
    setbillingExpandedPanel(true);
  };

  const handleChange = (event: any, filed: string) => {
    dispatch(
      travelerInfoSlice.actions.updateInfo({
        filed: filed,
        value: event.target.value,
      })
    );
  };
  const [travlerNAme, setTravlerNAme] = useState<string | any>();
  const [travelerMiddleName, setTravelerMiddleName] = useState<string | any>();
  const [travelerLastName, setTravelerLastName] = useState<string | any>();
  const [travelerEmailId, setTravelerEmailId] = useState<string | any>();
  const [travelerPhone, setTravelerPhone] = useState<string | any>();
  const [billingFirstName, setbillingFirstName] = useState<string | any>();
  const [billingMiddleName, setBillingMiddleName] = useState<string | any>();
  const [billingLastName, setBillingLastName] = useState<string | any>();
  const [billingadd1, setBillingadd1] = useState<string | any>();
  const [billingadd2, setBillingadd2] = useState<string | any>();
  const [billingcity, setBillingcity] = useState<string | any>();
  const [billingzip, setBillingzip] = useState<string | any>();
  const [payCardNum, setPayCardNum] = useState<string | any>();
  const [payExpiryMM, setPayExpiryMM] = useState<number | any>();
  const [payExpiryYY, setPayExpiryYY] = useState<number | any>();
  const [payCvv, setPayCvv] = useState<number | any>();

  const [country, selectCountry] = useState("");
  const [region, selectRegion] = useState("");

  const handleTravelerInfoSubmit = () => {
    settravelerExpandedPanel(false);
    setbillingExpandedPanel(true);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Box className="checkout-page">
      <Breadcrumb activeSteps={3} />
      <Box className="checkout-page-container">
        <Box className="checkout-page-left-container">
          <Typography component={"h2"}>Checkout</Typography>
          <Accordion expanded={travelerexpandedPanel}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>1.Traveler Info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl className="traveler-info-form">
                <Box className="form-box">
                  <TextField
                    {...registerhandleTravelerSubmit("firstName")}
                    required
                    fullWidth={true}
                    name="firstName"
                    id="FirstName"
                    label="First Name"
                    variant="outlined"
                    value={travlerNAme}
                    error={travelerError.firstName?.message}
                    helperText={travelerError.firstName?.message}
                    onChange={(event) => {
                      setTravlerNAme(event.target.value);
                      handleChange(event, "travelerFirstName");
                    }}
                  />
                  {middleNameField ? (
                    <TextField
                      fullWidth={true}
                      id="MiddleName"
                      label="Middle Name"
                      variant="outlined"
                      value={travelerMiddleName}
                      onChange={(event) => {
                        setTravelerMiddleName(event.target.value);
                        handleChange(event, "travelerMiddleName");
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <TextField
                    required
                    {...registerhandleTravelerSubmit("lastName")}
                    fullWidth={true}
                    id="LastName"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    error={travelerError.lastName?.message}
                    helperText={travelerError.lastName?.message}
                    value={travelerLastName}
                    onChange={(event) => {
                      setTravelerLastName(event.target.value);
                      handleChange(event, "travelerLastName");
                    }}
                  />
                </Box>

                <Box className="form-box">
                  <TextField
                    id="Phone"
                    fullWidth={true}
                    required
                    label="Phone"
                    type="number"
                    variant="outlined"
                    value={travelerPhone}
                    error={travelerError.phone?.message}
                    helperText={travelerError.phone?.message}
                    {...registerhandleTravelerSubmit("phone")}
                    onChange={(event) => {
                      setTravelerPhone(event.target.value);
                      handleChange(event, "phoneNumber");
                    }}
                  />
                </Box>
                <TextField
                  id="Email"
                  label="Email"
                  required
                  fullWidth={true}
                  {...registerhandleTravelerSubmit("email")}
                  error={travelerError.email?.message}
                  helperText={travelerError.email?.message}
                  name="email"
                  variant="outlined"
                  value={travelerEmailId}
                  onChange={(event) => {
                    setTravelerEmailId(event.target.value);
                    handleChange(event, "emailID");
                  }}
                />
                <Button
                  type="submit"
                  onClick={handleTravelerSubmit(handleTravelerInfoSubmit)}
                  className="form-button"
                  variant="contained"
                >
                  Next: Billing Info
                </Button>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={billingexpandedPanel}>
            <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>2. Billing Info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl className="traveler-info-form">
                <Box className="form-box">
                  <TextField
                    fullWidth={true}
                    required
                    {...register("firstNameb")}
                    error={billingError.firstNameb?.message}
                    helperText={billingError.firstNameb?.message}
                    id="FirstName"
                    label="First Name"
                    variant="outlined"
                    value={billingFirstName}
                    onChange={(event) => {
                      setbillingFirstName(event.target.value);
                      handleChange(event, "billingFirstName");
                    }}
                  />
                  {middleNameField ? (
                    <TextField
                      fullWidth={true}
                      id="MiddleName"
                      label="Middle Name"
                      variant="outlined"
                      value={billingMiddleName}
                      onChange={(event) => {
                        setBillingMiddleName(event.target.value);
                        handleChange(event, "billingMiddleName");
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <TextField
                    required
                    fullWidth={true}
                    {...register("lastNameb")}
                    error={billingError.lastNameb?.message}
                    helperText={billingError.lastNameb?.message}
                    id="LastName"
                    label="Last Name"
                    variant="outlined"
                    value={billingLastName}
                    onChange={(event) => {
                      setBillingLastName(event.target.value);
                      handleChange(event, "billingLastName");
                    }}
                  />
                </Box>
                <Box className="form-box">
                  <TextField
                    fullWidth={true}
                    required
                    id="address-1"
                    {...register("address1")}
                    error={billingError.address1?.message}
                    helperText={billingError.address1?.message}
                    label="Mailing Address 1"
                    variant="outlined"
                    value={billingadd1}
                    onChange={(event) => {
                      setBillingadd1(event.target.value);
                      handleChange(event, "billingAdd1");
                    }}
                  />
                  <TextField
                    fullWidth={true}
                    id="address-2"
                    label="Mailing Address 2"
                    variant="outlined"
                    value={billingadd2}
                    onChange={(event) => {
                      setBillingadd2(event.target.value);
                      handleChange(event, "billingAdd2");
                    }}
                  />
                </Box>
                <Box className="country-state">
                  <CountryDropdown
                    classes="country-dropdown"
                    value={country}
                    onChange={(val) => {
                      selectCountry(val);
                      dispatch(
                        travelerInfoSlice.actions.updateInfo({
                          filed: "billingCountry",
                          value: val,
                        })
                      );
                    }}
                    valueType="short"
                  />
                  <RegionDropdown
                    classes="region-dropdown"
                    defaultOptionLabel="Select State"
                    countryValueType="short"
                    country={country}
                    value={region}
                    onChange={(val) => {
                      selectRegion(val);
                      dispatch(getZipLength(country, val));
                      dispatch(
                        travelerInfoSlice.actions.updateInfo({
                          filed: "billingState",
                          value: val,
                        })
                      );
                    }}
                  />
                </Box>

                <Box className="form-box">
                  <TextField
                    fullWidth={true}
                    id="city"
                    {...register("city")}
                    error={billingError.city?.message}
                    helperText={billingError.city?.message}
                    label="City"
                    variant="outlined"
                    value={billingcity}
                    onChange={(event) => {
                      setBillingcity(event.target.value);
                      handleChange(event, "billingCity");
                    }}
                  />
                  <TextField
                    fullWidth={true}
                    id="zip"
                    {...register("zip")}
                    type="number"
                    error={billingError.zip?.message}
                    helperText={billingError.zip?.message}
                    label="Zip"
                    variant="outlined"
                    value={billingzip}
                    onChange={(event) => {
                      setBillingzip(event.target.value);
                      handleChange(event, "billingZip");
                    }}
                  />
                </Box>
                <Box className="form-buttons">
                  <Button
                    onClick={handleBookingInfoEdit}
                    className="form-button-edit"
                    variant="outlined"
                  >
                    Edit Traveler Info
                  </Button>
                  <Button
                    onClick={handleBillingSubmit(handleBillingInfoSubmit)}
                    className="form-button"
                    variant="contained"
                  >
                    Next: Payment Info
                  </Button>
                </Box>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={paymentexpandedPanel}>
            <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>3. Payment Info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl className="traveler-info-form">
                <Box className="form-box">
                  <TextField
                    fullWidth={true}
                    id="cardNumber"
                    label="Card Number"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    {...paymentRegister("cardNumber")}
                    error={paymentError.cardNumber?.message}
                    helperText={paymentError.cardNumber?.message}
                    value={payCardNum}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={(event) => {
                      setPayCardNum(event.target.value);
                      handleChange(event, "paymentCardNumber");
                    }}
                  />
                  <Box className="expiry">
                    <TextField
                      select
                      className="expiry-text"
                      variant="standard"
                      size="small"
                      {...paymentRegister("expiryMonth")}
                      error={paymentError.expirymonth?.message}
                      helperText={paymentError.expirymonth?.message}
                      InputProps={{ disableUnderline: true }}
                      label="MM"
                      value={payExpiryMM}
                      onChange={(event) => {
                        setPayExpiryMM(event.target.value);
                        handleChange(event, "paymentExpiryMonth");
                      }}
                    >
                      {monthArray.map((month) => (
                        <MenuItem key={month} value={month}>
                          {month}
                        </MenuItem>
                      ))}
                    </TextField>
                    /
                    <TextField
                      select
                      className="expiry-text"
                      variant="standard"
                      {...paymentRegister("expiryYear")}
                      error={paymentError.expiryyear?.message}
                      helperText={paymentError.expiryyear?.message}
                      InputProps={{ disableUnderline: true }}
                      size="small"
                      label="YY"
                      value={payExpiryYY}
                      onChange={(event) => {
                        setPayExpiryYY(event.target.value);
                        handleChange(event, "paymentExpiryYY");
                      }}
                    >
                      {yearArray.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <TextField
                    fullWidth={true}
                    id="CVV"
                    type="number"
                    label="CVV Code"
                    variant="outlined"
                    {...paymentRegister("cvv")}
                    error={paymentError.cvv?.message}
                    helperText={paymentError.cvv?.message}
                    value={payCvv}
                    onChange={(event) => {
                      setPayCvv(event.target.value);
                      handleChange(event, "paymentCvvCode");
                    }}
                  />
                </Box>
                <Box>
                  <Typography>
                    Check-In: 3:00 PM;Check-Out: 11:00 AM. You have the option
                    to change your check out date at any time prior to check-in
                    or at check-in without being charged an early departure
                    assessment. However, in the event you decide to check out
                    prior to your confirmed departure date, you will be charged
                    an early departure assessment in the amount equal to the
                    applicable rate and taxes you were quoted for the night you
                    are departing. None of the above related to changes to
                    check-out date applies to Advance Purchase, Non-refundable
                    bookings. Self-parking at Circus Circus is complimentary for
                    all guests and visitors. Valet parking incurs a nominal fee.
                    Estimated taxes are based on the current tax rate (subject
                    to change as permitted by applicable law). Additional taxes,
                    if any, will be due upon check-in. Credit Card deposit of
                    $25 per night, maximum of $100 is required for all
                    reservations, at check in.
                  </Typography>
                  <Typography>
                    <Checkbox onChange={handleCheckedChange} /> I agree to the
                    terms and policies of the traveler.
                  </Typography>
                </Box>
                <Button
                  onClick={handlePaymentInfoEdit}
                  className="form-button-edit"
                  variant="outlined"
                >
                  Edit Billing Info
                </Button>
                <Typography className="total-due">
                  Total Due: $
                  {IternaryData.subtotal +
                    IternaryData.package.roomdetails.occupancyTax}
                </Typography>
                <Button
                  disabled={termsagreed}
                  onClick={handlePaymentSubmit(handlePaymentInfoSubmit)}
                  className="form-button"
                  variant="contained"
                >
                  Complete Reservations and Accept Terms
                </Button>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className="checkout-page-right-container">
          <TripItinerary />
          <NeedHelp />
        </Box>
      </Box>
      <Typography className="due-at">
        Due at Resort: ${IternaryData.package.roomdetails.propertyTax}
      </Typography>
      <CountDown />
    </Box>
  );
}
