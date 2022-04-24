import React from "react";
import "./Header.scss";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PublicIcon from "@mui/icons-material/Public";
import { Box, MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import MenuIcon from "@mui/icons-material/Menu";
import "../../Internationalization.tsx";
import { useTranslation } from "react-i18next";
import LandingPageSlice from "../../redux/LandingPageSlice";

// An interface for header
interface headerInterface {
  name: {
    languageList: string[];
    coinSymbolList: string[];
  };
}

function Header(props: headerInterface) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const logo = useSelector((state: RootState) => state.themeReducer.s3LogoUrl);
  const [language, setLanguage] = React.useState("EN");
  const [symbol, setSymbol] = React.useState("$ USD");
  const [open, setOpen] = React.useState(false);

  //To handle change in language
  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.value === "EN") i18n.changeLanguage("en");
    else if (event.target.value === "FR") i18n.changeLanguage("fr");

    setLanguage(event.target.value);
  };

  //To handle change in coin
  const handleCoinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let symbol = event.target.value.substring(0, 1);

    dispatch(LandingPageSlice.actions.updatePriceFactor(symbol));
    setSymbol(event.target.value);
  };

  const [hamburderOpen, setHamburgerOpen] = React.useState(false);

  //Toggle Hamburger
  const toggleEvent = () => {
    setHamburgerOpen(!hamburderOpen);
  };

  return (
    <AppBar className="header">
      <Toolbar className="appbar">
        <img className="logo" src={logo} alt="logo" />
        <Typography variant="h6" component="div" className="hotel-name">
          {t("HotelName")}
        </Typography>
        <Box className="right-appbar">
          <PublicIcon />
          <TextField
            className="header-item"
            inputProps={{ className: "textfield" }}
            InputProps={{ disableUnderline: true }}
            select
            value={language}
            onChange={handleLanguageChange}
            variant="standard"
          >
            {props.name.languageList?.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            className="header-item"
            inputProps={{ className: "textfield" }}
            InputProps={{ disableUnderline: true }}
            select
            value={symbol}
            onChange={handleCoinChange}
            variant="standard"
          >
            {props.name.coinSymbolList?.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box data-testid="mobile-view" className="mobile-view navbar">
          <MenuIcon
            data-testid="hamburger"
            className="hamburger"
            onClick={() => setOpen(!open)}
          />
          {open && (
            <nav>
              <ul>
                <li>
                  <Box data-testid="language" className="language">
                    <PublicIcon />
                    <TextField
                      inputProps={{ className: "textfield" }}
                      InputProps={{ disableUnderline: true }}
                      select
                      value={language}
                      onChange={handleLanguageChange}
                      variant="standard"
                    >
                      {props.name.languageList?.map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </li>
                <li>
                  <TextField
                    className="header-item"
                    inputProps={{ className: "textfield" }}
                    InputProps={{ disableUnderline: true }}
                    select
                    value={symbol}
                    onChange={handleCoinChange}
                    variant="standard"
                  >
                    {props.name.coinSymbolList?.map((option: string) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </li>
              </ul>
            </nav>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
