import { createSlice } from '@reduxjs/toolkit';
import { RemoveToken, StoreToken } from 'store/auth/auth-config';

const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      StoreToken({
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      });
    },
    logout(state, action) {
      state.isLoggedIn = false;
      RemoveToken();
    },
  },
});

export const AuthenticationActions = AuthenticationSlice.actions;
export default AuthenticationSlice;
