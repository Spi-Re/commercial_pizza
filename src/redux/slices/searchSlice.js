import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    onChangeSearchValue(state, { payload }) {
      state.value = payload;
    },
  },
});

export const { onChangeSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
