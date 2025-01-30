import React, { useState, useCallback } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { getAuth } from '../../lib/fakeGenerators/fakeGenerators';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [about, setAbout] = useState<string | null>(null);

  const handleSignOut = useCallback(() => {
    setToken(null);
    setIsAuthenticated(false);
    setEmail(null);
    setName(null);
    setAbout(null);
  }, []);

  const handleSignUp = useCallback(({ email, password }: { email: string; password: string }) => {
    setToken(getAuth());
    setIsAuthenticated(true);
    setEmail(email);
  }, []);

  const handleSignIn = useCallback(({ email, password }: { email: string; password: string }) => {
    setToken(getAuth());
    setIsAuthenticated(true);
    setEmail(email);
  }, []);

  const handleChangePassword = useCallback(
    ({ password, newPassword }: { password: string; newPassword: string }) => {
      console.log('onChangePasswordSubmit', token, email, password, newPassword);
    },
    [token, email]
  );

  const handleUpdateProfile = useCallback(
    ({ name, about }: { name: string; about: string | null }) => {
      console.log('onUpdateProfileSubmit', token, email, name, about);
      setAbout(about);
      setName(name);
    },
    [token, email]
  );

  return (
    <AuthContext.Provider
      value={{
        token,
        handleSignIn,
        handleSignOut,
        handleSignUp,
        handleChangePassword,
        handleUpdateProfile,
        isAuthenticated,
        email,
        name,
        about,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
