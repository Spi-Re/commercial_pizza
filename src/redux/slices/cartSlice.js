import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzas: [],
  amountPizzas: 0,
  amountMoney: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onPlusPizza(state, { payload }) {
      const pizzaInCart = state.pizzas.find((pizza) => payload.personal_id === pizza.personal_id);
      pizzaInCart ? pizzaInCart.count++ : state.pizzas.push(payload);
      !pizzaInCart && (payload.count = 1);

      state.amountMoney += payload.price;
      state.amountPizzas++;
    },
    onMinusPizza(state, { payload }) {
      const pizzaInCart = state.pizzas.find((pizza) => payload.personal_id === pizza.personal_id);
      pizzaInCart.count--;

      if (pizzaInCart.count) {
        const index = state.pizzas.indexOf(pizzaInCart);
        state.pizzas.splice(index, 1);
      }

      state.amountMoney -= payload.price;
      state.amountPizzas--;
    },
    onClearCart(state) {
      state.pizzas = [];

      state.amountPizzas = 0;
      state.amountMoney = 0;
    },
  },
});

export const { onPlusPizza, onMinusPizza, onClearCart } = cartSlice.actions;

export default cartSlice.reducer;
