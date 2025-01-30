import { saveTokenToLocalStorage, removeTokenFromLocalStorage } from '../../../shared/lib/localStorage';
import { baseApi } from '../../../shared/api/baseApi';
import { userApi } from '../../../entities/User/model/api';
import { setAuthenticated } from './slice';
import { ServerErrors } from '../../../shared/types/serverTypes';
import { getLocaleErrorMessage } from '../../../shared/lib/errorsParsing';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/signin',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          saveTokenToLocalStorage(data.token);
          dispatch(setAuthenticated(data));

          dispatch(userApi.util.invalidateTags(['Profile']));
        } catch (error) {
          removeTokenFromLocalStorage();
          console.error('Signin failed:', error);
        }
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return (baseQueryReturnValue.data as { status: number } & ServerErrors).errors.map((error) =>
          getLocaleErrorMessage(error)
        );
      },
    }),
    signup: builder.mutation<{ token: string }, { email: string; password: string; commandId: string }>({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          saveTokenToLocalStorage(data.token);
          dispatch(setAuthenticated(data.token));

          dispatch(baseApi.util.invalidateTags(['Profile']));
        } catch (error) {
          removeTokenFromLocalStorage();
          console.error('Signin failed:', error);
        }
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return (baseQueryReturnValue.data as { status: number } & ServerErrors).errors.map((error) =>
          getLocaleErrorMessage(error)
        );
      },
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = authApi;
