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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {errorMessage && (
        <div className="p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{typeof errorMessage === 'string' ? errorMessage : 'Authentication failed. Check your inputs.'}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email address is required',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Please enter a valid email address',
            },
          })}
          className={`w-full px-3.5 py-2.5 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.email
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
              : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
          }`}
          placeholder="admin@company.com"
        />
        {errors.email && <p className="text-xs text-red-500 mt-1 font-medium">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
            className={`w-full px-3.5 py-2.5 pr-10 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.password
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-500 mt-1 font-medium">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full mt-2 py-2.5" disabled={loading}>
        <LogIn className="w-4 h-4" />
        {loading ? 'Authenticating...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;
