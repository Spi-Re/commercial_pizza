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

  const [items, setPizzas] = React.useState([...new Array(8)]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedCategory, setCategory] = React.useState(0);
  const [selectedType, setSortType] = React.useState({ name: 'popularity', type: 'rating' });
  const [sortOrder, setSortOrder] = React.useState(1);

  const category = selectedCategory ? `category=${selectedCategory}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63c56aabf3a73b347855bbb1.mockapi.io/pizzas?${category}&sortBy=${selectedType.type}&order=${order[sortOrder]}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setPizzas(res);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [selectedCategory, selectedType, sortOrder]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          currentCategory={selectedCategory}
          onChangeCategory={(value) => setCategory(value)}
        />
        <Sort
          currentSortType={selectedType.name}
          onChangeSortType={(sortType) => setSortType(sortType)}
          onChangeSortOrder={() => setSortOrder(-sortOrder)}
        />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {items.map((item, index) => {
          return isLoading ? <Skeleton key={index} /> : <PizzaBlock key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
}

export default Main;
