export const TOKEN_KEY = 'auth_token';

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const saveTokens = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
};
