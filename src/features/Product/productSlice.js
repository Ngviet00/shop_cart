import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from 'api/productApi';

export const getProductById = createAsyncThunk(
   'product/getProductById',
   async (productId, thunkAPI) => {
      const response = await productApi.get(1);
      return response;
   }
)

const productSlice = createSlice({
   name: 'products',
   initialState: {
      product: {}
   },
   reducers: {
   },
   extraReducers: {
      [getProductById.fulfilled]: (state, action) => {
         state.product = action.payload;
      }
   }
});

export default productSlice.reducer;