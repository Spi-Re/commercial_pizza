import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ISortOrder, ISortType } from './filterSlice';

const BACKEND_URL = 'https://63c56aabf3a73b347855bbb1.mockapi.io';

export type QueryParams = {
  categoryIndex: string;
  searchPizzas: string;
  sortType: ISortType;
  sortOrder: ISortOrder;
  currentPage: number;
};

export const fetchPizza = createAsyncThunk<Pizza[], QueryParams>(
  'pizza/fetchPizzaServer',
  async (params) => {
    const { categoryIndex, searchPizzas, sortType, sortOrder, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `${BACKEND_URL}/pizzas?${categoryIndex}&sortBy=${sortType.type}&order=${sortOrder}${searchPizzas}&p=${currentPage}&l=4`,
    );

    return data;
  },
);

export enum Status {
  FULFILLED = 'fulfilled',
  LOADING = 'loading',
  ERROR = 'error',
}

type Pizza = {
  category: number;
  id: number;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

interface pizzaSliceState {
  pizzas: Pizza[];
  status: Status;
  error: string;
}

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
