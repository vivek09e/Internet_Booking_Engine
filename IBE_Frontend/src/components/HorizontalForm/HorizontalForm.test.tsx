import { getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/reduxStore";
import Bed from './Bed/Bed';
import HorizontalForm from "./HorizontalForm";


describe("Horizontal Form", () => {
  test("Render Horizontal Form successfully", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <HorizontalForm />
        </Provider>
      </BrowserRouter>
    );
    const HtmlElement = screen.getByText("Search")
    expect(HtmlElement).toBeInTheDocument();
  });

});
