import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Pizza = {
  id: number;
  personal_id: string;
  title: string;
  imageUrl: string;
  price: number;
  size: number;
  doughType: string;
  count: number;
};

interface CartSliceState {
  pizzas: Pizza[];
  totalPizzas: number;
  orderPrice: number;
}

const initialState: CartSliceState = {
  pizzas: [],
  totalPizzas: 0,
  orderPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onPlusPizza(state, { payload: newPizza }: PayloadAction<Pizza>) {
      const samePizzaInCart = findPizza(state.pizzas, newPizza);
      samePizzaInCart && samePizzaInCart.count++;

      if (!samePizzaInCart) {
        state.pizzas.push(newPizza);
        newPizza.count = 1;
      }

      state.orderPrice += newPizza.price;
      state.totalPizzas++;
    },
    onMinusPizza(state, { payload: newPizza }: PayloadAction<Pizza>) {
      const samePizzaInCart = findPizza(state.pizzas, newPizza);
      if (!samePizzaInCart) return;

      samePizzaInCart.count--;
      state.totalPizzas--;
      state.orderPrice -= samePizzaInCart.price;
    },

    onDeletePizza(state, { payload: deletePizza }: PayloadAction<Pizza>) {
      const samePizzaInCart = findPizza(state.pizzas, deletePizza);
      if (!samePizzaInCart) return;

      const deletePizzaIndex = state.pizzas.indexOf(samePizzaInCart);
      state.pizzas.splice(deletePizzaIndex, 1);

      const { count, price } = samePizzaInCart;
      state.totalPizzas -= count;
      state.orderPrice -= price * count;
    },

    onClearCart(state) {
      state.pizzas = [];

      state.totalPizzas = 0;
      state.orderPrice = 0;
    },
  },
});

function findPizza(pizzas: Pizza[], newPizza: Pizza) {
  return pizzas.find((pizza) => newPizza.personal_id === pizza.personal_id);
}

export const { onPlusPizza, onMinusPizza, onClearCart, onDeletePizza } = cartSlice.actions;

export default cartSlice.reducer;
