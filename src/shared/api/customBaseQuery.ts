// shared/api/customBaseQuery.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { errorsToStrings } from '../lib/errorsToStrings';
import { getTokenFromLocalStorage } from '../lib/localStorage';
import { navigateTo } from '../lib/navigationService';
import { ROUTES } from '../configs/routes';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://19429ba06ff2.vps.myjino.ru/api',
  prepareHeaders: (headers) => {
    const token = getTokenFromLocalStorage();
    // debugger;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError | string[]> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    const fetchError = result.error as FetchBaseQueryError;
    if (isNumber(fetchError.status)) {
      if (fetchError.status === 401) {
        navigateTo(ROUTES.AUTHENTICATED_SIGNIN);
      }
      if (fetchError.status === 404 || fetchError.status >= 500) {
        throw result.error;
      }
    }
    if (fetchError.data) {
      return { error: errorsToStrings(fetchError.data) };
    }

    return { error: ['Unknown error'] };
  }

  return result;
};

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};
