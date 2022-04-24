import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import PromoDialog from "./PromoDialog";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../redux/reduxStore";

describe("CountDown", () => {
  test("Render CountDown successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <PromoDialog {...data}/>
        </Provider>
      </BrowserRouter>
    );
  });
});
