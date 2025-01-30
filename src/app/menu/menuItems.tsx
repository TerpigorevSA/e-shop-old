import React from 'react';
import { NavItem } from '../../shared/ui/NavigationBar/NavigationBar';
import AuthScreen, { AuthAction } from '../../pages/AuthScreen/AuthScreen';
import ProfileScreen from '../../pages/ProfileScreen/ProfileScreen';
import CatalogScreen from '../../pages/CatalogScreen/CatalogScreen';
import { AuthenticationState } from '../../shared/hocs/withAuthenticationState';
import ProductsEditScreen from '../../pages/ProductsScreen/ProductsEditScreen';
import CartScreen from '../../pages/CartScreen/CartScreen';
import RootScreen from '../../pages/RootScreen/RootScreen';
import CategoriesEditScreen from '../../pages/CategoriesScreen/CategoriesEditScreen';
import UserOrdersScreen from '../../pages/UserOrdersScreen/UserOrdersScreen';
import OrdersEditScreen from 'src/pages/OrderScreen/OrdersEditScreen';

const homeMenuItems: NavItem[] = [{ label: 'Routes.Home.label', path: '/', element: <RootScreen /> }];

const shopMenuItems: NavItem[] = [
  { label: 'Routes.Catalog.label', path: '/catalog', element: <CatalogScreen /> },
  { label: 'Routes.Cart.label', path: '/cart', element: <CartScreen /> },
  {
    label: 'Routes.UserOrders.label',
    authenticationState: AuthenticationState.Authenticated,
    path: '/userOrders',
    element: <UserOrdersScreen />,
  },
];

const editMenuItems: NavItem[] = [
  {
    label: 'Routes.Edit.label',
    authenticationState: AuthenticationState.AdminAuthenticated,
    dropdown: [
      {
        label: 'Routes.Edit.Orders.label',
        authenticationState: AuthenticationState.AdminAuthenticated,
        path: '/orders',
        element: <OrdersEditScreen />,
      },
      {
        label: 'Routes.Edit.Categories.label',
        authenticationState: AuthenticationState.AdminAuthenticated,
        path: '/categories',
        element: <CategoriesEditScreen />,
      },
      {
        label: 'Routes.Edit.Products.label',
        authenticationState: AuthenticationState.AdminAuthenticated,
        path: '/products',
        element: <ProductsEditScreen />,
      },
    ],
  },
];

const authMenuItems: NavItem[] = [
  {
    label: 'Routes.Auth.label',
    dropdown: [
      {
        label: 'Routes.Auth.SignIn.label',
        authenticationState: AuthenticationState.Unauthenticated,
        path: '/auth/SignIn',
        element: <AuthScreen authAction={AuthAction.SignIn} />,
      },
      {
        label: 'Routes.Auth.SignUp.label',
        authenticationState: AuthenticationState.Unauthenticated,
        path: '/auth/SignUp',
        element: <AuthScreen authAction={AuthAction.SignUp} />,
      },
      {
        label: 'Routes.Auth.SignOut.label',
        authenticationState: AuthenticationState.Authenticated,
        path: '/auth/SignOut',
        element: <AuthScreen authAction={AuthAction.SignOut} />,
      },
    ],
  },
];

const profileMenuItems: NavItem[] = [
  {
    label: 'Routes.Profile.label',
    authenticationState: AuthenticationState.Authenticated,
    path: '/profile',
    element: <ProfileScreen />,
  },
];

export default [...homeMenuItems, ...shopMenuItems, ...profileMenuItems, ...editMenuItems, ...authMenuItems];
