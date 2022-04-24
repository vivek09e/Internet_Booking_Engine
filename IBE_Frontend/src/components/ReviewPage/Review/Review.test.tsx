import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";


import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../redux/reduxStore"
import Review from "./Review";


describe("Review Page", () => {
  test("Testing Review successfully", () => {
    const data: any = {};
    render(
        
      <BrowserRouter>
        <Provider store={store}>
          <Review rating={data}/>
        </Provider>
      </BrowserRouter>
    );
  });

});
