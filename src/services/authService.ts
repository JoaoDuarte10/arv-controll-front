import axios from 'axios';
import { Response } from './types/ResponseDTO';

const API_RV_BASE_URI = process.env.REACT_APP_BASE_URL;

const authService = {
  async getUserInLocalStorange() {
    const user = localStorage.getItem('user-login');
    if (!user) return null;
    try {
      const userJson = await JSON.parse(user);
      return userJson;
    } catch (error) {
      return null;
    }
  },

  async getUserIdInLocalStorange() {
    const user = localStorage.getItem('user-login');
    const user_id = await JSON.parse(user as string);
    return user_id ? user_id.user_id : null;
  },

  cleanUserInLocalStorange() {
    localStorage.removeItem('user-login');
  },

  async sendLogin(user: string, password: string): Promise<Response> {
    const URL = `${API_RV_BASE_URI}/api/authenticate`;

    const { data, status } = await axios
      .post(URL, {
        user: user,
        password: password,
      })
      .then((res) => ({ data: res.data, status: res.status }))
      .catch((err) => ({
        data: err.response ? err.response.data : err.response,
        status: err.response ? err.response.status : err.response,
      }));

    return { data, status };
  },

  async redirectLogin() {
    const loggedUser = await this.getUserInLocalStorange();
    return loggedUser ? null : '/login';
  },
};

export { authService };
