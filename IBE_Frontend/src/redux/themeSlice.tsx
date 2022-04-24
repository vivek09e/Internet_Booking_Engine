import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

interface ITheme {
  id: string;
  primaryColor: string;
  secondaryColor: string;
  s3LogoUrl: string;
  s3TenantImage: string;
  barImage: string;
  tenant_id: string;
}

const initialState: ITheme = {
  id: "1",
  primaryColor: "#015b57",
  secondaryColor: "#758884",
  s3LogoUrl: "",
  s3TenantImage: "",
  barImage:
    "https://ibs-team1-image-bucket.s3.amazonaws.com/pexels-donald-tong-189296.jpg",
  tenant_id: "",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      state.id = action.payload.id;
      state.primaryColor = action.payload.primaryColor;
      state.secondaryColor = action.payload.secondaryColor;
      state.s3LogoUrl = action.payload.s3LogoUrl;
      state.s3TenantImage = action.payload.s3TenantImage;
      state.tenant_id = action.payload.tenant_id;
    },
  },
});

export const getTheme = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ELASTICBEANSTALKAPI}/theme/1`,
        {
          headers: {
            Authorization: "" + sessionStorage.getItem("token"),
          },
        }
      );
      dispatch(themeSlice.actions.setData(response.data));
    } catch (error) {
      console.log("Could not load Data !");
    }
  };
};
export default themeSlice;
