import { ISortType, ISortOrder } from '../filter/types';

export interface pizzaSliceState {
  pizzas: Pizza[];
  status: Status;
  error: string;
}

export type Pizza = {
  category: number;
  id: number;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

export enum Status {
  FULFILLED = 'fulfilled',
  LOADING = 'loading',
  ERROR = 'error',
}

export type QueryParams = {
  categoryIndex: string;
  searchValue: string;
  sortType: ISortType;
  sortOrder: ISortOrder;
  currentPage: number;
  pizzasPerPage: number;
};
