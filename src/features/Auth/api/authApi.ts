import { baseApi } from "src/shared/api/baseApi";
import { AuthResult, SignInBody, SignUpBody } from "src/shared/types/serverTypes";

export const authApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        signin: builder.mutation<AuthResult,SignInBody>({
            query:(body)=>({
                url: '/signin',
                method: 'POST',
                body,
            }),
            invalidatesTags:['Profile']
        }),
        signup: builder.mutation<AuthResult,SignUpBody>({
            query:(body)=>({
                url: '/signup',
                method: 'POST',
                body,
            }),
            invalidatesTags:['Profile']
        }),
    }),
});

export const {useSigninMutation, useSignupMutation} = authApi;