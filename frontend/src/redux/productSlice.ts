import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  _id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

export interface ProductState {
  productList: Product[];
  cartItem: Product[];
}

const initialState: ProductState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: (state, action: PayloadAction<Product[]>) => {
      state.productList = action.payload;
    },

    addCartItem: (state, action: PayloadAction<Product>) => {
      console.log(action);
      const product = action.payload;
      const total = product.price;
      const newItem = { ...product, qty: 1, total: total };
      state.cartItem = [...state.cartItem, newItem];
    },
  },
});

export const { setProductData, addCartItem } = productSlice.actions;

export default productSlice.reducer;
