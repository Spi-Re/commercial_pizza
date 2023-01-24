import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryIndexState: 0,
  sortType: { name: 'popularity', type: 'rating' },
  sortOrder: 'asc',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, { payload }) {
      state.categoryIndexState = payload;
    },
    setSortType(state, { payload }) {
      state.sortType = payload;
    },
    setSortOrder(state, { payload }) {
      state.sortOrder = payload;
    },
  },
});

export const selectFilter = (state) => state.filter;

export const { setCategory, setSortOrder, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
