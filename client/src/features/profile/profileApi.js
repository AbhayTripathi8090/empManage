import api from '../../services/api';
import profileEndpoints from './endpoints';

const profileApi = {
  getProfile: async () => {
    const response = await api.get(profileEndpoints.profile);
    return response.data;
  },

  updateProfile: async (profileData) => {
    const isFormData = profileData instanceof FormData;
    const response = await api.put(profileEndpoints.updateProfile, profileData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.put(profileEndpoints.changePassword, passwordData);
    return response.data;
  },
};

export default profileApi;
