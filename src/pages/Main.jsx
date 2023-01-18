import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const BACKEND_URL = 'https://63c56aabf3a73b347855bbb1.mockapi.io';

function Main() {
  const order = {
    1: 'asc',
    '-1': 'desc',
  };
  const [pizzas, setPizzas] = React.useState([...new Array(8)]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [category, setCategory] = React.useState(0);
  const [sortType, setSortType] = React.useState({ name: 'popularity', type: 'rating' });
  const [sortOrder, setSortOrder] = React.useState(1);

  const categoryToBackend = category ? `category=${category}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `${BACKEND_URL}/pizzas?${categoryToBackend}&sortBy=${sortType.type}&order=${order[sortOrder]}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setPizzas(res);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sortType, sortOrder]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories currentCategory={category} onChangeCategory={(value) => setCategory(value)} />
        <Sort
          currentSortType={sortType.name}
          onChangeSortType={(sortType) => setSortType(sortType)}
          onChangeSortOrder={() => setSortOrder(-sortOrder)}
        />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {pizzas.map((item, index) => {
          return isLoading ? <Skeleton key={index} /> : <PizzaBlock key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
}

export default Main;
