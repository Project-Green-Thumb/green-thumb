import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  favoritePlants: {},
  favoriteSearch: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPlant: (state) => {},
  },
});

export const { addPlant } = userSlice.actions;
export default userSlice.reducer;
