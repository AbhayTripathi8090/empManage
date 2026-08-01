import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createEmployeeThunk } from '../employeeThunk';
import { selectEmployeeActionLoading, selectEmployeeError } from '../employeeSelector';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import EmployeeForm from '../components/EmployeeForm';
import { ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

const AddEmployeePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectEmployeeActionLoading);
  const error = useSelector(selectEmployeeError);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateSubmit = async (formData) => {
    setSuccessMessage('');
    const result = await dispatch(createEmployeeThunk(formData));

    if (!result.error) {
      setSuccessMessage('Employee record created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/employees');
      }, 1200);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <Header title="Add New Employee" subtitle="Create a new employee profile in the system directory">
        <Button variant="secondary" onClick={() => navigate('/employees')} icon={ArrowLeft}>
          Back to List
        </Button>
      </Header>

      {/* Backend Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{typeof error === 'string' ? error : 'Failed to create employee record. Check input fields.'}</span>
        </div>
      )}

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Form Container */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        <EmployeeForm
          onSubmit={handleCreateSubmit}
          loading={loading}
          submitLabel="Create Employee Record"
        />
      </div>
    </div>
  );
};

export default AddEmployeePage;
