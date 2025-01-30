import { createSlice } from '@reduxjs/toolkit';
import { Order, PaginationWithTotal, Sorting } from '../../../shared/types/serverTypes';
import { resetState } from '../../../shared/actions/actions';
import { getPartOrders, updateOrder, updatePartOrder } from '../../../entities/Order/model/thunks';

interface OrdersState {
  orders: Order[];
  pagination: PaginationWithTotal;
  sorting: Sorting;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | string[];
}

const initialState: OrdersState = {
  orders: [],
  pagination: { pageSize: 10, pageNumber: 0, total: 1 },
  sorting: { type: 'ASC', field: 'updatedAt' },
  status: 'idle',
  error: null,
};

const ordersSlice = createSlice({
  name: 'Orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetState, () => initialState)
      .addCase(getPartOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getPartOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = [...state.orders, ...action.payload.data];
        state.pagination = action.payload.pagination;
        state.sorting = action.payload.sorting;
      })
      .addCase(getPartOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string[];
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.orders.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string[];
      })
      .addCase(updatePartOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePartOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.orders.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updatePartOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string[];
      });
  },
});
export default ordersSlice.reducer;
