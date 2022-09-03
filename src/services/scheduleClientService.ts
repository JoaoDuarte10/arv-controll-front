import axios from 'axios';

const API_RV_BASE_URI = process.env.REACT_APP_BASE_URL;

const scheduleClientService = {
  async getClientsSchedule(user_id: string) {
    const URL = `${API_RV_BASE_URI}/api/find-schedule-client`;
    try {
      const { data } = await axios.post(URL, {
        id_user: user_id,
      });
      return data;
    } catch (error) {
      return error;
    }
  },

  async addClientSchedule(
    id_user: string,
    name: string,
    date: string,
    service: string,
    phone: string,
  ) {
    const URL = `${API_RV_BASE_URI}/api/new-schedule-client`;
    try {
      const { data } = await axios.post(URL, {
        id_user: id_user,
        name: name,
        service: service,
        date: date,
        phone: phone,
      });
      return data;
    } catch (error) {
      return error;
    }
  },

  async deleteClientSchedule(user_id: string, id: string) {
    const URL = `${API_RV_BASE_URI}/api/delete-schedule-client`;
    try {
      const { data } = await axios.delete(URL, {
        params: {
          id_user: user_id,
          id: id,
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  },
};

export { scheduleClientService };
