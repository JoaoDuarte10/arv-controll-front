import { createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/authService';
import { ReducerActionType } from './types/reducerType';

const loginInLocalStorage = localStorage.getItem('user-login');

type UserLogin = {
  userName?: string | null;
  token: string | null;
  refreshToken: string;
  redirectLoginPageUri?: string;
};

const initialState: UserLogin = {
  userName: loginInLocalStorage
    ? JSON.parse(loginInLocalStorage).userName
    : null,
  token: loginInLocalStorage ? JSON.parse(loginInLocalStorage).token : null,
  refreshToken: loginInLocalStorage ? JSON.parse(loginInLocalStorage).refreshToken : null,
  redirectLoginPageUri: '/login',
};

const authenticatedSlice = createSlice({
  name: 'authenticated',
  initialState,
  reducers: {
    loginAdded: {
      reducer(state: UserLogin, action: ReducerActionType<UserLogin>) {
        if (!initialState.token) {
          const setLocalStorage = {
            ...action.payload,
            userName: authService.getUserNameInToken(action.payload.token as string)
          }
          authService.cleanUserInLocalStorange();
          localStorage.setItem('user-login', JSON.stringify(setLocalStorage));
          state.userName = setLocalStorage.userName;
          state.token = action.payload.token;
        }
      },
      prepare(params: { token: string; refreshToken: string }): { payload: UserLogin } {
        return {
          payload: {
            token: params.token,
            refreshToken: params.refreshToken,
          },
        };
      },
    },
    validateToken: {
      reducer(state: UserLogin, action: any) {
        if (authService.isValidToken(action.payload)) return
        state.token = null;
      },
      prepare(params) {
        return { payload: params }
      },
    }
  },
});

export const { loginAdded, validateToken } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
