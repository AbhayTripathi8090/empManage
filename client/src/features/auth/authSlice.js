import { createSlice } from '@reduxjs/toolkit';
import {
  loginUserThunk,
  registerUserThunk,
  fetchCurrentUserThunk,
  updateUserProfileThunk,
  changePasswordThunk,
  logoutUserThunk,
} from './authThunk';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: Boolean(localStorage.getItem('token')),
  loading: false,
  actionLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Login Thunk ---
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Register Thunk ---
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Fetch Current User Thunk ---
      .addCase(fetchCurrentUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // --- Update User Profile Thunk ---
      .addCase(updateUserProfileThunk.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // --- Change Password Thunk ---
      .addCase(changePasswordThunk.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // --- Logout Thunk ---
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
