import { baseApi } from '../../../shared/api/baseApi';
import { setCurrentUser } from './slice';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<
      {
        id: string;
        name: string;
        email: string;
        signUpDate: string;
        commandId: string;
      },
      void
    >({
      query: () => '/profile',
      providesTags: ['Profile'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data));
        } catch (error) {
          console.log('error', error);
        }
      },
    }),
    updateProfile: builder.mutation<
      {
        id: string;
        name: string;
        email: string;
        signUpDate: string;
        commandId: string;
      },
      { name: string }
    >({
      query: ({ name }) => ({
        url: '/profile',
        method: 'POST',
        body: { name },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    changePassword: builder.mutation<{ success: boolean }, { password: string; newPassword: string }>({
      query: ({ password, newPassword }) => ({
        url: '/profile/change-password',
        method: 'POST',
        body: { password, newPassword },
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useChangePasswordMutation } = userApi;
