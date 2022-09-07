import axios from 'axios';
import { Response } from './types/ResponseDTO';

const API_RV_BASE_URI = process.env.REACT_APP_BASE_URL;

const segmentService = {
  async getSegment(token: string): Promise<Response> {
    const URL = `${API_RV_BASE_URI}/api/segments`;
    try {
      const { data, status } = await axios
        .get(URL, { headers: { 'authorization': token } })
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

  async createSegment(token: string, segment: string): Promise<Response> {
    const URL = `${API_RV_BASE_URI}/api/segment/create`;
    try {
      const { data, status } = await axios
        .post(
          URL,
          {
            segment,
          },
          { headers: { 'authorization': token } },
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

  async updateSegment(
    token: string,
    id: string,
    segment: string,
  ): Promise<Response> {
    const URL = `${API_RV_BASE_URI}/api/segment/update`;
    try {
      const { data, status } = await axios
        .put(
          URL,
          {
            id,
            segment,
          },
          { headers: { 'authorization': token } },
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

  async deleteSegment(
    token: string,
    id: string,
    segment: string,
  ): Promise<Response> {
    const URL = `${API_RV_BASE_URI}/api/segment`;
    try {
      const { data, status } = await axios
        .delete(URL, {
          params: { id, segment },
          headers: { 'authorization': token },
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

export { segmentService };
