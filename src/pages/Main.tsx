import React from 'react';
import qs from 'qs';

import { Categories, PizzaBlock, Skeleton, Pagination, Sort } from '../components';
import { sortTypes } from '../components/Sort';

import { useSelector } from 'react-redux';
import { setAll } from '../redux/filter/slice';
import { ISortOrder, ISortType, ISortTypeTypes } from '../redux/filter/types';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizza } from '../redux/pizza/asyncSlice';
import { Status } from '../redux/pizza/types';
import { useAppDispatch, RootState } from '../redux/store';
import { NotFoundPizzas } from './NotFound/NotFoundPizzas';
import { useNavigate } from 'react-router-dom';

type QueryParams = { sortBy: ISortTypeTypes; sort: ISortOrder; category: string; p: string };

const pizzasPerPage = 4;

const Main: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pizzas, error, status } = useSelector((state: RootState) => state.pizzas);
  const {
    searchValue,
    pagination: { currentPage },
    categoryIndex,
    sortType,
    sortOrder,
  } = useSelector(selectFilter);
  const isFirst = React.useRef(true);

  const isHistoryMove = React.useRef<boolean>(false);

  // Запись query string в state при popstate
  const writeQueryStringToState = (queryString: string) => {
    const { sortBy, sort, category, p } = qs.parse(queryString) as unknown as QueryParams;
    const sortObj = sortTypes.find((item) => item.type === sortBy) as ISortType;

    dispatch(setAll({ sortObj, sort, category: Number(category), p: Number(p) }));
  };

  React.useEffect(() => {
    // Возврат в то же место при перезагрузке страницы
    window.location.search && writeQueryStringToState(window.location.search.slice(1));

    window.addEventListener('popstate', handleHistoryChange);
    return () => {
      window.removeEventListener('popstate', handleHistoryChange);
    };
  }, []);

  // получение пицц
  React.useEffect(() => {
    !isFirst.current &&
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

    isFirst.current = false;
    window.scrollTo(0, 0);
  }, [categoryIndex, sortType, sortOrder, searchValue, currentPage]);

  // запись в queryString при изменении фильтров + pushHistory
  React.useEffect(() => {
    const queryString = qs.stringify({
      category: categoryIndex,
      sortBy: sortType.type,
      sort: sortOrder,
      p: currentPage,
    });

    !isHistoryMove.current && navigate(`?${queryString}`, { state: queryString });
    isHistoryMove.current = false;
  }, [categoryIndex, sortType, sortOrder, currentPage]);

  const handleHistoryChange = React.useCallback((event: PopStateEvent) => {
    isHistoryMove.current = true;
    event.state.usr && writeQueryStringToState(event.state.usr);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      {error || (pizzas.length === 0 && status === Status.FULFILLED) ? (
        <NotFoundPizzas />
      ) : (
        <>
          <h2 className="content__title">All Pizzas</h2>
          <div className="content__items">
            {status === Status.LOADING
              ? new Array(pizzasPerPage).fill('').map((_, index) => <Skeleton key={index} />)
              : pizzas.map((item) => {
                  return <PizzaBlock key={item.id} {...item} />;
                })}
          </div>
          <Pagination />
        </>
      )}
    </div>
  );
};

export default Main;
