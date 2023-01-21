import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzas: [],
  totalPizzas: 0,
  orderPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onPlusPizza(state, { payload }) {
      const pizzaInCart = state.pizzas.find((pizza) => payload.personal_id === pizza.personal_id);
      pizzaInCart ? pizzaInCart.count++ : state.pizzas.push(payload);
      !pizzaInCart && (payload.count = 1);

      state.orderPrice += payload.price;
      state.totalPizzas++;
    },
    onMinusPizza(state, { payload }) {
      const pizzaInCart = state.pizzas.find((pizza) => payload.personal_id === pizza.personal_id);
      pizzaInCart.count--;

      if (!pizzaInCart.count) {
        const index = state.pizzas.indexOf(pizzaInCart);
        state.pizzas.splice(index, 1);
      }

      state.orderPrice -= payload.price;
      state.totalPizzas--;
    },

    onDeletePizza(state, { payload }) {
      const pizzaInCart = state.pizzas.find((pizza) => payload === pizza.personal_id);
      state.totalPizzas -= pizzaInCart.count;
      state.orderPrice -= pizzaInCart.price * pizzaInCart.count;

      const index = state.pizzas.indexOf(pizzaInCart);
      state.pizzas.splice(index, 1);
    },

    onClearCart(state) {
      state.pizzas = [];

      state.totalPizzas = 0;
      state.orderPrice = 0;
    },
  },
});

export const { onPlusPizza, onMinusPizza, onClearCart, onDeletePizza } = cartSlice.actions;

export default cartSlice.reducer;
