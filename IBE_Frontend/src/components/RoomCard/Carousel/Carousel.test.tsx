import { getByTestId, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../redux/reduxStore";
import Carousel from "./Carousel";

describe("Carousel Filter", () => {
  test("Rendering Carousel", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Carousel {...data} />
        </Provider>
      </BrowserRouter>
    );
  });
});
