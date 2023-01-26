import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { onPlusPizza } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
const doughTypes = ['thin crust', 'traditional'];

type PizzaBlockProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, imageUrl, title, price, sizes, types }) => {
  const dispatch = useDispatch();
  const [doughType, setDoughType] = React.useState<number>(0);
  const [pizzaSize, setPizzaSize] = React.useState<number>(0);
  const pizzaInCart = useSelector((state: RootState) =>
    state.cart.pizzas.filter((item) => item.id === id),
  );

  const obj = {
    id,
    personal_id: `${title}-${doughTypes[doughType]}-${sizes[pizzaSize]}`,
    title,
    imageUrl,
    price,
    size: sizes[pizzaSize],
    doughType: doughTypes[doughType],
    count: 0,
  };

  const handleAddToCart = () => {
    dispatch(onPlusPizza(obj));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" height="250" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => {
            return (
              <li
                key={type}
                onClick={() => setDoughType(index)}
                className={index === doughType ? 'active' : ''}>
                {doughTypes[type]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                key={index}
                onClick={() => setPizzaSize(index)}
                className={index === pizzaSize ? 'active' : ''}>
                {size} cm
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from ${price}</div>
        <button onClick={handleAddToCart} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add</span>
          {pizzaInCart.length > 0 && (
            <i>{pizzaInCart.reduce((sum, item) => (sum += item.count), 0)}</i>
          )}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
