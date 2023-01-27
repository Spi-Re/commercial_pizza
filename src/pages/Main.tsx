import React from 'react';
import qs from 'qs';

import { Categories, PizzaBlock, Skeleton, Pagination, Sort } from '../components';
import { sortTypes } from '../components/Sort';

import { useSelector } from 'react-redux';
import { setCurrentPage, setCategory, setSortType, setSortOrder } from '../redux/filter/slice';
import { ISortOrder, ISortType, ISortTypeTypes } from '../redux/filter/types';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizza } from '../redux/pizza/asyncSlice';
import { Status } from '../redux/pizza/types';
import { useAppDispatch, RootState } from '../redux/store';
import { NotFoundPizzas } from './NotFound/NotFoundPizzas';

type QueryParams = { sortBy: ISortTypeTypes; sort: ISortOrder; category: string; p: string };

const pizzasPerPage = 4;

// TODO: Заглушку для ошибки при запросе.
const Main: React.FC = () => {
  const dispatch = useAppDispatch();

  const { pizzas, error, status } = useSelector((state: RootState) => state.pizzas);
  const {
    searchValue,
    pagination: { currentPage },
    categoryIndex,
    sortType,
    sortOrder,
  } = useSelector(selectFilter);

  const isHistoryMove = React.useRef<boolean>(false);

  // перемещение по history сессии c помощью кнопок
  //@ts-ignore
  const onHistoryChange = React.useCallback((event: React.PopStateEvent<Window>) => {
    isHistoryMove.current = true;
    writeQueryStringToState(event.state.page);
  }, []);

  // Запись query string в state при popstate
  const writeQueryStringToState = (queryString: string) => {
    if (!queryString) return;
    const { sortBy, sort, category, p } = qs.parse(queryString) as unknown as QueryParams;
    if (!sortBy) return;

    const sortObj = sortTypes.find((item) => item.type === sortBy) as ISortType;
    dispatch(setSortType(sortObj));
    dispatch(setCategory(parseInt(category)));
    dispatch(setSortOrder(sort));
    dispatch(setCurrentPage(Number(p)));
  };

  React.useEffect(() => {
    // Возврат в то же место при перезагрузке страницы
    window.location.search && writeQueryStringToState(window.location.search.slice(1));

    window.addEventListener('popstate', onHistoryChange);
    return () => {
      window.removeEventListener('popstate', onHistoryChange);
    };
  }, []);

  // получение пицц
  React.useEffect(() => {
    dispatch(
      fetchPizza({
        categoryIndex: categoryIndex === 0 ? '' : String(categoryIndex),
        searchValue,
        sortType,
        sortOrder,
        currentPage,
        pizzasPerPage,
      }),
    );

    window.scrollTo(0, 0);
  }, [categoryIndex, sortType, sortOrder, searchValue, currentPage]);

  // запись в queryString при изменении фильтров
  React.useEffect(() => {
    const queryString = qs.stringify({
      category: categoryIndex,
      sortBy: sortType.type,
      sort: sortOrder,
      p: currentPage,
    });

    !isHistoryMove.current &&
      window.history.pushState({ page: queryString }, '', `?${queryString}`);

    isHistoryMove.current = false;
  }, [categoryIndex, sortType, sortOrder, currentPage]);

  if (error || (pizzas.length === 0 && status === Status.FULFILLED)) {
    return <NotFoundPizzas />;
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
          ? new Array(pizzasPerPage).fill('').map((_, index) => <Skeleton key={index} />)
          : pizzas.map((item) => {
              return <PizzaBlock key={item.id} {...item} />;
            })}
      </div>
      <Pagination />
    </div>
  );
};

export default Main;
