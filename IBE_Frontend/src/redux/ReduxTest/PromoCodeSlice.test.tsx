import PromoCodeSlice from "../PromoCodeSlice";

describe("PromoCode Slice Testing", () => {
  it("Should return all initial state", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = PromoCodeSlice.reducer(initialState, action);
    expect(result.PromoCodes.length).toEqual(0);
  });
});
