import { createSlice } from '@reduxjs/toolkit';

const userLogin = JSON.parse(localStorage.getItem('user-login'));

const initialState = {
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
          state.userId = action.payload.userId;
        }
      },
      prepare(userName, userId) {
        return {
          payload: {
            userName,
            userId,
          },
        };
      },
    },
  },
});

export const { loginAdded } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
