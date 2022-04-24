import React from "react";
import "./Home.scss";
import { Box } from "@mui/material";
import LandingPageForm from "../LandingPageForm/LandingPageForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";

function Home() {
  //Home theme from tenant
  const theme = useSelector((state: RootState) => state.themeReducer);
  return (
    <Box className="home">
      <img src={theme.s3TenantImage} alt="hotelImage" />
      <LandingPageForm />
    </Box>
  );
}

export default Home;
