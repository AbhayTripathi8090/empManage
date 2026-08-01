/**
 * Redux Selectors for Authentication Feature State
 */

export const selectAuthState = (state) => state.auth;

export const selectAuthUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectAuthToken = (state) => state.auth.token;

export const selectAuthLoading = (state) => state.auth.loading;

export const selectAuthError = (state) => state.auth.error;
