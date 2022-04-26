import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const ItemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== ItemId);
    },
    toggleValue: (state, action) => {
      const { type, id } = action.payload;
      console.log(action);
      let item = state.cartItems.find((item) => item.id === id);

      if (type === "INCREASE") {
        item.amount += 1;
      }
      if (type === "DECREASE") {
        item.amount -= 1;
      }
    },
    calculateTotal: (state) => {
      let obj = state.cartItems.reduce(
        (acc, item) => {
          acc.price += item.price * item.amount;
          acc.quantity += item.amount;
          return acc;
        },
        { price: 0, quantity: 0 }
      );
      state.total = obj.price.toFixed(2);
      state.amount = obj.quantity;
      console.log("Calculate Totals Called");
    }
  }
});

console.log(cartSlice);

export const { clearCart, removeItem, toggleValue, calculateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
