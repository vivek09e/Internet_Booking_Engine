import themeSlice from "../themeSlice";

describe("Theme Slice Testing", () => {
  it("Should return all initial state", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = themeSlice.reducer(initialState, action);
    expect(result).toEqual({
      id: "1",
      primaryColor: "#0d7973",
      secondaryColor: "#758884",
      s3LogoUrl: "",
      s3TenantImage: "",
      barImage:
        "https://ibs-team1-image-bucket.s3.amazonaws.com/pexels-donald-tong-189296.jpg",
      tenant_id: "",
    });
  });
});
