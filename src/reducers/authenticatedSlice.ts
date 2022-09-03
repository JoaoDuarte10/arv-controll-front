import { createSlice } from '@reduxjs/toolkit';
import { ReducerActionType } from './types/reducerType';

const loginInLocalStorage = localStorage.getItem('user-login');

type UserLogin = {
  userName: string | null;
  userId: string | null;
  redirectLoginPageUri?: string;
}

const initialState: UserLogin = {
  userName: loginInLocalStorage ? JSON.parse(loginInLocalStorage).userName : null,
  userId: loginInLocalStorage ? JSON.parse(loginInLocalStorage).userId : null,
  redirectLoginPageUri: '/login',
};

const authenticatedSlice = createSlice({
  name: 'authenticated',
  initialState,
  reducers: {
    loginAdded: {
      reducer(state: UserLogin, action: ReducerActionType<UserLogin>) {
        if (!initialState.userId) {
          localStorage.setItem('user-login', JSON.stringify(action.payload));
          state.userName = action.payload.userName;
          state.userId = action.payload.userId;
        }
      },
      prepare(params: { login: string, id: string }): { payload: UserLogin } {
        return {
          payload: {
            userName: params.login,
            userId: params.id,
          },
        };
      },
    },
  },
});

export const { loginAdded } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
