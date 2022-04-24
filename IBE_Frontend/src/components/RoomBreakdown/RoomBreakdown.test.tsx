import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import RoomBreakDown from "./RoomBreakdown";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/reduxStore";

describe("Header", () => {
  test("Testing Header successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RoomBreakDown {...data} />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("Room Breakdown")).toBeInTheDocument();
    expect(screen.getByText("Room Type")).toBeInTheDocument();
    expect(screen.getByText("Nightly Rate (Per Room)")).toBeInTheDocument();
    expect(screen.getByText("Room Total")).toBeInTheDocument();
    expect(screen.getByText("Taxes and Fees (Per Room)")).toBeInTheDocument();
    expect(screen.getByText("Resort Fee:")).toBeInTheDocument();
    expect(screen.getByText("Occupancy Tax:")).toBeInTheDocument();
  });
});
