import React from 'react';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { sortTypes } from '../components/Sort';

import { fetchPizza } from '../redux/slices/pizzaSlice';

import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSortType, setSortOrder } from '../redux/slices/filterSlice';
import { setCurrentPage } from '../redux/slices/paginationSlice';

const _ORDER = {
  1: 'asc',
  '-1': 'desc',
};

const _PizzasPerPage = 4;

const Main = () => {
  const dispatch = useDispatch();
  const { pizzas, loading, error } = useSelector((state) => state.pizzas);
  const { categoryIndexState, sortType, sortOrder } = useSelector((state) => state.filter);
  const searchValue = useSelector((state) => state.search.value);
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const onHistoryMove = React.useRef(false);

  // перемещение по history сессии c помощью кнопок
  const onHistoryChange = React.useCallback((event) => {
    onHistoryMove.current = true;
    writeQueryStringToState(event.state.page);
  });

  // Запись query string в state при popState
  //TODO: Сделать правильное отобраэение поля sort(asc, desc)
  //TODO: Нужно ли делать полную queryString с полем поиска и проч?
  const writeQueryStringToState = (queryString) => {
    // dispatch(onChangeSearchValue(''));

    if (queryString) {
      const { sortBy, sort, category, p } = qs.parse(queryString);
      const sortObj = sortTypes.find((item) => item.type === sortBy);

      dispatch(setCategory(parseInt(category)));
      dispatch(setSortOrder(parseInt(sort)));
      dispatch(setSortType(sortObj));
      dispatch(setCurrentPage(p));
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
    const sortOrderBy = _ORDER[sortOrder];

    dispatch(fetchPizza({ categoryIndex, searchPizzas, sortType, sortOrderBy, currentPage }));
    window.scrollTo(0, 0);
  }, [categoryIndexState, sortType, sortOrder, searchValue, currentPage]);

  // запись в queryString при изменении фильтров
  React.useEffect(() => {
    const queryString = qs.stringify({
      category: categoryIndexState,
      sortBy: sortType.type,
      sort: _ORDER[sortOrder],
      p: currentPage,
    });

    !onHistoryMove.current &&
      window.history.pushState({ page: queryString }, '', `?${queryString}`);

    onHistoryMove.current = false;
  }, [categoryIndexState, sortType, sortOrder, currentPage]);

  if (error) {
    return 'К сожалений питсы не были загружены';
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {loading
          ? new Array(_PizzasPerPage).fill('i').map((_, index) => <Skeleton key={index} />)
          : pizzas.map((item) => {
              return <PizzaBlock key={item.id} {...item} />;
            })}
      </div>
      <Pagination />
    </div>
  );
};

export default Main;
