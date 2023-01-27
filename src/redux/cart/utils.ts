import { Pizza, CartSliceState } from './types';

export function getCartFromLS() {
  const isCart = localStorage.getItem('cart');
  const cart = (isCart && JSON.parse(isCart)) || { pizzas: [], totalPizzas: 0, orderPrice: 0 };

  const { pizzas, totalPizzas, orderPrice } = cart;

  return {
    pizzas,
    totalPizzas,
    orderPrice,
  };
}

export function findPizza(pizzas: Pizza[], newPizza: Pizza) {
  return pizzas.find((pizza) => newPizza.personal_id === pizza.personal_id);
}

export function setLocalStorage({ pizzas, totalPizzas, orderPrice }: CartSliceState) {
  localStorage.setItem('cart', JSON.stringify({ pizzas, totalPizzas, orderPrice }));
}
