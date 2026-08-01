import api from './api';

const profileApi = {
  /**
   * Fetch logged-in user profile details
   */
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Update user profile information & avatar
   * @param {Object|FormData} profileData
   */
  updateProfile: async (profileData) => {
    const isFormData = profileData instanceof FormData;
    const response = await api.put('/auth/profile', profileData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return response.data;
  },

  /**
   * Change user account password
   * @param {Object} passwordData - { currentPassword, newPassword }
   */
  changePassword: async (passwordData) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  },
};

export default profileApi;
