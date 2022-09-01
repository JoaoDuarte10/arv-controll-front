import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  client: '',
  procedure: '',
  date: '',
  time: '',
  price: '',
  phone: '',
  pacote: '',
  qtdTotalAtendimento: '',
  qtdAtendimento: '',
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setEditClient: {
      reducer(state, action) {
        state.id = action.payload.id;
        state.client = action.payload.client;
        state.procedure = action.payload.procedure;
        state.date = action.payload.date;
        state.time = action.payload.time;
        state.price = action.payload.price;
        state.phone = action.payload.phone;
        state.pacote = action.payload.pacote;
        state.qtdTotalAtendimento = action.payload.qtdTotalAtendimento;
        state.qtdAtendimento = action.payload.qtdAtendimento;
      },
    },
  },
});

export default scheduleSlice.reducer;
export const { setEditClient } = scheduleSlice.actions;
