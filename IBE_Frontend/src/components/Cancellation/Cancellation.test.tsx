import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";


import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/reduxStore"
import Cancellation from "./Cancellation";


describe("Cancellation", () => {
  test("Testing Cancel successfully", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Cancellation />
        </Provider>
      </BrowserRouter>
    );
    const ele = screen.getByText("Cancel this Booking");
    expect(ele).toBeInTheDocument();

    const ele2 = screen.getByText("Keep this Booking");
    expect(ele2).toBeInTheDocument();
  });

});
