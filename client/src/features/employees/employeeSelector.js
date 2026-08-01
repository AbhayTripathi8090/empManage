/**
 * Redux Selectors for Employee Feature State
 * Flow: Component -> dispatch -> thunk -> API -> slice -> selector -> component
 */

export const selectEmployeesState = (state) => state.employees;

export const selectEmployees = (state) => state.employees.employees;

export const selectSelectedEmployee = (state) => state.employees.selectedEmployee;

export const selectEmployeePagination = (state) => state.employees.pagination;

export const selectEmployeeFilters = (state) => state.employees.filters;

export const selectEmployeeLoading = (state) => state.employees.loading;

export const selectEmployeeActionLoading = (state) => state.employees.actionLoading;

export const selectEmployeeError = (state) => state.employees.error;
