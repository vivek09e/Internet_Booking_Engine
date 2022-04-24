import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";


import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reduxStore from "../../../redux/reduxStore";
import Header from "../Header";


describe("Header", () => {
  test("Testing Header successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={reduxStore}>
          <Header name={data} />
        </Provider>
      </BrowserRouter>
    );

    // const HeaderElement = screen.getByText("LOGIN");
    // expect(HeaderElement).toBeInTheDocument();

    const BuildATrip = screen.getByText("BUILD A TRIP");
    expect(BuildATrip).toBeInTheDocument();

    const MyTrips = screen.getByText("MY TRIPS");
    expect(MyTrips).toBeInTheDocument();

    const view = screen.getByTestId("mobile-view");
    expect(view).toBeInTheDocument();


    expect(screen.getByTestId("hamburger")).toHaveClass("hamburger");
  });

});
