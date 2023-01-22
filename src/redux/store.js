import { configureStore } from '@reduxjs/toolkit';

import searchReducer from './slices/searchSlice';
import filterReducer from './slices/filterSlice';
import paginationReducer from './slices/paginationSlice';
import cartReducer from './slices/cartSlice';

import pizzaSlice from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filter: filterReducer,
    pagination: paginationReducer,
    cart: cartReducer,
    pizzas: pizzaSlice,
  },
});
