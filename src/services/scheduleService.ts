import axios from 'axios';
import { Response } from './types/ResponseDTO';

const API_RV_BASE_URI = process.env.REACT_APP_BASE_URL;

const scheduleService = {
  async getClientsSchedule(token: string, date: string): Promise<Response> {
    const URL = `${API_RV_BASE_URI}/api/schedule/date`;
    try {
      const { data, status } = await axios
        .get(URL, {
          params: { date: date },
          headers: { authorization: token },
        })
        .then((res) => ({ data: res.data, status: res.status }))
        .catch((err) => ({
          data: err.response.data,
          status: err.response.status,
        }));

      return { data, status };
    } catch (error) {
      return error;
    }
  },

  async addClientSchedule(
    token: string,
    client: string,
    procedure: string,
    date: string,
    time: string,
    price: string,
    contact: string,
    pacote: boolean,
    qtdTotalAtendimento: number,
  ): Promise<Response> {
    const URL = `${API_RV_BASE_URI}/api/schedule/new`;
    try {
      const { data, status } = await axios
        .post(
          URL,
          {
            client: client,
            procedure: procedure,
            date: date,
            time: time,
            price: price,
            contact: contact,
            pacote: pacote || null,
            qtdTotalAtendimento: qtdTotalAtendimento,
          },
          { headers: { authorization: token } },
        )
        .then((res) => ({ data: res.data, status: res.status }))
        .catch((err) => ({
          data: err.response.data,
          status: err.response.status,
        }));

      return { data, status };
    } catch (error) {
      return error;
    }
  },

  async updateClientSchedule(
    token: string,
    id: string,
    client: string,
    procedure: string,
    date: string,
    time: string,
    price: string,
    contact: string,
    pacote: boolean,
    qtdTotalAtendimento: number,
    qtdAtendimento: number,
  ): Promise<Response> {
    const URL = `${API_RV_BASE_URI}/api/schedule/update`;
    try {
      const { data, status } = await axios
        .put(
          URL,
          {
            id: id,
            client: client,
            procedure: procedure,
            date: date,
            time: time,
            price: price,
            contact: contact,
            pacote: pacote,
            qtdTotalAtendimento: qtdTotalAtendimento,
            qtdAtendimento,
          },
          { headers: { authorization: token } },
        )
        .then((res) => ({ data: res.data, status: res.status }))
        .catch((err) => ({
          data: err.response.data,
          status: err.response.status,
        }));

      return { data, status };
    } catch (error) {
      return error;
    }
  },

  async deleteClientSchedule(token: string, id: string): Promise<Response> {
    const URL = `${API_RV_BASE_URI}/api/schedule`;
    try {
      const { data, status } = await axios
        .delete(URL, {
          params: { id },
          headers: { authorization: token },
        })
        .then((res) => ({ data: res.data, status: res.status }))
        .catch((err) => ({
          data: err.response.data,
          status: err.response.status,
        }));

      return { data, status };
    } catch (error) {
      return error;
    }
  },

  async finishClientSchedule(token: string, id: string): Promise<Response> {
    const URL = `${API_RV_BASE_URI}/api/schedule/finish`;
    try {
      const { data, status } = await axios
        .post(
          URL,
          {
            id: id,
          },
          { headers: { authorization: token } },
        )
        .then((res) => ({ data: res.data, status: res.status }))
        .catch((err) => ({
          data: err.response.data,
          status: err.response.status,
        }));

      return { data, status };
    } catch (error) {
      return error;
    }
  },

  async getAllExpiredSchedules(token: string): Promise<Response> {
    const URL = `${API_RV_BASE_URI}/api/schedule/expireds`;

    try {
      const { data, status } = await axios
        .get(URL, { headers: { authorization: token } })
        .then((res) => ({ data: res.data, status: res.status }))
        .catch((err) => ({
          data: err.response.data,
          status: err.response.status,
        }));

      return { data, status };
    } catch (error) {
      return error;
    }
  },

  async getScheduleByClient(token: string, client: string): Promise<Response> {
    const URL = `${API_RV_BASE_URI}/api/schedule/client`;

    try {
      const { data, status } = await axios
        .get(URL, {
          params: { client },
          headers: { authorization: token },
        })
        .then((res) => ({ data: res.data, status: res.status }))
        .catch((err) => ({
          data: err.response.data,
          status: err.response.status,
        }));

      return { data, status };
    } catch (error) {
      return error;
    }
  },
};

export { scheduleService };
