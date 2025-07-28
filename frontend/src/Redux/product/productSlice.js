import { createSlice } from "@reduxjs/toolkit";

const cartValue = {
  carts: [],
};

const loadState = () => {
  const storedState = localStorage.getItem("cartState");

  return storedState ? JSON.parse(storedState) : cartValue;
};

const initialState = loadState();

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.carts = action.payload;
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    updateCartQuantity: (state, action) => {
      state.carts = action.payload;
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.carts = action.payload;
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.carts = [];
      localStorage.setItem("cartState", JSON.stringify(state));
    },
  },
});

export const { addToCart, updateCartQuantity, removeFromCart, clearCart } =
  productSlice.actions;
export default productSlice.reducer;
