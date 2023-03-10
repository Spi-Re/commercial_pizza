import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, ISortType, ISortOrder, IsetAll } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryIndex: 0,
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
      payload === 0 && (state.pagination.pagesAmount = 3);
      state.categoryIndex = payload;
    },
    setSortType(state, { payload }: PayloadAction<ISortType>) {
      state.sortType = payload;
    },
    setSortOrder(state, { payload }: PayloadAction<ISortOrder>) {
      state.sortOrder = payload;
    },
    onChangeSearchValue(state, { payload }: PayloadAction<string>) {
      // сервер ищет только по всем item
      state.categoryIndex = 0;
      payload === '' && (state.pagination.pagesAmount = 3);
      state.searchValue = payload;
    },
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.pagination.currentPage = payload;
    },
    setPagesAmount(state, { payload }: PayloadAction<number>) {
      const currentPage = state.pagination.currentPage;
      // Потому что сервер не возвращает общее количество item
      !payload && currentPage === 1 && (state.pagination.pagesAmount = 1);
    },

    setAll(state, { payload }: PayloadAction<IsetAll>) {
      state.sortType = payload.sortObj;
      state.categoryIndex = payload.category;
      state.sortOrder = payload.sort;
      state.pagination.currentPage = payload.p;
    },

    stateReset(state) {
      state.searchValue = '';
      state.categoryIndex = 0;
      state.sortOrder = 'asc';
      state.sortType.name = 'popularity';
      state.sortType.type = 'rating';
      state.pagination.currentPage = 1;
      state.pagination.pagesAmount = 3;
    },
  },
});

export const {
  setCurrentPage,
  setPagesAmount,
  onChangeSearchValue,
  setCategory,
  setSortOrder,
  setSortType,
  stateReset,
  setAll,
} = filterSlice.actions;

export default filterSlice.reducer;
