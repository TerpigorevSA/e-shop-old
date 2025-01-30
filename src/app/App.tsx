import React, { useEffect, useState } from 'react';
import cn from 'clsx';
import style from './App.css';
import Layout from './Layout/Layout';
import './localization';
import { Route, Routes } from 'react-router-dom';
import { WithAuthenticationState } from '../shared/hocs/withAuthenticationState';
import ThemeProvider from '../shared/providers/ThemeProvider/ThemeProvider';
import { LanguageProvider } from '../shared/providers/LanguageProvider/LanguageProvider';
import AuthProvider from '../shared/providers/AuthProvider/AuthProvider';
import ProductsProvider from '../shared/providers/ProductsProvider/ProductsProvider';
import CartProvider from '../shared/providers/CartProvider/CartProvider';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { setupAuthSync } from '../features/Auth/model/sync';
import { getTokenFromLocalStorage } from '../shared/lib/localStorage';
import { getProfile } from '../entities/User/model/thunks';
import { setAuthenticated } from '../features/Auth/model/slice';
import menuItems from './menu/menuItems';
import { getCategories } from '../entities/Category/model/thunks';

function App() {
  const [initialized, setInitialization] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (getTokenFromLocalStorage()) {
      dispatch(getProfile());
      const token = getTokenFromLocalStorage();
      dispatch(setAuthenticated({ token }));
      dispatch(getCategories(null));
    }
    setupAuthSync();
    setInitialization(true);
  }, []);

  const generateRoutes = (items: typeof menuItems) => {
    return [
      ...items.map((item) => {
        if (item.dropdown) {
          return (
            <React.Fragment key={item.path + item.label}>
              <Route
                path={item.path}
                element={
                  <WithAuthenticationState
                    authenticationState={item.authenticationState}
                    routes={{ root: '/', signIn: '/auth/SignIn' }}
                  >
                    {item.element}
                  </WithAuthenticationState>
                }
              />
              {generateRoutes(item.dropdown)}
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={item.path + item.label}>
            <Route
              path={item.path}
              element={
                <WithAuthenticationState
                  authenticationState={item.authenticationState}
                  routes={{ root: '/', signIn: '/auth/SignIn' }}
                >
                  {item.element}
                </WithAuthenticationState>
              }
            />
          </React.Fragment>
        );
      }),
    ];
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <div className={cn(style.App)}>
                <Routes>
                  <Route path="/" element={<Layout menuItems={menuItems} />}>
                    {generateRoutes(menuItems)}
                  </Route>
                </Routes>
              </div>
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
