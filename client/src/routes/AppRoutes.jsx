import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import EmployeeListPage from '../features/employees/pages/EmployeeListPage';
import AddEmployeePage from '../features/employees/pages/AddEmployeePage';
import EmployeeDetailsPage from '../features/employees/pages/EmployeeDetailsPage';
import EditEmployeePage from '../features/employees/pages/EditEmployeePage';
import ProfilePage from '../features/profile/pages/ProfilePage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Authentication Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Application Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="employees" element={<EmployeeListPage />} />
          <Route path="employees/add" element={<AddEmployeePage />} />
          <Route path="employees/:id" element={<EmployeeDetailsPage />} />
          <Route path="employees/:id/edit" element={<EditEmployeePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
