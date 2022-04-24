import PromotionSlice from "../PromotionsSlice";

describe("Promotion Slice Testing", () => {
  it("Should return all initial state", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = PromotionSlice.reducer(initialState, action);
    expect(result.PromoList.length).toEqual(0);
  });
});
