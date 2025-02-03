import { baseApi } from 'src/shared/api/baseApi';
import { ChangePasswordBody, Profile, UpdateProfileBody } from 'src/shared/types/serverTypes';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => '/profile',
      providesTags: ['Profile'],
      // keepUnusedDataFor: 10,
    }),
    updateProfile: builder.mutation<Profile, UpdateProfileBody>({
      query: (updateProfile) => ({
        url: `/profile`,
        method: 'PUT',
        body: updateProfile,
      }),
    }),
    changePassword: builder.mutation<Profile, ChangePasswordBody>({
      query: (newPassword) => ({
        url: `/profile/change-password`,
        method: 'PUT',
        body: newPassword,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useChangePasswordMutation } = profileApi;
