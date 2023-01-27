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

export interface CartSliceState {
  pizzas: Pizza[];
  totalPizzas: number;
  orderPrice: number;
}
