import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    onChangeSearchValue: (state, value) => {
      state.value = value.payload;
    },
  },
});

export const { onChangeSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
