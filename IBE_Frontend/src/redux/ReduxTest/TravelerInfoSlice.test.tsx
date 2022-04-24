import travelerInfoSlice from "../TravelerInfoSlice";

describe("travelerInfo Redux Testing", () => {
  it("Should return all initial state", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = travelerInfoSlice.reducer(initialState, action);
    expect(result).toEqual({
      travelerInfo: {
        phone: "",
        firstName: "",
        lastName: "",
        middleName: "",
        emailId: "",
        phoneCode: "",
        bookingId: "",
        billingInfo: {
          id: "",
          firstName: "",
          lastName: "",
          middleName: "",
          mailingAddress1: "",
          mailingAddress2: "",
          country: "",
          state: "",
          city: "",
          zip: "",
        },
      },
      payment: {
        cardNumber: "",
        expiryDetails: "",
        cvvCode: 0,
      },
      zipCodeLength: 5,
      zipCodeInfo: {
        query: {
          state: "Delhi",
          country: "INDIA",
        },
        results: [],
      },
      countrycode: "IN",
    });
  });
});
