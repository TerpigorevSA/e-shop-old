import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { getAccessToken } from '../lib/localStorage';

const customFetchBaseQuery = fetchBaseQuery({
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

// export const baseQueryWithErrorHandler: BaseQueryFn<string|FetchArgs,unknown,FetchBaseQueryError&{error:string[]}> = async (args, api, extraOptions) => {
export const baseQueryWithErrorHandler: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await customFetchBaseQuery(args, api, extraOptions);
  // console.error('baseQueryWithErrorHandler', result);
  // if (result.error) {
  //   const errorData = result.error.data as ServerError[];
  //   console.error('API Error:', errorData);
  //   return {...result, error:handleApiError(result.error)}; //throw errorData; // Централизованный throw для обработки в компонентах
  // }

  return result;
};
