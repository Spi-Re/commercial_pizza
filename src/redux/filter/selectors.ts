import { RootState } from '../store';

export const selectAllPizzasInCart = (id: number) => (state: RootState) =>
  state.cart.pizzas.filter((item) => item.id === id);
export const selectFilter = (state: RootState) => state.filter;
export const selectPagination = (state: RootState) => state.filter.pagination;
