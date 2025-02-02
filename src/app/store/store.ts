import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/Auth/model/slice';
import profileReducer from '../../features/Profile/model/slice';
import userReducer from '../../entities/User/model/slice';
import productsReducer from '../../features/Products/model/slice';
import cartReducer from '../../features/Cart/model/slice';
import categoriesReducer from '../../entities/Category/model/slice';
import ordersReducer from '../../features/Orders/model/slice';

import { apiMiddleware, apiReducer } from '../api/api';
import { productApi } from '../../entities/Product/api/productApi';
import { categoryApi } from '../../entities/Category/api/categoryApi';
import { orderApi } from '../../entities/Order/api/orderApi';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    api: apiReducer,
    auth: authReducer,
    profile: profileReducer,
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware, productApi.middleware, categoryApi.middleware, orderApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
