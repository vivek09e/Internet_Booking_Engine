import { configureStore } from "@reduxjs/toolkit";
import ConfirmationSlice from "./ConfirmationPageSlice";
import GuestSlice from "./features/GuestSlice";
import tenantDetailSlice from "./features/tenantDetailsSlice";
import itinerarySlice from "./ItenarySlice";
import LandingPageSlice from "./LandingPageSlice";
import PromoCodeSlice from "./PromoCodeSlice";
import PromotionSlice from "./PromotionsSlice";
import propertiesSlice from "./PropertiesSlice";
import RoomTypeDetailsSlice from "./RoomTypeDetailsSlice";
import tenantLimitsSlice from "./tenantLimits";
import themeSlice from "./themeSlice";
import travelerInfoSlice from "./TravelerInfoSlice";

const reduxStore = configureStore({
  reducer: {
    tenantfilterReducer: tenantDetailSlice.reducer,
    landingPageReducer: LandingPageSlice.reducer,
    themeReducer: themeSlice.reducer,
    guest: GuestSlice.reducer,
    limitsReducer: tenantLimitsSlice.reducer,
    roomdetailsReducer: RoomTypeDetailsSlice.reducer,
    promotionReducer: PromotionSlice.reducer,
    promocodeReducer: PromoCodeSlice.reducer,
    travelerReducer: travelerInfoSlice.reducer,
    propertiesReducer: propertiesSlice.reducer,
    tripIternaryReducer: itinerarySlice.reducer,
    confirmationPageSlice: ConfirmationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>;
export type Dispatch = typeof reduxStore.dispatch;
