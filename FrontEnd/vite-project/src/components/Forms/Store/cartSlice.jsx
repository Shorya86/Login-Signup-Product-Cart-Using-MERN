import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addtoCart: (state, action) => {
      const itemInCart = state.cart.find((x) => x.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity += 1; // Increment if item already exists
      } else {
        state.cart.push({ ...action.payload, quantity: 1 }); // Set initial quantity to 1
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((x) => x.id !== action.payload.id);
    },
    increment: (state, action) => {
      const item = state.cart.find((x) => x.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrement: (state, action) => {
      const item = state.cart.find((x) => x.id === action.payload.id);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter((x) => x.id !== action.payload.id);
        }
      }
    },
  },
});

export default cartSlice.reducer;
export const { addtoCart, removeFromCart, increment, decrement } =
  cartSlice.actions;
