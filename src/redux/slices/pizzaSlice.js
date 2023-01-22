import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
const BACKEND_URL = 'https://63c56aabf3a73b347855bbb1.mockapi.io';

export const fetchPizza = createAsyncThunk('pizza/fetchPizzaServer', async (params) => {
  const { categoryIndex, searchPizzas, sortType, sortOrderBy, currentPage } = params;
  const { data } = await axios.get(
    `${BACKEND_URL}/pizzas?${categoryIndex}&sortBy=${sortType.type}&order=${sortOrderBy}${searchPizzas}&p=${currentPage}&l=4`,
  );

  return data;
});

const initialState = {
  pizzas: [],
  loading: false,
  error: null,
};

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('pizza/fetchPizzaServer/pending', (state) => {
        state.loading = true;
      })
      .addCase('pizza/fetchPizzaServer/fulfilled', (state, action) => {
        state.pizzas = [];
        state.pizzas.push(...action.payload);
        state.loading = false;
      })
      .addCase('pizza/fetchPizzaServer/rejected', (state, action) => {
        state.pizzas = [];
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pizzaSlice.reducer;
