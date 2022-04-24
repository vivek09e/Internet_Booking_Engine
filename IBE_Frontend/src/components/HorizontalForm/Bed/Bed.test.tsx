import { getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../redux/reduxStore";
import Bed from './Bed';

describe("Horizontal Form", () => {
  test("Render Bed successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Bed />
        </Provider>
      </BrowserRouter>
    );
  });

});
