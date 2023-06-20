import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Define the Product interface
export interface Product {
  _id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

// Define the CartItem interface, which extends the Product interface with additional properties
export interface CartItem extends Product {
  userId: string;
  qty: number;
  total: number;
}

// Define the initial state for the productSlice
export interface ProductState {
  productList: Product[];
  cartItem: CartItem[];
}

const initialState: ProductState = {
  productList: [],
  cartItem: [],
};

// Create the productSlice using createSlice from Redux Toolkit
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // setProductData reducer to set the product list
    setProductData: (state, action: PayloadAction<Product[]>) => {
      state.productList = action.payload;
    },
    // addCartItem reducer to add an item to the cart
    addCartItem: (
      state,
      action: PayloadAction<Product & { userId: string }>
    ) => {
      // Extract the userId from the action payload and exclude it from the product object
      const { userId, ...product } = action.payload;

      // Check if the product already exists in the cart
      const duplicateProduct = state.cartItem.some(
        (el) => el._id === product._id && el.userId === userId
      );

      if (duplicateProduct) {
        // Show a toast message if the product is already in the cart
        toast.error("Product is already in the cart");
      } else {
        // Calculate the total price and create a new item with the additional properties
        const total = product.price;
        const newItem = { ...product, userId, qty: 1, total };

        // Add the new item to the cart
        state.cartItem = [...state.cartItem, newItem];

        // Show a toast message for successful addition to the cart
        toast.success("Added to cart");
      }
    },
    // deleteCartItem reducer to delete an item from the cart
    deleteCartItem: (state, action: PayloadAction<CartItem>) => {
      // Show a toast message for item deletion
      toast.success("One Item Deleted");

      // Find the index of the item in the cart
      const index = state.cartItem.findIndex(
        (el) => el._id === action.payload._id && el.userId === action.payload.userId
      );

      // Remove the item from the cart if found
      if (index !== -1) {
        state.cartItem.splice(index, 1);
      }
    },
    // increaseQty reducer to increase the quantity of an item in the cart
    increaseQty: (state, action: PayloadAction<CartItem>) => {
      // Find the index of the item in the cart
      const index = state.cartItem.findIndex(
        (el) => el._id === action.payload._id && el.userId === action.payload.userId
      );

      // Increase the quantity and update the total price if the item is found
      if (index !== -1) {
        state.cartItem[index].qty += 1;
        state.cartItem[index].total =
          state.cartItem[index].price * state.cartItem[index].qty;
      }
    },
    // decreaseQty reducer to decrease the quantity of an item in the cart
    decreaseQty: (state, action: PayloadAction<CartItem>) => {
      // Find the index of the item in the cart
      const index = state.cartItem.findIndex(
        (el) => el._id === action.payload._id && el.userId === action.payload.userId
      );

      // Decrease the quantity and update the total price if the item is found and the quantity is greater than 1
      if (index !== -1 && state.cartItem[index].qty > 1) {
        state.cartItem[index].qty -= 1;
        state.cartItem[index].total =
          state.cartItem[index].price * state.cartItem[index].qty;
      }
    },
  },
});

// Extract the generated action creators from the productSlice
export const {
  setProductData,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;

// Export the productSlice reducer
export default productSlice.reducer;
