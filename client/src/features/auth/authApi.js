import api from '../../services/api';
import authEndpoints from './endpoints';

const authApi = {
  register: async (userData) => {
    const response = await api.post(authEndpoints.register, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post(authEndpoints.login, credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post(authEndpoints.logout);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get(authEndpoints.currentUser);
    return response.data;
  },
};

export default authApi;
