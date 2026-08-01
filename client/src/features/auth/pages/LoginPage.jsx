import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUserThunk } from '../authThunk';
import {
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from '../authSelector';
import LoginForm from '../components/LoginForm';
import { Building2, CheckCircle2, UsersRound } from 'lucide-react';

const LoginPage = () => {
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

  const handleLoginSubmit = async (formData) => {
    await dispatch(loginUserThunk(formData));
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/30 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-400 text-slate-950">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xl font-black">EmpManage</p>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-200">People Ops Suite</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-teal-200">
              <UsersRound className="h-3.5 w-3.5" />
              Centralized workforce control
            </div>
            <h1 className="max-w-lg text-5xl font-black leading-tight tracking-tight">Run your employee directory with calm precision.</h1>
            <div className="grid gap-3 text-sm text-slate-300">
              {['Secure role-based access', 'Live employee status tracking', 'Fast profile and directory management'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-2xl font-black">24/7</p>
              <p className="mt-1 text-xs text-slate-400">Access</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-2xl font-black">API</p>
              <p className="mt-1 text-xs text-slate-400">Synced</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-2xl font-black">HR</p>
              <p className="mt-1 text-xs text-slate-400">Ready</p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md space-y-7">
            <div className="space-y-3">
              <div className="inline-flex p-3 bg-teal-50 text-teal-700 rounded-2xl shadow-sm lg:hidden">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-950 tracking-tight">Welcome Back</h2>
                <p className="text-sm text-slate-500 mt-2">Sign in to continue managing your workforce.</p>
              </div>
            </div>

            <LoginForm onSubmit={handleLoginSubmit} loading={loading} errorMessage={error} />

            <div className="pt-4 text-center border-t border-slate-100">
              <p className="text-sm text-slate-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-black text-teal-700 hover:text-teal-600 hover:underline">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
