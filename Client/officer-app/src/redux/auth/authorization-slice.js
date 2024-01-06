import { createSlice } from '@reduxjs/toolkit';

const AuthorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    userInfo: null,
  },
  reducers: {
    updateAuthorization(state, action) {
      state.userInfo = action.payload;
    },
    removeAuthorization(state, action) {
      state.userInfo = '';
    },
  },
});

export const AuthorizationActions = AuthorizationSlice.actions;
export default AuthorizationSlice;
