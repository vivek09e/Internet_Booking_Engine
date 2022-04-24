import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

interface IProperties {
  id: string;
  tenant_id: string;
  name: string;
  address: string;
  number: string;
  propertyTax: number;
  callTiming: string;
}
interface IPropertyList {
  properties: IProperties[];
  property:IProperties;
}

const intitalState: IPropertyList = {
  properties: [],
  property:{
    id:"1",
    tenant_id:"1",
    name:"Kickdrum",
    address:"add1",
    number:"num",
    propertyTax:50,
    callTiming:""
  }
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState: intitalState,
  reducers: {
    loadProperties: (state, action) => {
      state.properties = action.payload;
    },
    loadProperty:(state,action)=>{
      state.property=action.payload;
    }
  },
});
export const getProperties = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ELASTICBEANSTALKAPI}/property/propertyId/1`,
        {
          headers: {
            Authorization: "" + sessionStorage.getItem("token"),
          },
        }
      );
      dispatch(propertiesSlice.actions.loadProperty(response.data));
    } catch (error) {
      console.log(error);
      console.log("Could not load Data !");
    }
  };
};

export default propertiesSlice;
