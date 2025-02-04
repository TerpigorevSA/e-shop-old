import { useSigninMutation, useSignupMutation } from '../api/authApi';
import { clearToken, saveToken } from 'src/shared/lib/localStorage';
import { COMMAND_ID } from 'src/shared/configs/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store/store';
import { setAuthenticated, signout } from './slice';

const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const [signin, { isLoading: isLoadingSignin, isError: isErrorSignin, error: errorSignin }] = useSigninMutation();
  const [signup, { isLoading: isLoadingSignup, isError: isErrorSignup, error: errorSignup }] = useSignupMutation();
  // const {
  //   data: profile,
  //   refetch,
  //   isUninitialized,
  // } = useGetProfileQuery(undefined, {
  //   skip: !getAccessToken(),
  // });

  const signIn = async (email: string, password: string) => {
    const token = await signin({ email, password });
    if (token.data) {
      saveToken(token.data.token);
      dispatch(setAuthenticated(token.data.token));
    }
  };

  const signUp = async (email: string, password: string) => {
    const token = await signup({ email, password, commandId: COMMAND_ID });
    if (token.data) {
      saveToken(token.data.token);
      dispatch(setAuthenticated(token.data.token));
    }
  };

  const signOut = () => {
    dispatch(signout());
  };

  return {
    signIn,
    signUp,
    signOut,
    isLoading: isLoadingSignin || isLoadingSignup,
    isError: isErrorSignin || isErrorSignup,
    error: [...(isErrorSignin ? (errorSignin as string[]) : []), ...(isErrorSignup ? (errorSignup as string[]) : [])],
  };
};

export default useAuth;
