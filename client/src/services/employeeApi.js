import api from './api';

const employeeApi = {
  /**
   * Fetch all employees with pagination, search, & filtering
   * @param {Object} params - { page, limit, search, status, sortBy, sortOrder }
   */
  getEmployees: async (params = {}) => {
    const response = await api.get('/employees', { params });
    return response.data;
  },

  /**
   * Fetch employee details by ID
   * @param {String} id - Employee Mongo ID
   */
  getEmployeeById: async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  /**
   * Create new employee record
   * @param {FormData|Object} data - Employee data or FormData with profile image file
   */
  createEmployee: async (data) => {
    const isFormData = data instanceof FormData;
    const response = await api.post('/employees', data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return response.data;
  },

  /**
   * Update existing employee record
   * @param {String} id - Employee Mongo ID
   * @param {FormData|Object} data - Update payload or FormData
   */
  updateEmployee: async (id, data) => {
    const isFormData = data instanceof FormData;
    const response = await api.put(`/employees/${id}`, data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return response.data;
  },

  /**
   * Delete employee record by ID
   * @param {String} id - Employee Mongo ID
   */
  deleteEmployee: async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  },
};

export default employeeApi;
