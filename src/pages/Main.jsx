import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { useSelector } from 'react-redux';

const BACKEND_URL = 'https://63c56aabf3a73b347855bbb1.mockapi.io';

const _ORDER = {
  1: 'asc',
  '-1': 'desc',
};

const Main = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [pizzas, setPizzas] = React.useState([...new Array(4)]);

  const { categoryIndex, sortType, sortOrder } = useSelector((state) => state.filter);
  const searchValue = useSelector((state) => state.search.value);
  const currentPage = useSelector((state) => state.pagination.currentPage);

  const categoryToBackend = categoryIndex ? `category=${categoryIndex}` : '';
  const searchPizzas = searchValue ? `&search=${searchValue.toLowerCase()}` : '';

  React.useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `${BACKEND_URL}/pizzas?${categoryToBackend}&sortBy=${sortType.type}&order=${_ORDER[sortOrder]}${searchPizzas}&p=${currentPage}&l=4`,
      )
      .then((res) => {
        console.log(res);
        setPizzas(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryIndex, sortType, sortOrder, searchValue, currentPage]);

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
