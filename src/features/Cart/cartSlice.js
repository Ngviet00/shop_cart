import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
   name: 'cart',
   initialState: {
      cartItem: []
   },
   reducers: {
      addToCart: (state, action) => {
         const item = action.payload;
         const index = state.cartItem.findIndex(x => x.id === item.id && x.size === item.size);
         if (index >= 0) {
            state.cartItem[index].quantity += parseInt(item.quantity);
         } else {
            state.cartItem.push(item);
         }
      },
      removeCart: (state, action) => {
         const { id, size } = action.payload;
         const index = state.cartItem.findIndex(x => x.id === id && x.size === size);
         state.cartItem.splice(index, 1);
      },
      addQuantityCart: (state, action) => {
         const { id, size } = action.payload;
         const index = state.cartItem.findIndex(x => x.id === id && x.size === size);
         if (index >= 0) {
            state.cartItem[index].quantity += 1;
         }
      },
      subQuantityCart: (state, action) => {
         const { id, size } = action.payload;
         const index = state.cartItem.findIndex(x => x.id === id && x.size === size);
         if (index >= 0) {
            state.cartItem[index].quantity -= 1;
         }
      },
      removeAllCart: (state) => {
         state.cartItem = [];
      }
   },
});
export const { addToCart, removeCart, addQuantityCart, subQuantityCart, removeAllCart } = cartSlice.actions
export default cartSlice.reducer;