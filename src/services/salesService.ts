import axios from 'axios';
import moment from 'moment';

const API_RV_BASE_URI = process.env.REACT_APP_BASE_URL;

const salesService = {
  async getSalesToday(user_id) {
    const URL = `${API_RV_BASE_URI}/api/sales/today`;
    const date = moment(new Date()).format('YYYY-MM-DD');
    try {
      const { data, status } = await axios
        .get(URL, {
          params: { date: date },
          headers: { 'id-user': user_id },
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

  async getSalesInPeriod(user_id, date1, date2) {
    const URL = `${API_RV_BASE_URI}/api/sales/period`;
    let date1Valid = date1;
    if (!date1) {
      date1Valid = moment(new Date()).format('YYYY-MM-DD');
    }
    try {
      const { data, status } = await axios
        .get(URL, {
          params: {
            date1: date1Valid,
            date2: date2,
          },
          headers: { 'id-user': user_id },
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

  async getSalesInPeriodByClients(user_id, date1, date2) {
    const URL = `${API_RV_BASE_URI}/api/sales/period-clients`;
    try {
      const { data } = await axios.post(URL, {
        id_user: user_id,
        date1: date1,
        date2: date2,
      });
      return data;
    } catch (error) {
      return error;
    }
  },

  async getSalesByClients(user_id, client) {
    const URL = `${API_RV_BASE_URI}/api/sales/clients`;
    try {
      const { data, status } = await axios
        .get(URL, {
          headers: { 'id-user': user_id },
          params: { client },
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

  async newSale(user_id, description, client, price, date) {
    const URL = `${API_RV_BASE_URI}/api/sales/new`;
    try {
      const { data, status } = await axios
        .post(
          URL,
          {
            description: description,
            client: client,
            price: price,
            date: date,
          },
          { headers: { 'id-user': user_id } },
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

  countTotalValueSales(sales) {
    return sales
      .filter((item) => !!item)
      .map(
        (item) => parseInt(item.price.substring(2).replace(/\.|,/g, '')) / 100,
      )
      .reduce((acc, item) => acc + item, 0)
      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  },

  async getSalesByAllFilters(user_id, client, date1, date2) {
    const URL = `${API_RV_BASE_URI}/api/sales/all-filters`;
    try {
      const { data, status } = await axios
        .get(URL, {
          headers: { 'id-user': user_id },
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

export { salesService };
