import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Checkout from "./Checkout";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/reduxStore";

describe("Checkout", () => {
  test("Render Checkout successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Checkout />
        </Provider>
      </BrowserRouter>
    );
  });
});
