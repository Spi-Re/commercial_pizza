import React from 'react';

import plus from '../../assets/img/plus.svg';

import { useSelector } from 'react-redux';
import { selectAllPizzasInCart } from '../../redux/filter/selectors';
import { onPlusPizza } from '../../redux/cart/slice';
import { useAppDispatch } from '../../redux/store';
const doughTypes = ['thin crust', 'traditional'];

type PizzaBlockProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  imageUrl,
  title,
  price,
  sizes,
  types,
}) => {
  const dispatch = useAppDispatch();
  const [doughType, setDoughType] = React.useState<number>(0);
  const [pizzaSize, setPizzaSize] = React.useState<number>(0);

  const allPizzasInCart = useSelector(selectAllPizzasInCart(id));

  const pizzaObj = {
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
    dispatch(onPlusPizza(pizzaObj));
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
          <img src={plus} alt="plus" />
          <span>Add</span>
          {allPizzasInCart.length > 0 && (
            <i>{allPizzasInCart.reduce((sum, item) => (sum += item.count), 0)}</i>
          )}
        </button>
      </div>
    </div>
  );
};
