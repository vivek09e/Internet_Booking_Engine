import LandingPageSlice from "../LandingPageSlice";

describe("Landingpage Slice Slice Testing", () => {
  it("Should return all initial state", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = LandingPageSlice.reducer(initialState, action);
    expect(result.property).toEqual("team-1");
  });
});
