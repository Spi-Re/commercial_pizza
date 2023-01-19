import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryIndex: 0,
  sortType: { name: 'popularity', type: 'rating' },
  sortOrder: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, { payload }) {
      state.categoryIndex = payload;
    },
    setSortType(state, { payload }) {
      state.sortType = payload;
    },
    setSortOrder(state, { payload }) {
      state.sortOrder = payload;
    },
  },
});

export const { setCategory, setSortOrder, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
