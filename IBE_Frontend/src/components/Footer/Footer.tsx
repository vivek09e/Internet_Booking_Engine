import React from "react";
import "./Footer.scss";
import { Box, Link, Typography } from "@mui/material";

// To create copyright
function Copyright() {
  return (
    <Typography>
      {"© "}
      {new Date().getFullYear()} Kickdrum
    </Typography>
  );
}

function Footer() {
  return (
    <footer className="footer"> 
      <Box className="footer-box">
        <Copyright />
        <Link className="footer-link" href="/">
          Terms and Conditions
        </Link>
        <Link className="footer-link" href="/">
          Support
        </Link>
      </Box>
    </footer>
  );
}

export default Footer;
