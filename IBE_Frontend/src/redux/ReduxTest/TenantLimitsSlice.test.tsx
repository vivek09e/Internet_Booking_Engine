import tenantLimitsSlice from "../tenantLimits";

describe("tenantLimit Slice Testing", () => {
  it("Should return all initial state", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = tenantLimitsSlice.reducer(initialState, action);
    expect(result).toEqual({
      Kid: 1,
      Adult: 1,
      Child: 1,
      room: 1,
      LOS: 14,
      Bed: 2,
      loading: true,
    });
  });
});
