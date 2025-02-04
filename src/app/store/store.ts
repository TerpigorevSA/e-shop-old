import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/Auth/model/slice'
import cartReducer from '../../features/Cart/model/slice'

import { apiMiddleware, apiReducer, apiReducerPath } from '../api/api';

export const store = configureStore({
  reducer: {
    [apiReducerPath]: apiReducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware), //, productApi.middleware, categoryApi.middleware, orderApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
