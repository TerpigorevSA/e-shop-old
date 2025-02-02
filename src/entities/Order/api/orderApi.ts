import { stringifyObject } from 'src/shared/lib/stringifyObjectHelper';
import {
  GetPageResult,
  MutateOrderBody,
  MutateRequest,
  Order,
  OrdersFilters,
} from 'src/shared/types/serverTypes';
import { baseApi } from '../../../shared/api/baseApi';

export const orderApi = baseApi.injectEndpoints({
  // export const orderApi = createApi({
  // reducerPath: 'orderApi',
  // tagTypes: ['order'],
  // baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getOrders: builder.query<GetPageResult<Order>, OrdersFilters>({
      query: (filters) =>
        `/orders${!filters ? '' : `?${new URLSearchParams(stringifyObject(JSON.parse(JSON.stringify(filters)))).toString()}`
        }`,
      // query: (filters) => '/order',
      // providesTags: ['order'],
      // keepUnusedDataFor: 10,
    }),
    updateOrder: builder.mutation<Order, MutateRequest<MutateOrderBody>>({
      query: (updateOrder) => ({
        url: `/orders/${updateOrder.id}`,
        method: 'PUT',
        body: updateOrder.body,
      }),
      // invalidatesTags: ['order'],
    }),
    createOrder: builder.mutation<Order, MutateOrderBody>({
      query: (newOrder) => ({
        url: `/orders/`,
        method: 'POST',
        body: newOrder,
      }),
      // invalidatesTags: ['order'],
    }),
  }),
});

export const { useGetOrdersQuery, useUpdateOrderMutation, useCreateOrderMutation } = orderApi;
