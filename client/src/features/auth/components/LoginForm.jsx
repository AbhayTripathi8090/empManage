import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Button from '../../../components/common/Button';

const LoginForm = ({ onSubmit, loading, errorMessage }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const inputClass = (hasError) =>
    `w-full px-3.5 py-2.5 border rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 transition-all ${
      hasError
        ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/40'
        : 'border-slate-200 focus:ring-teal-500 focus:border-teal-500'
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {errorMessage && (
        <div className="p-3 text-sm text-rose-700 bg-rose-50 rounded-xl border border-rose-200 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500" />
          <span>{typeof errorMessage === 'string' ? errorMessage : 'Authentication failed. Check your inputs.'}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email address is required',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Please enter a valid email address',
            },
          })}
          className={inputClass(errors.email)}
          placeholder="admin@company.com"
        />
        {errors.email && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            className={`${inputClass(errors.password)} pr-10`}
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full mt-2 py-2.5" disabled={loading}>
        <LogIn className="w-4 h-4" />
        {loading ? 'Authenticating...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;
