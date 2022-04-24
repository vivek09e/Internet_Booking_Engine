import Cookies from "js-cookie";
import itinerarySlice from "../ItenarySlice";
import reduxStore from "../reduxStore";

describe("iternary testing", () => {
  it("Should return initial state of tax", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = itinerarySlice.reducer(initialState, action);
    expect(result?.Tax).toEqual(0);
  });

  it("Should return all initial state", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = itinerarySlice.reducer(initialState, action);
    expect(result).toEqual({
      basicNightlyRate: 0,
      Tax: 0,
      promoName: "",
      dueAtResort: 0,
      dueNow: 0,
      subtotal: JSON.parse(Cookies.get("s   ubTotal") ?? "0"),
      package: JSON.parse(
        Cookies.get("ItenaryData") ??
          JSON.stringify({
            promo: {
              promotion_id: 0,
              promotion_description: "",
              promotion_title: "",
              is_deactivated: false,
              minimum_days_of_stay: 1,
              price_factor: 1,
              category: "standard",
              minimumRooms: 1,
            },
            roomdetails: {
              roomTypeId: 0,
              roomTypeName: "",
              areaInSquareFeet: 0,
              noOfDoubleBed: 0,
              noOfSingleBed: 0,
              maxCapacity: 0,
              propertyId: 0,
              countOfRoomAvailable: 0,
              basicNightlyRate: 0,
              lowResolutionImage: "",
              roomImages: [],
              roomTypeDescription: "",
              occupancyTax: 0,
              flag: true,
              propertyTax: 0,
              amenities: [],
              dateWisePrices: [],
            },
          })
      ),
    });
  });
  it("Should return all updated state", () => {
    const initialState = undefined;
    const action = itinerarySlice.actions.updatePackage({
      promo: {
        category: "Standard",
        minimumRooms: 1,
        promotion_id: 2,
        promotion_description: "KDU Membership Discount",
        promotion_title: "KDU Membership Discount",
        is_deactivated: false,
        minimum_days_of_stay: 1,
        price_factor: 0.8,
      },
      roomdetails: {
        roomTypeId: 33,
        roomTypeName: "SUPER_DELUXE",
        areaInSquareFeet: 410,
        noOfDoubleBed: 2,
        noOfSingleBed: 0,
        maxCapacity: 4,
        propertyId: 1,
        countOfRoomAvailable: null,
        basicNightlyRate: 120,
        lowResolutionImage: null,
        roomImages: [
          { id: "1", s3Url: null, imageType: "low" },
          {
            id: "2",
            s3Url:
              "https://ibs-team1-image-bucket.s3.amazonaws.com/RoomTypeImages/Type4Image/Type4.jpg",
            imageType: "high",
          },
          {
            id: "3",
            s3Url:
              "https://ibs-team1-image-bucket.s3.amazonaws.com/RoomTypeImages/Type4Image/Type4Image1.jpg",
            imageType: "high",
          },
          {
            id: "4",
            s3Url:
              "https://ibs-team1-image-bucket.s3.amazonaws.com/RoomTypeImages/Type4Image/Type4Image2.jpg",
            imageType: "high",
          },
        ],
        roomTypeDescription:
          "The 29-story Super Delux rooms are smoke free and feature everyday comfort in jewel tones. The 351 sq.ft rooms, located near the pools and the Adventuredome, feature pillow-top mattresses, flat screen TV and Wi-Fi and internet access.",
        occupancyTax: 72,
        flag: true,
        dateWisePrices: [
          { date: "Monday, March 28, 2022", price: 100 },
          { date: "Tuesday, March 29, 2022", price: 100 },
          { date: "Wednesday, March 30, 2022", price: 100 },
          { date: "Thursday, March 31, 2022", price: 100 },
          { date: "Friday, April 1, 2022", price: 100 },
          { date: "Saturday, April 2, 2022", price: 170 },
          { date: "Sunday, April 3, 2022", price: 170 },
        ],
        propertyTax: 79,
        amenities: [
          "Wireless Internet Access",
          "Cable & Pay TV Channels",
          "Alarm Clock",
        ],
      },
    });
    reduxStore.dispatch(itinerarySlice.actions.updatePackage(action));
    const result = itinerarySlice.reducer(initialState, action);
    expect(result.basicNightlyRate).toBeGreaterThanOrEqual(0);
    expect(result.subtotal).toBeGreaterThanOrEqual(0);
    expect(result.package).toEqual({
      promo: {
        category: "Standard",
        minimumRooms: 1,
        promotion_id: 2,
        promotion_description: "KDU Membership Discount",
        promotion_title: "KDU Membership Discount",
        is_deactivated: false,
        minimum_days_of_stay: 1,
        price_factor: 0.8,
      },
      roomdetails: {
        roomTypeId: 33,
        roomTypeName: "SUPER_DELUXE",
        areaInSquareFeet: 410,
        noOfDoubleBed: 2,
        noOfSingleBed: 0,
        maxCapacity: 4,
        propertyId: 1,
        countOfRoomAvailable: null,
        basicNightlyRate: 120,
        lowResolutionImage: null,
        roomImages: [
          { id: "1", s3Url: null, imageType: "low" },
          {
            id: "2",
            s3Url:
              "https://ibs-team1-image-bucket.s3.amazonaws.com/RoomTypeImages/Type4Image/Type4.jpg",
            imageType: "high",
          },
          {
            id: "3",
            s3Url:
              "https://ibs-team1-image-bucket.s3.amazonaws.com/RoomTypeImages/Type4Image/Type4Image1.jpg",
            imageType: "high",
          },
          {
            id: "4",
            s3Url:
              "https://ibs-team1-image-bucket.s3.amazonaws.com/RoomTypeImages/Type4Image/Type4Image2.jpg",
            imageType: "high",
          },
        ],
        roomTypeDescription:
          "The 29-story Super Delux rooms are smoke free and feature everyday comfort in jewel tones. The 351 sq.ft rooms, located near the pools and the Adventuredome, feature pillow-top mattresses, flat screen TV and Wi-Fi and internet access.",
        occupancyTax: 72,
        flag: true,
        dateWisePrices: [
          { date: "Monday, March 28, 2022", price: 100 },
          { date: "Tuesday, March 29, 2022", price: 100 },
          { date: "Wednesday, March 30, 2022", price: 100 },
          { date: "Thursday, March 31, 2022", price: 100 },
          { date: "Friday, April 1, 2022", price: 100 },
          { date: "Saturday, April 2, 2022", price: 170 },
          { date: "Sunday, April 3, 2022", price: 170 },
        ],
        propertyTax: 79,
        amenities: [
          "Wireless Internet Access",
          "Cable & Pay TV Channels",
          "Alarm Clock",
        ],
      },
    });
  });
});
