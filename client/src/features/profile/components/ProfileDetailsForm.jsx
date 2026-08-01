import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Upload, X, Save, Shield } from 'lucide-react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const ProfileDetailsForm = ({ currentUser, onSubmit, loading }) => {
  const [imagePreview, setImagePreview] = useState(currentUser?.avatar || null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      role: currentUser?.role || 'Employee',
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5 MB limit. Please select a smaller avatar image.');
        return;
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);

    if (selectedFile) {
      formData.append('avatar', selectedFile);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" noValidate>
      {/* Avatar Image Picker Box */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Avatar Preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-indigo-100"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-1 -right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition-colors"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-2xl ring-2 ring-indigo-50">
            {currentUser?.name ? currentUser.name[0].toUpperCase() : <User className="w-8 h-8" />}
          </div>
        )}

        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-semibold text-gray-800">Profile Avatar Photo</h4>
          <p className="text-xs text-gray-500 max-w-xs">
            JPG, PNG, or WEBP up to 5 MB. Automatically synced with Cloudinary storage.
          </p>
          <label className="inline-block cursor-pointer mt-2 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-white hover:bg-indigo-50 rounded-lg border border-gray-300 shadow-2xs transition-colors">
            <span>Upload New Avatar</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <Input
          label="Full Name"
          placeholder="Your full name"
          startIcon={User}
          error={errors.name?.message}
          {...register('name', {
            required: 'Full name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters long' },
          })}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@company.com"
          startIcon={Mail}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email address is required',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Please enter a valid email address',
            },
          })}
        />

        <Input
          label="System Role"
          disabled
          startIcon={Shield}
          helperText="Role privileges are assigned by system administrator"
          {...register('role')}
        />
      </div>

      <div className="pt-2">
        <Button type="submit" variant="primary" loading={loading} icon={Save}>
          Update Details
        </Button>
      </div>
    </form>
  );
};

export default ProfileDetailsForm;
