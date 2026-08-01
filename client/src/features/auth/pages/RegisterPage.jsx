import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUserThunk } from '../authThunk';
import {
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from '../authSelector';
import RegisterForm from '../components/RegisterForm';
import { Building2 } from 'lucide-react';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // Automatic redirection to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleRegisterSubmit = async (formData) => {
    // Exclude confirmPassword before passing to API thunk
    const { confirmPassword, ...registerData } = formData;
    await dispatch(registerUserThunk(registerData));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-8 space-y-6 border border-gray-100">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-1 shadow-sm">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Create Account</h2>
          <p className="text-sm text-gray-500">Join the Employee Management System</p>
        </div>

        <RegisterForm onSubmit={handleRegisterSubmit} loading={loading} errorMessage={error} />

        <div className="pt-4 text-center border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
