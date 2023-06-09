import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export interface Product {
  _id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}
export interface CartItem extends Product {
  qty: number;
  total: number;
}

export interface ProductState {
  productList: Product[];
  cartItem: CartItem[];
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
      const duplicateProduct = state.cartItem.some(
        (el) => el._id === action.payload._id
      );
      if (duplicateProduct) {
        toast("Product is already in the cart");
      } else {
        const product = action.payload;
        const total = product.price;
        const newItem = { ...product, qty: 1, total: total };
        state.cartItem = [...state.cartItem, newItem];
        toast("Added to cart")
      }
    },
    deleteCartItem: (state, action: PayloadAction<Product>) => {
      toast("One Item Deleted");
      const index = state.cartItem.findIndex(
        (el) => el._id === action.payload._id
      );
      state.cartItem.splice(index, 1);
    },
    increaseQty: (state, action: PayloadAction<Product>) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload._id);
      if (index !== -1) {
        state.cartItem[index].qty += 1;
        state.cartItem[index].total = state.cartItem[index].price * state.cartItem[index].qty;
      }
    },
    decreaseQty: (state, action: PayloadAction<Product>) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload._id);
      if (index !== -1 && state.cartItem[index].qty > 1) {
        state.cartItem[index].qty -= 1;
        state.cartItem[index].total = state.cartItem[index].price * state.cartItem[index].qty;
      }
    },    
  },
});

export const {
  setProductData,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;

export default productSlice.reducer;
