import { getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/reduxStore";
import LandingPageForm from "./LandingPageForm";
import AccessibleRoom from "./utils/AccessibleRoom";
import GuestCard from "./utils/GuestCard";
import PromoCode from "./utils/PromoCode";
import Property from "./utils/Property";
import Room from "./utils/Room";
import RoomTypeFilter from "../RoomSeach/utils/RoomTypeFilter";
import BedTypeFilter from "../RoomSeach/utils/BedTypeFilter";

describe("Landing Form", () => {


  test("Render Accesible Room successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AccessibleRoom flag={data} />
        </Provider>
      </BrowserRouter>
    );
  });

  test("Render Guest Card successfully", () => {
    const data: any = [];
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GuestCard name={data} />
        </Provider>
      </BrowserRouter>
    );
  });

  test("Render Guest Card ", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <PromoCode flag={data} />
        </Provider>
      </BrowserRouter>
    );
  });

  test("Render Guest successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Property flag={data} />
        </Provider>
      </BrowserRouter>
    );
  });

  test("Render  Card successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Room flag={data} />
        </Provider>
      </BrowserRouter>
    );
  });

  test("Rend Card successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RoomTypeFilter flag={data} />
        </Provider>
      </BrowserRouter>
    );
  });

  test("Renderuest Card successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <BedTypeFilter flag={data} />
        </Provider>
      </BrowserRouter>
    );
  });
});
