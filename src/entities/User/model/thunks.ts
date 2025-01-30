import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTokenFromLocalStorage } from '../../../shared/lib/localStorage';
import { setCurrentUser, updateCurrentUser } from './slice';
import { API_BASE_URL } from '../../../shared/configs/api';
import { GetPageResult, Order, ServerErrors, UserOrdersFilters } from '../../../shared/types/serverTypes';
import { getLocaleErrorMessage } from '../../../shared/lib/errorsParsing';
import { stringifyObject } from 'src/shared/lib/stringifyObjectHelper';

export const getProfile = createAsyncThunk('user/getProfile', async (_, thunkAPI) => {
  const token = getTokenFromLocalStorage();
  if (!token) throw new Error('No token');

  try {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errors = await response.json();
      const errorMessages = (errors as ServerErrors).errors.map((error) => getLocaleErrorMessage(error));
      return thunkAPI.rejectWithValue(errorMessages);
    }
    const data = await response.json();

    thunkAPI.dispatch(setCurrentUser(data));

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(['CommonError.UnexpectedError']);
  }
});

export const updateProfile = createAsyncThunk('user/updateProfile', async (user: { name: string }, thunkAPI) => {
  const token = getTokenFromLocalStorage();
  if (!token) throw new Error('No token');

  try {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errors = await response.json();
      const errorMessages = (errors as ServerErrors).errors.map((error) => getLocaleErrorMessage(error));
      return thunkAPI.rejectWithValue(errorMessages);
    }
    const data = await response.json();

    thunkAPI.dispatch(updateCurrentUser(data));

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(['CommonError.UnexpectedError']);
  }
});

export const changePassword = createAsyncThunk(
  'user/chngePassword',
  async (user: { password: string; newPassword: string }, thunkAPI) => {
    const token = getTokenFromLocalStorage();
    if (!token) throw new Error('No token');

    try {
      const response = await fetch(`${API_BASE_URL}/api/profile/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(user),
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

export const getUserOrders = createAsyncThunk<GetPageResult<Order>, UserOrdersFilters>(
  'products/getUserOrders',
  async (filters: UserOrdersFilters, thunkAPI) => {
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
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);
