import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './customBaseQuery';

export const baseApi = createApi({
  reducerPath: '/api',
  tagTypes: ['Profile'],
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});
