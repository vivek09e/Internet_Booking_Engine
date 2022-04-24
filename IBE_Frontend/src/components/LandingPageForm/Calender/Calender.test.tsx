import { getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Calender from './Calender';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../redux/reduxStore";

describe("Render Calender",()=>{
    test("Render calender successfully", () => {
        render(
          <BrowserRouter>
            <Provider store={store}>
              <Calender />
            </Provider>
          </BrowserRouter>
        );
        expect(screen.getByTestId("daypicker-id")).toBeInTheDocument();
      });
})