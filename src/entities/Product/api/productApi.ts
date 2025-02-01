import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandler } from 'src/shared/configs/apiConfig';
import { stringifyObject } from 'src/shared/lib/stringifyObjectHelper';
import {
  GetPageResult,
  MutateProductBody,
  MutateRequest,
  Product,
  ProductsFilters,
} from 'src/shared/types/serverTypes';

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['product'],
  baseQuery: baseQueryWithErrorHandler,
  endpoints: (builder) => ({
    getProducts: builder.query<GetPageResult<Product>, ProductsFilters>({
      query: (filters) =>
        `/products${
          !filters ? '' : `?${new URLSearchParams(stringifyObject(JSON.parse(JSON.stringify(filters)))).toString()}`
        }`,
      // query: (filters) => '/product',
      providesTags: ['product'],
      // keepUnusedDataFor: 10,
    }),
    updateProduct: builder.mutation<Product, MutateRequest<MutateProductBody>>({
      query: (updateProduct) => ({
        url: `/products/${updateProduct.id}`,
        method: 'PUT',
        body: updateProduct.body,
      }),
      // invalidatesTags: ['product'],
    }),
    createProduct: builder.mutation<Product, MutateProductBody>({
      query: (newProduct) => ({
        url: `/products/`,
        method: 'POST',
        body: newProduct,
      }),
      // invalidatesTags: ['product'],
    }),
  }),
});

export const { useGetProductsQuery, useUpdateProductMutation, useCreateProductMutation } = productApi;
