import { getByTestId, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import BedTypeFilter from "../utils/BedTypeFilter";
import FilterComponent from "../utils/FilterComponent";
import RoomTypeFilter from "../utils/RoomTypeFilter";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../redux/reduxStore";
import RoomSearch from "../RoomSearch";


describe("BedTypeFilter", () => {
  test("Rendering BedTypeFilter", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <BedTypeFilter flag={data} />
        </Provider>
      </BrowserRouter>
    );
  });

  test("Render FilterComponent successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <FilterComponent />
        </Provider>
      </BrowserRouter>
    );
    const Element = screen.getByText("Narrow your Result");
    expect(Element).toBeInTheDocument();
  });

  test("Render RoomTypeFilter successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RoomTypeFilter flag={data} />
        </Provider>
      </BrowserRouter>
    );
    const Element = screen.getByText("Room Type");
    expect(Element).toBeInTheDocument();
  });

  test("Render RoomSearch successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RoomSearch/>
        </Provider>
      </BrowserRouter>
    );
  });
});


