import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import {
  selectIsAuthenticated,
  selectAuthUser,
  selectAuthLoading,
} from '../../features/auth/authSelector';
import { fetchCurrentUserThunk } from '../../features/auth/authThunk';
import Loader from './Loader';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const loading = useSelector(selectAuthLoading);
  const hasToken = Boolean(localStorage.getItem('token'));

  useEffect(() => {
    // If token exists in localStorage but user profile is not loaded, fetch user profile
    if (hasToken && !user && !loading) {
      dispatch(fetchCurrentUserThunk());
    }
  }, [dispatch, hasToken, user, loading]);

  if (hasToken && !user && loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader message="Verifying authentication session..." />
      </div>
    );
  }

  if (!isAuthenticated && !hasToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
