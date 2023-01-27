import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pizza, QueryParams } from './types';

const BACKEND_URL = 'https://63c56aabf3a73b347855bbb1.mockapi.io/pizzas';

export const fetchPizza = createAsyncThunk<Pizza[], QueryParams>(
  'pizza/fetchPizzaServer',
  async (params) => {
    const { categoryIndex, searchValue, sortType, sortOrder, currentPage, pizzasPerPage } = params;

    const url = new URL(BACKEND_URL);
    categoryIndex && url.searchParams.set('category', categoryIndex);
    url.searchParams.set('sortBy', sortType.type);
    url.searchParams.set('order', sortOrder);
    url.searchParams.set('search', searchValue);
    url.searchParams.set('p', String(currentPage));
    url.searchParams.set('l', String(pizzasPerPage));

    const { data } = await axios.get<Pizza[]>(url.href);

    return data;
  },
);
