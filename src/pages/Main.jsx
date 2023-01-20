import React from 'react';
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { sortTypes } from '../components/Sort';

import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSortType, setSortOrder } from '../redux/slices/filterSlice';

const BACKEND_URL = 'https://63c56aabf3a73b347855bbb1.mockapi.io';

const _ORDER = {
  1: 'asc',
  '-1': 'desc',
};

// FIXME: При использовании history.back() полсе прихода с страницы Cart, теряется redux
const Main = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [pizzas, setPizzas] = React.useState([...new Array(4)]);
  const { categoryIndexState, sortType, sortOrder } = useSelector((state) => state.filter);
  const searchValue = useSelector((state) => state.search.value);
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const onHistoryMove = React.useRef(false);
  const getPizzas = () => {
    setIsLoading(true);
    const categoryIndex = categoryIndexState ? `category=${categoryIndexState}` : '';
    const searchPizzas = searchValue ? `&search=${searchValue.toLowerCase()}` : '';

    axios
      .get(
        `${BACKEND_URL}/pizzas?${categoryIndex}&sortBy=${sortType.type}&order=${_ORDER[sortOrder]}${searchPizzas}&p=${currentPage}&l=4`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  };

  // перемещение по history сессии c помощью кнопок
  const onHistoryChange = React.useCallback((event) => {
    onHistoryMove.current = true;
    writeQueryStringToState(event.state.page);
  });

  // Запись query string в state
  const writeQueryStringToState = (queryString) => {
    const { sortType, sortOrder, categoryIndexState } = qs.parse(queryString);
    const sortObj = sortTypes.find((item) => item.type === sortType);

    dispatch(setCategory(parseInt(categoryIndexState)));
    dispatch(setSortOrder(parseInt(sortOrder)));
    dispatch(setSortType(sortObj));
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
    getPizzas();
  }, [categoryIndexState, sortType, sortOrder, searchValue, currentPage]);

  // запись в queryString при изменении фильтров
  React.useEffect(() => {
    const queryString = qs.stringify({
      categoryIndexState,
      sortType: sortType.type,
      sortOrder,
    });

    !onHistoryMove.current &&
      window.history.pushState({ page: queryString }, '', `?${queryString}`);

    onHistoryMove.current = false;
  }, [categoryIndexState, sortType, sortOrder, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {pizzas.map((item, index) => {
          return isLoading ? <Skeleton key={index} /> : <PizzaBlock key={item.id} {...item} />;
        })}
      </div>
      <Pagination />
    </div>
  );
};

export default Main;
