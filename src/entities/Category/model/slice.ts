import { createSlice } from '@reduxjs/toolkit';
import { getPartCategories, updateCategory } from './thunks';
import { Category, PaginationWithTotal, Sorting } from '../../../shared/types/serverTypes';
import { resetState } from '../../../shared/actions/actions';

interface CategoriesState {
  categories: Category[];
  pagination: PaginationWithTotal;
  sorting: Sorting;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | string[];
}

const initialState: CategoriesState = {
  categories: [],
  pagination: { pageSize: 10, pageNumber: 0, total: 1 },
  sorting: { type: 'ASC', field: 'updatedAt' },
  status: 'idle',
  error: null,
};

const categoriesSlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetState, () => initialState)
      .addCase(getPartCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getPartCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = [...state.categories, ...action.payload.data];
        state.pagination = action.payload.pagination;
        state.sorting = action.payload.sorting;
      })
      .addCase(getPartCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.categories.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;
