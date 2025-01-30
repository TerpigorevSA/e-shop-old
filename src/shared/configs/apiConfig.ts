import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessToken } from '../lib/localStorage';
import { ServerError } from '../types/serverTypes';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://19429ba06ff2.vps.myjino.ru/api',
  // baseUrl: 'https://localhost:3000',
  prepareHeaders: (headers) => {
    const token = getAccessToken(); //localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  mode: 'cors',
});

export const baseQueryWithErrorHandler = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const errorData = result.error.data as ServerError[];
    console.error('API Error:', errorData);
    throw errorData; // Централизованный throw для обработки в компонентах
  }

  return result;
};
