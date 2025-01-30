import { createSlice } from '@reduxjs/toolkit';
import { User } from './types';
import { resetState } from '../../../shared/actions/actions';
import { Order, PaginationWithTotal, Sorting } from 'src/shared/types/serverTypes';
import { getUserOrders } from './thunks';

interface OrdersState {
  orders: Order[];
  pagination: PaginationWithTotal;
  sorting: Sorting;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | string[];
}

interface UserState {
  currentUser: User | null;
  currentOrders: OrdersState;
}

const initialState: UserState = {
  currentUser: null,
  currentOrders: {
    orders: [],
    pagination: { pageSize: 10, pageNumber: 0, total: 1 },
    sorting: { type: 'ASC', field: 'updatedAt' },
    error: null,
    status: 'idle',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetState, () => initialState)
      .addCase(getUserOrders.pending, (state) => {
        state.currentOrders.status = 'loading';
        state.currentOrders.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.currentOrders.status = 'succeeded';
        state.currentOrders.orders = [...state.currentOrders.orders, ...action.payload.data];
        state.currentOrders.pagination = action.payload.pagination;
        state.currentOrders.sorting = action.payload.sorting;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.currentOrders.status = 'failed';
        state.currentOrders.error = action.payload as string[];
      });
  },
});

export const { setCurrentUser, clearCurrentUser, updateCurrentUser } = userSlice.actions;
export default userSlice.reducer;
