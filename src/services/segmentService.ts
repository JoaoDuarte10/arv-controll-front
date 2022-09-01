import axios from 'axios';

const API_RV_BASE_URI = process.env.REACT_APP_BASE_URL;

const segmentService = {
  async getSegment(id_user: string) {
    const URL = `${API_RV_BASE_URI}/api/segments`;
    try {
      const { data, status } = await axios
        .get(URL, { headers: { 'id-user': id_user } })
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

  async createSegment(id_user: string, segment: string) {
    const URL = `${API_RV_BASE_URI}/api/segment/create`;
    try {
      const { data, status } = await axios
        .post(
          URL,
          {
            segment,
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

  async updateSegment(id_user: string, id: string, segment: string) {
    const URL = `${API_RV_BASE_URI}/api/segment/update`;
    try {
      const { data, status } = await axios
        .put(
          URL,
          {
            id,
            segment,
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

  async deleteSegment(id_user: string, id: string, segment: string) {
    const URL = `${API_RV_BASE_URI}/api/segment`;
    try {
      const { data, status } = await axios
        .delete(URL, {
          params: { id, segment },
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

export { segmentService };
