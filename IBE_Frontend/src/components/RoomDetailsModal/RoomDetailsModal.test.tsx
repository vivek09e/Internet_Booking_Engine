import { getByTestId, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/reduxStore";
import RoomDetailsModal from "./RoomDetailsModal";
import Package from "./PackageCard/Package";
import { IDatePrice, IRoomTypeDetails } from "../../redux/RoomTypeDetailsSlice";
import { IPromotion } from "../../redux/PromotionsSlice";

interface IPackage {
  promo: IPromotion;
  roomdetails: IRoomTypeDetails;
}

describe("Room Details Modal", () => {
  test("Rendering Room Details Modal", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          {/* <RoomDetailsModal roomData={data} open={false} onClose=null/> */}
        </Provider>
      </BrowserRouter>
    );
    
    var element = screen.getByText("Amenities");
    expect(element).toBeInTheDocument();

    element = screen.getByText("Standard Rates");
    expect(element).toBeInTheDocument();

    element = screen.getByText("Deals and Packages");
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("button-select-room");
    expect(element).toBeInTheDocument();

    element = screen.getByText("Select Room");
    expect(element).toBeInTheDocument();


    element = screen.getByTestId("room-modal-content");
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("promo-cards-promos");
    expect(element).toBeInTheDocument();

    


  });
});

describe("Package Card", () => {
  test("Rendering Package Card", () => {
    const data: any = {};
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Package {...data} />
        </Provider>
      </BrowserRouter>
    );
  });
});

