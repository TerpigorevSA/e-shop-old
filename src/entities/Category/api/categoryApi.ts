import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandler } from 'src/shared/configs/apiConfig';
import { stringifyObject } from 'src/shared/lib/stringifyObjectHelper';
import {
  GetPageResult,
  Category,
  CategoriesFilters,
  MutateRequest,
  MutateCategoryBody,
} from 'src/shared/types/serverTypes';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  tagTypes: ['category'],
  baseQuery: baseQueryWithErrorHandler,
  endpoints: (builder) => ({
    getCategories: builder.query<GetPageResult<Category>, CategoriesFilters>({
      query: (filters) =>
        `/categories${!filters ? '' : `?${new URLSearchParams(stringifyObject(filters)).toString()}`}`,
      // query: (filters) => '/category',
      providesTags: ['category'],
      // keepUnusedDataFor: 10,
    }),
    updateCategory: builder.mutation<Category, MutateRequest<MutateCategoryBody>>({
      query: (updateCategory) => ({
        url: `/categories/${updateCategory.id}`,
        method: 'PUT',
        body: updateCategory.body,
      }),
      // invalidatesTags: ['category'],
    }),
    createCategory: builder.mutation<Category, MutateCategoryBody>({
      query: (newCategory) => ({
        url: `/categories/`,
        method: 'PUT',
        body: newCategory,
      }),
      // invalidatesTags: ['category'],
    }),
  }),
});

export const { useGetCategoriesQuery, useUpdateCategoryMutation, useCreateCategoryMutation } = categoryApi;
