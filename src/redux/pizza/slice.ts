import { createSlice } from '@reduxjs/toolkit';
import { fetchPizza } from './asyncSlice';
import { pizzaSliceState, Status } from './types';

const initialState: pizzaSliceState = {
  pizzas: [],
  status: Status.LOADING,
  error: '',
};

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.pizzas = [];
        state.pizzas.push(...action.payload);
        state.status = Status.FULFILLED;
      })
      .addCase(fetchPizza.rejected, (state, action) => {
        state.pizzas = [];
        state.status = Status.ERROR;

        if (action.error.message) {
          state.error = action.error.message;
        }
      });
  },
});

export default pizzaSlice.reducer;
