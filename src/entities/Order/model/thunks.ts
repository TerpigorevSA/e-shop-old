import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTokenFromLocalStorage } from '../../../shared/lib/localStorage';
import { API_BASE_URL } from '../../../shared/configs/api';
import {
  GetPageResult,
  Order,
  OrdersFilters,
  ServerErrors,
  MutateRequest,
  MutateOrderBody,
  MutatePartOrderBody,
} from '../../../shared/types/serverTypes';
import { getLocaleErrorMessage } from '../../../shared/lib/errorsParsing';
import { stringifyObject } from '../../../shared/lib/stringifyObjectHelper';

export const getPartOrders = createAsyncThunk<GetPageResult<Order>, OrdersFilters>(
  'orders/getpage',
  async (filters: OrdersFilters, thunkAPI) => {
    const token = getTokenFromLocalStorage();
    if (!token) throw new Error('No token');

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders${!filters ? '' : `?${new URLSearchParams(stringifyObject(filters)).toString()}`}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        const errors = await response.json();
        const errorMessages = (errors as ServerErrors).errors.map((error) => getLocaleErrorMessage(error));
        return thunkAPI.rejectWithValue(errorMessages);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(['CommonError.UnexpectedError']);
    }
  }
);

export const updateOrder = createAsyncThunk<Order, MutateRequest<MutateOrderBody>>(
  'orders/update',
  async (updateOrder, thunkAPI) => {
    const token = getTokenFromLocalStorage();
    if (!token) throw new Error('No token');

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${updateOrder.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(updateOrder.body),
      });

      if (!response.ok) {
        const errors = await response.json();
        const errorMessages = (errors as ServerErrors).errors.map((error) => getLocaleErrorMessage(error));
        return thunkAPI.rejectWithValue(errorMessages);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(['CommonError.UnexpectedError']);
    }
  }
);

export const updatePartOrder = createAsyncThunk<Order, MutateRequest<MutatePartOrderBody>>(
  'orders/updatePart',
  async (updateOrder, thunkAPI) => {
    const token = getTokenFromLocalStorage();
    if (!token) throw new Error('No token');

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${updateOrder.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(updateOrder.body),
      });

      if (!response.ok) {
        const errors = await response.json();
        const errorMessages = (errors as ServerErrors).errors.map((error) => getLocaleErrorMessage(error));
        return thunkAPI.rejectWithValue(errorMessages);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(['CommonError.UnexpectedError']);
    }
  }
);

export const createOrder = createAsyncThunk<Order, MutateOrderBody>('orders/add', async (newOrder, thunkAPI) => {
  const token = getTokenFromLocalStorage();
  if (!token) throw new Error('No token');

  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    });

    if (!response.ok) {
      const errors = await response.json();
      const errorMessages = (errors as ServerErrors).errors.map((error) => getLocaleErrorMessage(error));
      return thunkAPI.rejectWithValue(errorMessages);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(['CommonError.UnexpectedError']);
  }
});
