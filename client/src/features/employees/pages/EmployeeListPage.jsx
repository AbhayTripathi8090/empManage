import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getEmployeesThunk, deleteEmployeeThunk } from '../employeeThunk';
import { setFilters, resetFilters, setPage } from '../employeeSlice';
import {
  selectEmployees,
  selectEmployeeLoading,
  selectEmployeeActionLoading,
  selectEmployeePagination,
  selectEmployeeFilters,
  selectEmployeeError,
} from '../employeeSelector';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import EmptyState from '../../../components/common/EmptyState';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeFilters from '../components/EmployeeFilters';
import PaginationBar from '../components/PaginationBar';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { UserPlus, AlertCircle, Users } from 'lucide-react';

const EmployeeListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors for Redux State
  const employees = useSelector(selectEmployees);
  const loading = useSelector(selectEmployeeLoading);
  const actionLoading = useSelector(selectEmployeeActionLoading);
  const pagination = useSelector(selectEmployeePagination);
  const filters = useSelector(selectEmployeeFilters);
  const error = useSelector(selectEmployeeError);

  // State for deletion modal
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Fetch employees whenever filters or currentPage change
  const loadEmployees = useCallback(() => {
    dispatch(
      getEmployeesThunk({
        ...filters,
        page: pagination.currentPage,
        limit: pagination.limit,
      })
    );
  }, [dispatch, filters, pagination.currentPage, pagination.limit]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  // Handler for filter changes
  const handleFilterChange = useCallback(
    (newFilters) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  // Handler to reset all filters
  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  // Handler for page change
  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(setPage(newPage));
    },
    [dispatch]
  );

  // Handler for page limit change
  const handleLimitChange = useCallback(
    (newLimit) => {
      dispatch(setFilters({ limit: newLimit }));
    },
    [dispatch]
  );

  // Open modal trigger
  const handleOpenDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
  };

  // Execute deletion thunk & refresh
  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;
    const targetId = employeeToDelete._id || employeeToDelete.id;

    const result = await dispatch(deleteEmployeeThunk(targetId));

    if (!result.error) {
      setEmployeeToDelete(null);
      // Refresh list to sync pagination counters cleanly
      loadEmployees();
    }
  };

  const getTargetName = () => {
    if (!employeeToDelete) return 'this employee';
    return `${employeeToDelete.firstName || ''} ${employeeToDelete.lastName || ''}`.trim() || 'this employee';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Header title="Employees Directory" subtitle="Manage employee profiles, designations, and status">
        <Button variant="primary" icon={UserPlus} onClick={() => navigate('/employees/add')}>
          Add Employee
        </Button>
      </Header>

      {/* Backend Error Alert Banner */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{typeof error === 'string' ? error : 'Failed to fetch employee records.'}</span>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <EmployeeFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* Main Content Area */}
      {loading ? (
        <Loader message="Loading employees directory..." size="lg" />
      ) : employees.length === 0 ? (
        <EmptyState
          title="No employees found"
          description="No employee records match your search query or filter criteria."
          icon={Users}
          actionLabel="Clear Search Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <>
          <EmployeeTable
            employees={employees}
            onDelete={(empId) => {
              const target = employees.find((e) => (e._id || e.id) === empId);
              handleOpenDeleteModal(target || { id: empId });
            }}
            onView={(emp) => navigate(`/employees/${emp._id || emp.id}`)}
            onEdit={(emp) => navigate(`/employees/${emp._id || emp.id}/edit`)}
          />

          {/* Server-Side Pagination Bar */}
          <PaginationBar
            pagination={pagination}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      )}

      {/* Reusable Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(employeeToDelete)}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={handleConfirmDelete}
        employeeName={getTargetName()}
        loading={actionLoading}
      />
    </div>
  );
};

export default EmployeeListPage;
