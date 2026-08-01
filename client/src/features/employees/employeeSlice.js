import { createSlice } from '@reduxjs/toolkit';
import {
  getEmployeesThunk,
  getEmployeeByIdThunk,
  createEmployeeThunk,
  updateEmployeeThunk,
  deleteEmployeeThunk,
} from './employeeThunk';

const initialState = {
  employees: [],
  selectedEmployee: null,
  pagination: {
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  },
  filters: {
    search: '',
    status: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  loading: false,
  actionLoading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Reset to page 1 on filter update
    },
    resetFilters: (state) => {
      state.filters = {
        search: '',
        status: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      };
      state.pagination.currentPage = 1;
    },
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch All Employees ---
      .addCase(getEmployeesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.employees || action.payload;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(getEmployeesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Fetch Single Employee by ID ---
      .addCase(getEmployeeByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEmployee = action.payload;
      })
      .addCase(getEmployeeByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Create Employee ---
      .addCase(createEmployeeThunk.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createEmployeeThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.employees.unshift(action.payload);
        state.pagination.totalCount += 1;
      })
      .addCase(createEmployeeThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // --- Update Employee ---
      .addCase(updateEmployeeThunk.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateEmployeeThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updated = action.payload;
        const index = state.employees.findIndex((e) => e._id === updated._id || e.id === updated.id);
        if (index !== -1) {
          state.employees[index] = updated;
        }
        if (state.selectedEmployee && (state.selectedEmployee._id === updated._id || state.selectedEmployee.id === updated.id)) {
          state.selectedEmployee = updated;
        }
      })
      .addCase(updateEmployeeThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // --- Delete Employee ---
      .addCase(deleteEmployeeThunk.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(deleteEmployeeThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        const deletedId = action.payload;
        state.employees = state.employees.filter((e) => e._id !== deletedId && e.id !== deletedId);
        state.pagination.totalCount = Math.max(0, state.pagination.totalCount - 1);
        if (state.selectedEmployee && (state.selectedEmployee._id === deletedId || state.selectedEmployee.id === deletedId)) {
          state.selectedEmployee = null;
        }
      })
      .addCase(deleteEmployeeThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  resetFilters,
  setPage,
  clearSelectedEmployee,
  clearError,
} = employeeSlice.actions;

export default employeeSlice.reducer;
