import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";


import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../redux/reduxStore"
import Submited from "./Submited";



describe("Review Page", () => {
  test("Testing Review successfully", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Submited message=""/>
        </Provider>
      </BrowserRouter>
    );
  });

});
