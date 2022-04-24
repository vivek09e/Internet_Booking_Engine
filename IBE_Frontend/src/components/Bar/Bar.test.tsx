import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Bar from "./Bar";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/reduxStore";

describe("Bar", () => {
  test("Rendering Bar successfully", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Bar pagename={"Book Now"} />
        </Provider>
      </BrowserRouter>
    );
  });
});
