import { configureStore } from '@reduxjs/toolkit';
import AuthenticationSlice from './auth/authentication-slice';
import AuthorizationSlice from './auth/authorization-slice';
import CustomizationSlice from './customization/customization-slice';

const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice.reducer,
    authorization: AuthorizationSlice.reducer,
    customization: CustomizationSlice.reducer,
  },
});

export default store;
