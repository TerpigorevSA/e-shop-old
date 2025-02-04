import React from 'react';
import SignIn, { SignInFields } from './SignIn/SignIn';
import SignUp, { SignUpFields } from './SignUp/SignUp';
import cn from 'clsx';
import styles from './AuthScreen.module.css';
import { useTranslation } from 'react-i18next';
import SignOut from './SignOut/SignOut';
import useAuth from 'src/features/Auth/model/useAuth';

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

  const { signIn, signUp, signOut, isLoading, error } = useAuth();

  const handleSignInSubmit = (data: SignInFields) => {
    signIn(data.email, data.password);
  };
  const handleSignUpSubmit = (data: SignUpFields) => {
    signUp(data.email, data.password);
  };

  const handleSignOut = () => signOut();

  if (isLoading) {
    return <div>{'loading'}</div>;
  }

  const signInContent = <>{authAction === AuthAction.SignIn && <SignIn onSubmit={handleSignInSubmit} />}</>;
  const signUpContent = <>{authAction === AuthAction.SignUp && <SignUp onSubmit={handleSignUpSubmit} />}</>;
  const signOutContent = <>{authAction === AuthAction.SignOut && <SignOut onSignOut={handleSignOut} />}</>;

  return (
    <div className={cn(styles.page)}>
      <div>
        {signInContent}
        {signUpContent}
        {signOutContent}
      </div>
      {error && <div className={styles.error}>{(error as string[]).map((str) => t(str)).join('\n')}</div>}
    </div>
  );
};

export default AuthScreen;
