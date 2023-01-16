import React from 'react';
import './scss/app.scss';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://63c56aabf3a73b347855bbb1.mockapi.io/pizzas')
      .then((res) => res.json())
      .then((res) => setItems(res));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All Pizzas</h2>
          <div className="content__items">
            {items.map((item) => {
              return <PizzaBlock key={item.id} {...item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
