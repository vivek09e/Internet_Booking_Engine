import RoomTypeDetailsSlice from "../RoomTypeDetailsSlice";

describe("Room Type Slice Testing", () => {
  it("Should return all initial state", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = RoomTypeDetailsSlice.reducer(initialState, action);
    expect(result.noOfBed).toEqual(1);
  });
});
