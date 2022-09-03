import { createSlice } from '@reduxjs/toolkit';

const userLogin = JSON.parse(localStorage.getItem('user-login') as string);

type UserLogin = {
  userName: string;
  userId: string;
  redirectLoginPageUri: string;
}

const initialState: UserLogin = {
  userName: userLogin ? userLogin.userName : null,
  userId: userLogin ? userLogin.userId : null,
  redirectLoginPageUri: '/login',
};

const authenticatedSlice = createSlice({
  name: 'authenticated',
  initialState,
  reducers: {
    loginAdded: {
      reducer(state, action) {
        if (!initialState.userId) {
          localStorage.setItem('user-login', JSON.stringify(action.payload));
          state.userName = action.payload.userName;
          state.userId = action.payload.id;
        }
      },
      prepare(login) {
        return {
          payload: {
            userName: login.userName,
            id: login.userId,
          },
        } as any;
      },
    },
  },
});

export const { loginAdded } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
