import { getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import RoomCard from "./RoomCard";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/reduxStore";


describe("RoomSearch", () => {
  test("Render BedTypeFilter successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RoomCard />
        </Provider>
      </BrowserRouter>
    );
  });
});
