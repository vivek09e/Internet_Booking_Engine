import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import TripItinerary from "./TripItinerary";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../redux/reduxStore";

describe("Tripitinerary", () => {
  test("Render Tripitinerary successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <TripItinerary />
        </Provider>
      </BrowserRouter>
    );
  });
});
