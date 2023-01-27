import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartSliceState, Pizza } from './types';
import { getCartFromLS, findPizza, setLocalStorage } from './utils';

const { pizzas, totalPizzas, orderPrice } = getCartFromLS();

const initialState: CartSliceState = {
  pizzas,
  totalPizzas,
  orderPrice,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onPlusPizza(state, { payload: newPizza }: PayloadAction<Pizza>) {
      const samePizzaInCart = findPizza(state.pizzas, newPizza);

      if (!samePizzaInCart) {
        state.pizzas.push(newPizza);
        newPizza.count = 1;
      }

      samePizzaInCart && samePizzaInCart.count++;
      state.orderPrice += newPizza.price;
      state.totalPizzas++;
      setLocalStorage(state);
    },

    onMinusPizza(state, { payload: newPizza }: PayloadAction<Pizza>) {
      const samePizzaInCart = findPizza(state.pizzas, newPizza);
      if (!samePizzaInCart) return;

      samePizzaInCart.count--;
      state.totalPizzas--;
      state.orderPrice -= samePizzaInCart.price;
      setLocalStorage(state);
    },

    onDeletePizza(state, { payload: deletePizza }: PayloadAction<Pizza>) {
      const samePizzaInCart = findPizza(state.pizzas, deletePizza);
      if (!samePizzaInCart) return;

      const indexOfSamePizza = state.pizzas.indexOf(samePizzaInCart);
      state.pizzas.splice(indexOfSamePizza, 1);

      const { count, price } = samePizzaInCart;
      state.totalPizzas -= count;
      state.orderPrice -= price * count;
      setLocalStorage(state);
    },

    onClearCart(state) {
      state.pizzas = [];
      state.totalPizzas = 0;
      state.orderPrice = 0;

      setLocalStorage(state);
    },
  },
});

export const { onPlusPizza, onMinusPizza, onClearCart, onDeletePizza } = cartSlice.actions;
export default cartSlice.reducer;
