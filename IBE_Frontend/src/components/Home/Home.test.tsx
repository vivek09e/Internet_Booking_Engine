import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/reduxStore";


describe("Home", () => {
  test("Rendering Home successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
  });
});
