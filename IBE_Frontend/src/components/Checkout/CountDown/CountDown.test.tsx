import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CountDown from "./CountDown";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../redux/reduxStore";

describe("CountDown", () => {
  test("Render CountDown successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CountDown />
        </Provider>
      </BrowserRouter>
    );
  });
});
