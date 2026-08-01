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
import { Building2, ShieldCheck } from 'lucide-react';

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
    const { confirmPassword: _confirmPassword, ...registerData } = formData;
    await dispatch(registerUserThunk(registerData));
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/30 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-400 text-slate-950">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xl font-black">EmpManage</p>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-200">Admin Setup</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-teal-300">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight">Create your command center.</h1>
            <p className="max-w-md text-sm leading-6 text-slate-300">
              Set up secure access for managers, administrators, and employees in a clean operational workspace.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <p className="text-sm font-bold text-teal-200">Recommended</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Start with an administrator account so you can add employee records and manage profiles immediately.</p>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md space-y-7">
            <div className="space-y-3">
              <div className="inline-flex p-3 bg-teal-50 text-teal-700 rounded-2xl shadow-sm lg:hidden">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-950 tracking-tight">Create Account</h2>
                <p className="text-sm text-slate-500 mt-2">Join the Employee Management System.</p>
              </div>
            </div>

            <RegisterForm onSubmit={handleRegisterSubmit} loading={loading} errorMessage={error} />

            <div className="pt-4 text-center border-t border-slate-100">
              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-black text-teal-700 hover:text-teal-600 hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RegisterPage;
