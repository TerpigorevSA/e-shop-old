import React from 'react';
import SignIn, { SignInFields } from './SignIn/SignIn';
import SignUp, { SignUpFields } from './SignUp/SignUp';
import cn from 'clsx';
import styles from './AuthScreen.module.css';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from '../../app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../features/Auth/model/thunks';
import SignOut from './SignOut/SignOut';
import { useSigninMutation, useSignupMutation } from '../../features/Auth/model/api';
import { useGetProfileQuery } from '../../entities/User/model/api';
import { COMMAND_ID } from '../../shared/configs/api';

export enum AuthAction {
  SignIn = 'signIn',
  SignUp = 'signUp',
  SignOut = 'signOut',
}

type AuthScreenProps = {
  authAction: AuthAction;
};

const AuthScreen: React.FC<AuthScreenProps> = ({ authAction }) => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);

  const [Signin, { isLoading: isSigninLoading, isError: isSigninError, error: signinError }] = useSigninMutation();
  const [Signup, { isLoading: isSignupLoading, isError: isSignupError, error: signupError }] = useSignupMutation();
  useGetProfileQuery();

  const handleSignInSubmit = async (data: SignInFields) => {
    await Signin({ email: data.email, password: data.password });
  };
  const handleSignUpSubmit = async (data: SignUpFields) => {
    await Signup({ email: data.email, password: data.password, commandId: COMMAND_ID });
  };

  const handleSignOut = () => dispatch(signout());

  if (isSigninLoading || isSignupLoading) {
    return <div>{'loading'}</div>;
  }

  const signIn = <>{authAction === AuthAction.SignIn && <SignIn onSubmit={handleSignInSubmit} />}</>;
  const signUp = <>{authAction === AuthAction.SignUp && <SignUp onSubmit={handleSignUpSubmit} />}</>;
  const signOut = <>{authAction === AuthAction.SignOut && <SignOut onSignOut={handleSignOut} />}</>;

  return (
    <div className={cn(styles.page)}>
      <div>
        {signIn}
        {signUp}
        {signOut}
      </div>
      {isSigninError && <div className={styles.error}>{(signinError as string[]).map((str) => t(str)).join('\n')}</div>}
      {isSignupError && <div className={styles.error}>{(signinError as string[]).map((str) => t(str)).join('\n')}</div>}
    </div>
  );
};

export default AuthScreen;
