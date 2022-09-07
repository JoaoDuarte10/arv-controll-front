import { configureStore } from '@reduxjs/toolkit';
import authenticatedReducer from '../reducers/authenticatedSlice';
import { apiSlice } from '../api/ApiSlice';
import scheduleReducer from '../reducers/scheduleSlice';

export const store = configureStore({
  reducer: {
    authenticated: authenticatedReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    schedule: scheduleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type ReducerStore = {
  authenticated: {
    userName: any;
    token: string;
    refreshToken: string;
    redirectLoginPageUri: string;
  };
  clients: {
    data: never[];
    status: string;
    error: null;
  };
  schedule: {
    id: string;
    client: string;
    procedure: string;
    date: string;
    time: string;
    price: string;
    phone: string;
    pacote: boolean;
    qtdTotalAtendimento: number;
    qtdAtendimento: number;
  };
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
