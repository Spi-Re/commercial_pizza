import React from 'react';
import qs from 'qs';

import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import { sortTypes } from '../components/Sort';

import { fetchPizza, Status } from '../redux/slices/pizzaSlice';
import {
  setCurrentPage,
  setCategory,
  setSortType,
  setSortOrder,
  selectFilter,
  ISortOrder,
  ISortType,
  ISortTypeTypes,
} from '../redux/slices/filterSlice';
import { RootState, useAppDispatch } from '../redux/store';

const _PizzasPerPage = 4;

// TODO: При клики на лого - возврат на главную | Нужен сброс фильтров.
// TODO: Нужен сброс фильтров при переходе по back из cart.
// TODO: Заглушку для ошибки при запросе.
const Main: React.FC = () => {
  const dispatch = useAppDispatch();

  const { pizzas, error, status } = useSelector((state: RootState) => state.pizzas);
  const {
    searchValue,
    pagination: { currentPage },
    categoryIndexState,
    sortType,
    sortOrder,
  } = useSelector(selectFilter);

  const isHistoryMove = React.useRef<boolean>(false);

  // перемещение по history сессии c помощью кнопок
  // @ts-ignore
  const onHistoryChange = React.useCallback((event: React.PopStateEvent<Window>) => {
    isHistoryMove.current = true;
    writeQueryStringToState(event.state.page);
  });

  //TODO: Добавить в url поле search
  //TODO: Один метод для одного slice
  // Запись query string в state при popstate
  const writeQueryStringToState = (queryString: string) => {
    if (queryString) {
      type QueryParams = { sortBy: ISortTypeTypes; sort: ISortOrder; category: string; p: string };

      const { sortBy, sort, category, p } = qs.parse(queryString) as unknown as QueryParams;

      if (sortBy) {
        const sortObj = sortTypes.find((item) => item.type === sortBy) as ISortType;
        dispatch(setSortType(sortObj));
      }
      dispatch(setCategory(parseInt(category)));
      dispatch(setSortOrder(sort));
      dispatch(setCurrentPage(Number(p)));
    }
  };

  // полчение данных из queryString при первой  загрузке страницы
  React.useEffect(() => {
    window.addEventListener('popstate', onHistoryChange);
    if (window.location.search) {
      const queryString = window.location.search.slice(1);
      writeQueryStringToState(queryString);
    }

    return () => {
      window.removeEventListener('popstate', onHistoryChange);
    };
  }, []);

  // получение пицц при изменении фильтров
  React.useEffect(() => {
    const categoryIndex = categoryIndexState ? `category=${categoryIndexState}` : '';
    const searchPizzas = searchValue ? `&search=${searchValue.toLowerCase()}` : '';

    dispatch(fetchPizza({ categoryIndex, searchPizzas, sortType, sortOrder, currentPage }));

    window.scrollTo(0, 0);
  }, [categoryIndexState, sortType, sortOrder, searchValue, currentPage]);

  // запись в queryString при изменении фильтров
  React.useEffect(() => {
    const queryString = qs.stringify({
      category: categoryIndexState,
      sortBy: sortType.type,
      sort: sortOrder,
      p: currentPage,
    });

    !isHistoryMove.current &&
      window.history.pushState({ page: queryString }, '', `?${queryString}`);

    isHistoryMove.current = false;
  }, [categoryIndexState, sortType, sortOrder, currentPage]);

  if (error) {
    return <>'unfortunately, pizzas weren't be downloaded. Please, try it later.'</>;
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {status === Status.LOADING
          ? new Array(_PizzasPerPage).fill('').map((_, index) => <Skeleton key={index} />)
          : pizzas.map((item) => {
              return <PizzaBlock key={item.id} {...item} />;
            })}
      </div>
      <Pagination />
    </div>
  );
};

export default Main;
