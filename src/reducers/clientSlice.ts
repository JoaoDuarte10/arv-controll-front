import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clientService } from '../services/clientService';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('clients/fetchClients', async () => {
  const { userId } = JSON.parse(localStorage.getItem('user-login') || '');
  const response = await clientService.findAllClient(userId);
  return response;
});

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: { payload: any }) => {
        state.status = 'succeeded';
        state.data = state.data.concat(action.payload.data);
      })
      .addCase(
        fetchPosts.rejected,
        (state: { status: string; error: any }, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        },
      );
  },
});

export const { getAllClients } = clientSlice.actions;

export default clientSlice.reducer;
