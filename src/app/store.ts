import { configureStore } from '@reduxjs/toolkit';
import authenticatedReducer from '../reducers/authenticatedSlice';
import clientReducer from '../reducers/clientSlice';
import { apiSlice } from '../api/ApiSlice';
import scheduleReducer from '../reducers/scheduleSlice';

export default configureStore({
  reducer: {
    authenticated: authenticatedReducer,
    clients: clientReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    schedule: scheduleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
