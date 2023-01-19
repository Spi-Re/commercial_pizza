import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  pagesAmount: 3,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, { payload }) {
      state.currentPage = payload;
    },
    setPagesAmount(state, { payload }) {
      state.pagesAmount = payload;
    },
  },
});

export const { setCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;
