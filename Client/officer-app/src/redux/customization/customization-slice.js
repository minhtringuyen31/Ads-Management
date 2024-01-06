import { createSlice } from '@reduxjs/toolkit';
import config from 'config';

const CustomizationSlice = createSlice({
  name: 'customization',
  initialState: {
    isOpen: [],
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
  },
  reducers: {
    MENU_OPEN(state, action) {
      const id = action.id;
      return {
        ...state,
        isOpen: [id],
      };
    },
    SET_MENU(state, action) {
      return {
        ...state,
        opened: action.opened,
      };
    },
    SET_FONT_FAMILY(state, action) {
      return {
        ...state,
        fontFamily: action.fontFamily,
      };
    },
    SET_BORDER_RADIUS(state, action) {
      return {
        ...state,
        borderRadius: action.borderRadius,
      };
    },
  },
});

export const CustomizationActions = CustomizationSlice.actions;
export default CustomizationSlice;
