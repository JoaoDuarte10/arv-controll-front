import axios from 'axios';
import { Response } from './types/ResponseDTO';

const API_RV_BASE_URI = process.env.REACT_APP_BASE_URL;

const clientService = {
  async newClient(
    id_user: string,
    name: string,
    email: string,
    phone: string,
    segment: string,
  ): Promise<Response> {
    const URI = `${API_RV_BASE_URI}/api/client/create`;
    try {
      const { data, status } = await axios
        .post(
          URI,
          {
            name: name,
            email: email,
            phone: phone,
            segment: segment,
          },
          { headers: { 'id-user': id_user } },
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

  async updateClient(
    id_user: string,
    id: string,
    name: string,
    email: string,
    phone: string,
    segment: string,
  ): Promise<Response> {
    const URI = `${API_RV_BASE_URI}/api/client/update`;
    try {
      const { data, status } = await axios
        .put(
          URI,
          {
            id: id,
            name: name,
            email: email,
            phone: phone,
            segment: segment,
          },
          { headers: { 'id-user': id_user } },
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

  async findClient(id_user: string, id: string): Promise<Response> {
    const URI = `${API_RV_BASE_URI}/api/client/load`;
    try {
      const { data, status } = await axios
        .get(URI, {
          params: { id: id },
          headers: { 'id-user': id_user },
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

  async findAllClient(id_user: string): Promise<Response> {
    const URI = `${API_RV_BASE_URI}/api/client/all`;
    try {
      const { data, status } = await axios
        .get(URI, {
          headers: { 'id-user': id_user },
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

  async findAllClientBySegment(
    id_user: string,
    segment: string,
  ): Promise<Response> {
    const URI = `${API_RV_BASE_URI}/api/client/segment`;
    try {
      const { data, status } = await axios
        .get(URI, {
          params: { segment: segment },
          headers: { 'id-user': id_user },
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

  async deleteClient(id_user: string, id: string): Promise<Response> {
    const URI = `${API_RV_BASE_URI}/api/client`;
    try {
      const { data, status } = await axios
        .delete(URI, {
          params: { id: id },
          headers: { 'id-user': id_user },
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

export { clientService };
