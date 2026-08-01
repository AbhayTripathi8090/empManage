import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from './authApi';
import profileApi from '../profile/profileApi';

/**
 * Thunk to authenticate user with credentials
 */
export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authApi.login(credentials);
      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
      }
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Invalid credentials or login failed');
    }
  }
);

/**
 * Thunk to register a new user
 */
export const registerUserThunk = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authApi.register(userData);
      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
      }
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

/**
 * Thunk to fetch current authenticated user profile
 */
export const fetchCurrentUserThunk = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.getCurrentUser();
      return data.data;
    } catch (err) {
      localStorage.removeItem('token');
      return rejectWithValue(err.response?.data?.message || 'Session expired. Please log in again.');
    }
  }
);

/**
 * Thunk to update user profile info & avatar
 */
export const updateUserProfileThunk = createAsyncThunk(
  'auth/updateUserProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await profileApi.updateProfile(formData);
      return response.data; // Updated user object
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update profile details');
    }
  }
);

/**
 * Thunk to change user password
 */
export const changePasswordThunk = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await profileApi.changePassword(passwordData);
      return response.message || 'Password changed successfully';
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to change password');
    }
  }
);

/**
 * Thunk to logout user session
 */
export const logoutUserThunk = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('token');
    }
  }
);
