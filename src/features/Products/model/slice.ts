import { createSlice } from '@reduxjs/toolkit';
import { getPartProducts, updateProduct } from './thunks';
import { Category, PaginationWithTotal, Product, Sorting } from '../../../shared/types/serverTypes';
import { getCategories } from '../../../entities/Category/model/thunks';
import { resetState } from '../../../shared/actions/actions';

interface ProductsState {
  products: Product[];
  categories: Category[];
  pagination: PaginationWithTotal;
  sorting: Sorting;
  categoryStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | string[];
  categoryError: string | null | string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  pagination: { pageSize: 10, pageNumber: 1, total: 2 },
  sorting: { type: 'ASC', field: 'updatedAt' },
  categoryStatus: 'idle',
  categoryError: null,
  error: null,
  status: 'idle',
};

const productsSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    clearCurrentProducts: (state) => {
      state.products = [];
      state.pagination = { pageSize: 10, pageNumber: 0, total: 1 };
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetState, () => initialState)
      .addCase(getPartProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getPartProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = [...state.products, ...action.payload.data];
        state.pagination = action.payload.pagination;
        state.sorting = action.payload.sorting;
      })
      .addCase(getPartProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string[];
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.products.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string[];
      })
      .addCase(getCategories.pending, (state) => {
        state.categoryStatus = 'loading';
        state.categoryError = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categoryStatus = 'succeeded';
        state.categories = [...action.payload.data];
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.categoryStatus = 'failed';
        state.categoryError = action.payload as string[];
      });
  },
});

export const { clearCurrentProducts } = productsSlice.actions;
export default productsSlice.reducer;
