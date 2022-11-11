import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
};

export const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    changeThemeMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { changeThemeMode } = themeModeSlice.actions;
export default themeModeSlice.reducer;
