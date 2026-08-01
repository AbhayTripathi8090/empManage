import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserPlus, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Button from '../../../components/common/Button';

const RegisterForm = ({ onSubmit, loading, errorMessage }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: 'admin',
    },
  });

  const passwordValue = watch('password');

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
          <span>{typeof errorMessage === 'string' ? errorMessage : 'Registration failed. Check inputs.'}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
        <input
          type="text"
          {...register('name', {
            required: 'Full name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters long',
            },
          })}
          className={inputClass(errors.name)}
          placeholder="Jane Doe"
        />
        {errors.name && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.name.message}</p>}
      </div>

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
          placeholder="jane.doe@company.com"
        />
        {errors.email && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">System Privilege Level</label>
        <select
          {...register('role')}
          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
        >
          <option value="admin">Administrator</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
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

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (val) => val === passwordValue || 'Passwords do not match',
          })}
          className={inputClass(errors.confirmPassword)}
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <p className="text-xs text-rose-500 mt-1 font-bold">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full mt-2 py-2.5" disabled={loading}>
        <UserPlus className="w-4 h-4" />
        {loading ? 'Creating Account...' : 'Register Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;
