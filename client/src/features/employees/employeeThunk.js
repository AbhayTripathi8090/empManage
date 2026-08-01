import { createAsyncThunk } from '@reduxjs/toolkit';
import employeeApi from './employeeApi';

/**
 * Thunk to fetch employees list with search, filters, & pagination
 */
export const getEmployeesThunk = createAsyncThunk(
  'employees/getEmployees',
  async (params, { rejectWithValue }) => {
    try {
      const response = await employeeApi.getEmployees(params);
      return response.data; // { employees, pagination }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch employees');
    }
  }
);

/**
 * Thunk to fetch single employee details by ID
 */
export const getEmployeeByIdThunk = createAsyncThunk(
  'employees/getEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await employeeApi.getEmployeeById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch employee details');
    }
  }
);

/**
 * Thunk to create a new employee
 */
export const createEmployeeThunk = createAsyncThunk(
  'employees/createEmployee',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await employeeApi.createEmployee(formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create employee');
    }
  }
);

/**
 * Thunk to update an existing employee
 */
export const updateEmployeeThunk = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await employeeApi.updateEmployee(id, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update employee');
    }
  }
);

/**
 * Thunk to delete an employee by ID
 */
export const deleteEmployeeThunk = createAsyncThunk(
  'employees/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      await employeeApi.deleteEmployee(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete employee');
    }
  }
);
