export type ISortTypeTypes = 'rating' | 'price' | 'title';
export type ISortTypeNames = 'popularity' | 'price' | 'alphabetically';

export type ISortType = {
  name: ISortTypeNames;
  type: ISortTypeTypes;
};

export type ISortOrder = 'asc' | 'desc';

export interface FilterSliceState {
  searchValue: string;
  categoryIndex: number;
  sortOrder: ISortOrder;
  sortType: ISortType;
  pagination: {
    currentPage: number;
    pagesAmount: number;
  };
}
