import React, { useEffect } from 'react';
import cn from 'clsx';
import style from './App.css';
import Layout from './Layout/Layout';
import './localization';
import { Route, Routes } from 'react-router-dom';
import { WithAuthenticationState } from '../shared/hocs/withAuthenticationState';
import ThemeProvider from '../shared/providers/ThemeProvider/ThemeProvider';
import { LanguageProvider } from '../shared/providers/LanguageProvider/LanguageProvider';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { setupAuthSync } from './services/setupAuthSync';
import { getAccessToken } from '../shared/lib/localStorage';
// import { getProfile } from '../entities/User/model/thunks';
import { setAuthenticated } from '../features/Auth/model/slice';
import menuItems from './menu/menuItems';
import { NavigationProvider } from './providers/NavigationProvider';
import { ROUTES } from '../shared/configs/routes';
import AuthScreen, { AuthAction } from 'src/pages/AuthScreen/AuthScreen';
import { ErrorBoundary } from './providers/ErrorBoundary';

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (getAccessToken()) {
      // dispatch(getProfile());
      const token = getAccessToken();
      dispatch(setAuthenticated({ token }));
    }
    setupAuthSync();
  }, []);

  const generateRoutes = (items: typeof menuItems, rootRoute: string, signInRoute: string) => {
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
                    routes={{ root: rootRoute, signIn: signInRoute }}
                  >
                    {item.element}
                  </WithAuthenticationState>
                }
              />
              {generateRoutes(item.dropdown, rootRoute, signInRoute)}
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
                  routes={{ root: rootRoute, signIn: signInRoute }}
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
        <NavigationProvider>
          <ErrorBoundary>
            <div className={cn(style.App)}>
              <Routes>
                <Route path="/" element={<Layout menuItems={menuItems} />}>
                  {generateRoutes(menuItems, ROUTES.ROOT, ROUTES.SIGNIN)}
                  <Route path={ROUTES.AUTHENTICATED_SIGNIN} element={<AuthScreen authAction={AuthAction.SignIn} />} />
                </Route>
              </Routes>
            </div>
          </ErrorBoundary>
        </NavigationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
