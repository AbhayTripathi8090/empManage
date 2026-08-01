import api from '../../services/api';
import employeeEndpoints from './endpoints';

const employeeApi = {
  /**
   * Fetch paginated and filtered list of employees
   * @param {Object} params - { page, limit, search, status, sortBy, sortOrder }
   */
  getEmployees: async (params = {}) => {
    const response = await api.get(employeeEndpoints.list, { params });
    return response.data;
  },

  /**
   * Fetch single employee details by ID
   * @param {String} id - Employee Mongo ID
   */
  getEmployeeById: async (id) => {
    const response = await api.get(employeeEndpoints.detail(id));
    return response.data;
  },

  /**
   * Create new employee record
   * @param {FormData|Object} data - Employee data or FormData with image file
   */
  createEmployee: async (data) => {
    const isFormData = data instanceof FormData;
    const response = await api.post(employeeEndpoints.list, data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return response.data;
  },

  /**
   * Update existing employee record
   * @param {String} id - Employee Mongo ID
   * @param {FormData|Object} data - Update data or FormData
   */
  updateEmployee: async (id, data) => {
    const isFormData = data instanceof FormData;
    const response = await api.put(employeeEndpoints.detail(id), data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return response.data;
  },

  /**
   * Delete employee record by ID
   * @param {String} id - Employee Mongo ID
   */
  deleteEmployee: async (id) => {
    const response = await api.delete(employeeEndpoints.detail(id));
    return response.data;
  },
};

export default employeeApi;
