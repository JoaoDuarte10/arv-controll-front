import axios from 'axios';
import { Response } from './types/ResponseDTO';

const API_RV_BASE_URI = process.env.REACT_APP_BASE_URL;

export const clientHistoryService = {
  async createClientHistory(
    token: string,
    client: string,
    description: string,
    date: string,
  ): Promise<Response> {
    const URI = `${API_RV_BASE_URI}/api/history/create`;
    try {
      const { data, status } = await axios
        .post(
          URI,
          {
            client,
            description,
            date,
          },
          { headers: { authorization: token } },
        )
        .then((res) => ({ data: res.data, status: res.status }))
        .catch((err) => ({
          data: err.response.data,
          status: err.response.status,
        }));

      return { data, status };
    } catch (error: any) {
      return error;
    }
  },

  async getHistoryByClient(token: string, client: string): Promise<Response> {
    const URI = `${API_RV_BASE_URI}/api/history/client`;
    try {
      const { data, status } = await axios
        .get(URI, {
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

  async getHistoryByDate(token: string, date: string): Promise<Response> {
    const URI = `${API_RV_BASE_URI}/api/history/date`;
    try {
      const { data, status } = await axios
        .get(URI, {
          params: { date },
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

  async getHistoryByPeriod(
    token: string,
    date1: string,
    date2: string,
  ): Promise<Response> {
    const URI = `${API_RV_BASE_URI}/api/history/period`;
    try {
      const { data, status } = await axios
        .get(URI, {
          params: { date1, date2 },
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

  async getHistoryByAllFilters(
    token: string,
    client: string,
    date1: string,
    date2?: string,
  ): Promise<Response> {
    const URL = `${API_RV_BASE_URI}/api/history/all-filters`;
    try {
      const { data, status } = await axios
        .get(URL, {
          headers: { authorization: token },
          params: { client, date1, date2 },
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
