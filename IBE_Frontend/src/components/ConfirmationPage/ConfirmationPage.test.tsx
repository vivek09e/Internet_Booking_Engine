import { getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ConfirmationPage from "./ConfirmationPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/reduxStore";

describe("Render ConfirmationPage", () => {
  test("Render ConfirmationPage successfully", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ConfirmationPage />
        </Provider>
      </BrowserRouter>
    );
  });
});
