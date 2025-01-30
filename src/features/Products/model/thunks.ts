import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTokenFromLocalStorage } from '../../../shared/lib/localStorage';
import { API_BASE_URL } from '../../../shared/configs/api';
import {
  GetPageResult,
  Product,
  ProductsFilters,
  ServerErrors,
  MutateRequest,
  MutateProductBody,
} from '../../../shared/types/serverTypes';
import { getLocaleErrorMessage } from '../../../shared/lib/errorsParsing';
import { stringifyObject } from '../../../shared/lib/stringifyObjectHelper';

export const getPartProducts = createAsyncThunk<GetPageResult<Product>, ProductsFilters>(
  'products/getpage',
  async (filters: ProductsFilters, thunkAPI) => {
    const token = getTokenFromLocalStorage();
    if (!token) throw new Error('No token');

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products${!filters ? '' : `?${new URLSearchParams(stringifyObject(filters)).toString()}`}`,
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

export const updateProduct = createAsyncThunk<Product, MutateRequest<MutateProductBody>>(
  'products/update',
  async (updateProduct, thunkAPI) => {
    const token = getTokenFromLocalStorage();
    if (!token) throw new Error('No token');

    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${updateProduct.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(updateProduct.body),
      });

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

export const addProduct = createAsyncThunk<Product, MutateProductBody>('products/add', async (newProduct, thunkAPI) => {
  const token = getTokenFromLocalStorage();
  if (!token) throw new Error('No token');

  try {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });

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
});
