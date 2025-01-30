import { createContext, useContext } from 'react';

export type ChangePasswordHandler = ({ password, newPassword }: { password: string; newPassword: string }) => void;
export type UpdateProfileHandler = ({ name, about }: { name: string; about: string }) => void;

type AuthContextProps = {
  token: string | null;
  handleSignIn: ({ email, password }: { email: string; password: string }) => void;
  handleSignOut: () => void;
  handleSignUp: ({ email, password }: { email: string; password: string }) => void;
  handleChangePassword: ChangePasswordHandler;
  handleUpdateProfile: UpdateProfileHandler;
  isAuthenticated: boolean;
  email: string | null;
  name: string | null;
  about: string | null;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export default useAuth;
