import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchBarValue: '',
  currentResults: [],
  cachedSearches: {},
  allPreviousSearches: new Set(),
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchBarValue = action.payload;
    },
    setCurrentResults: (state, action) => {
      state.currentResults = action.payload;
    },
    addCachedSearches: (state, action) => {
      state.cachedSearches[state.searchBarValue] = state.currentResults;
    },
    addAllPreviousSearches: (state) => {
      state.allPreviousSearches.push(state.currentResults);
    },
  },
});

export const {
  setSearchValue,
  setCurrentResults,
  addCachedSearches,
  addAllPreviousSearches,
} = searchSlice.actions;
export default searchSlice.reducer;
