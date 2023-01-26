import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type ISortTypeTypes = 'rating' | 'price' | 'title';
export type ISortTypeNames = 'popularity' | 'price' | 'alphabetically';

export type ISortType = {
  name: ISortTypeNames;
  type: ISortTypeTypes;
};

export type ISortOrder = 'asc' | 'desc';

interface FilterSliceState {
  searchValue: string;
  categoryIndexState: number;
  sortOrder: ISortOrder;
  sortType: ISortType;
  pagination: {
    currentPage: number;
    pagesAmount: number;
  };
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryIndexState: 0,
  sortOrder: 'asc',
  sortType: { name: 'popularity', type: 'rating' },
  pagination: {
    currentPage: 1,
    pagesAmount: 3,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, { payload }: PayloadAction<number>) {
      state.categoryIndexState = payload;
    },
    setSortType(state, { payload }: PayloadAction<ISortType>) {
      state.sortType = payload;
    },
    setSortOrder(state, { payload }: PayloadAction<ISortOrder>) {
      state.sortOrder = payload;
    },
    onChangeSearchValue(state, { payload }: PayloadAction<string>) {
      state.searchValue = payload;
    },
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.pagination.currentPage = payload;
    },
    setPagesAmount(state, { payload }: PayloadAction<number>) {
      state.pagination.pagesAmount = payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectPagination = (state: RootState) => state.filter.pagination;

export const {
  setCurrentPage,
  setPagesAmount,
  onChangeSearchValue,
  setCategory,
  setSortOrder,
  setSortType,
} = filterSlice.actions;

export default filterSlice.reducer;
