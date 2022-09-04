import { createSlice } from '@reduxjs/toolkit';
import { ReducerActionType } from './types/reducerType';

export type ISchedule = {
  id: string;
  client: string;
  procedure: string;
  date: string;
  time: string;
  price: string;
  phone: string;
  pacote: boolean | null;
  qtdTotalAtendimento: number;
  qtdAtendimento: string;
}

const initialState: ISchedule = {
  id: '',
  client: '',
  procedure: '',
  date: '',
  time: '',
  price: '',
  phone: '',
  pacote: false,
  qtdTotalAtendimento: 0,
  qtdAtendimento: '',
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    onEditClient: {
      reducer(state: ISchedule, action: ReducerActionType) {
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
      prepare(payload) {
        return {
          payload
        }
      },
    },
  },
});

export default scheduleSlice.reducer;
export const { onEditClient } = scheduleSlice.actions;
