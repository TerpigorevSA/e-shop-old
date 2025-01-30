import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandler } from 'src/shared/configs/apiConfig';
import { stringifyObject } from 'src/shared/lib/stringifyObjectHelper';
import { GetPageResult, Product, ProductsFilters } from 'src/shared/types/serverTypes';

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['product'],
  baseQuery: baseQueryWithErrorHandler,
  endpoints: (builder) => ({
    getProducts: builder.query<GetPageResult<Product>, ProductsFilters>({
      query: (filters) => `/products${!filters ? '' : `?${new URLSearchParams(stringifyObject(filters)).toString()}`}`,
      // query: (filters) => '/product',
      providesTags: ['product'],
      // keepUnusedDataFor: 10,
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
