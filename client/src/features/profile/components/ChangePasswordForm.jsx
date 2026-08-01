import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Key, Eye, EyeOff, Lock } from 'lucide-react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const ChangePasswordForm = ({ onSubmit, loading }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPasswordValue = watch('newPassword');

  const handlePasswordSubmit = async (data) => {
    await onSubmit({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handlePasswordSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
        <div className="relative">
          <Input
            type={showCurrentPassword ? 'text' : 'password'}
            placeholder="••••••••"
            startIcon={Lock}
            error={errors.currentPassword?.message}
            {...register('currentPassword', {
              required: 'Current password is required',
            })}
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute top-3.5 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
        <div className="relative">
          <Input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="••••••••"
            startIcon={Key}
            error={errors.newPassword?.message}
            {...register('newPassword', {
              required: 'New password is required',
              minLength: {
                value: 6,
                message: 'New password must be at least 6 characters long',
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute top-3.5 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <Input
        label="Confirm New Password"
        type="password"
        placeholder="••••••••"
        startIcon={Key}
        error={errors.confirmNewPassword?.message}
        {...register('confirmNewPassword', {
          required: 'Please confirm your new password',
          validate: (val) => val === newPasswordValue || 'Passwords do not match',
        })}
      />

      <div className="pt-2">
        <Button type="submit" variant="primary" loading={loading} icon={Key}>
          Change Password
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
