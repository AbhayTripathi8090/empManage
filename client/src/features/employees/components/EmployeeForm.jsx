import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, X, Save, User, Mail, Phone, Briefcase, DollarSign, Calendar } from 'lucide-react';
import Input from '../../../components/common/Input';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/Button';

const EmployeeForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitLabel = 'Save Employee',
}) => {
  const [imagePreview, setImagePreview] = useState(initialValues.profileImage?.url || null);
  const [selectedFile, setSelectedFile] = useState(null);

  const defaultJoiningDate = initialValues.joiningDate
    ? new Date(initialValues.joiningDate).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: initialValues.firstName || '',
      lastName: initialValues.lastName || '',
      email: initialValues.email || '',
      phone: initialValues.phone || '',
      designation: initialValues.designation || initialValues.position || '',
      salary: initialValues.salary || '',
      joiningDate: defaultJoiningDate,
      status: initialValues.status || 'Active',
    },
  });

  // Handle Image File Selection & Live Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5 MB limit. Please select a smaller image.');
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
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        formData.append(key, data[key]);
      }
    });

    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    }

    onSubmit(formData);
  };

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'On Leave', label: 'On Leave' },
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" noValidate>
      {/* Profile Image Upload & Preview Box (Optional) */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300 text-center space-y-4">
        <label className="block text-sm font-semibold text-gray-800">Profile Image (Optional)</label>

        {imagePreview ? (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md ring-2 ring-indigo-100"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-white text-indigo-600 rounded-full shadow-xs border border-gray-200">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Upload employee photo (JPG, JPEG, PNG, or WEBP - Max 5 MB)
            </p>
            <label className="cursor-pointer px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition-colors">
              <span>Browse Image</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {/* Personal Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Required Field: First Name */}
        <Input
          label="First Name *"
          placeholder="John"
          startIcon={User}
          error={errors.firstName?.message}
          {...register('firstName', {
            required: 'First name is required',
            minLength: { value: 2, message: 'First name must be at least 2 characters' },
          })}
        />

        {/* Required Field: Last Name */}
        <Input
          label="Last Name *"
          placeholder="Doe"
          startIcon={User}
          error={errors.lastName?.message}
          {...register('lastName', {
            required: 'Last name is required',
            minLength: { value: 2, message: 'Last name must be at least 2 characters' },
          })}
        />

        {/* Optional Field: Email */}
        <Input
          label="Email Address (Optional)"
          type="email"
          placeholder="john.doe@company.com"
          startIcon={Mail}
          error={errors.email?.message}
          {...register('email', {
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Please enter a valid email address',
            },
          })}
        />

        {/* Optional Field: Phone */}
        <Input
          label="Phone Number (Optional)"
          type="tel"
          placeholder="+1 (555) 000-0000"
          startIcon={Phone}
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      {/* Employment Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Required Field: Designation */}
        <Input
          label="Designation / Position *"
          placeholder="Software Engineer"
          startIcon={Briefcase}
          error={errors.designation?.message}
          {...register('designation', {
            required: 'Designation is required',
          })}
        />

        {/* Required Field: Salary */}
        <Input
          label="Annual Salary ($) *"
          type="number"
          placeholder="75000"
          startIcon={DollarSign}
          error={errors.salary?.message}
          {...register('salary', {
            required: 'Salary is required',
            min: { value: 0, message: 'Salary cannot be negative' },
          })}
        />

        {/* Optional Field: Joining Date */}
        <Input
          label="Joining Date (Optional)"
          type="date"
          startIcon={Calendar}
          error={errors.joiningDate?.message}
          {...register('joiningDate')}
        />

        {/* Optional Field: Status */}
        <Select
          label="Employment Status (Optional)"
          options={statusOptions}
          placeholder={null}
          error={errors.status?.message}
          {...register('status')}
        />
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <Button type="submit" variant="primary" loading={loading} icon={Save}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
