import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeByIdThunk, updateEmployeeThunk } from '../employeeThunk';
import {
  selectSelectedEmployee,
  selectEmployeeLoading,
  selectEmployeeActionLoading,
  selectEmployeeError,
} from '../employeeSelector';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import EmployeeForm from '../components/EmployeeForm';
import { ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

const EditEmployeePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employee = useSelector(selectSelectedEmployee);
  const fetchLoading = useSelector(selectEmployeeLoading);
  const actionLoading = useSelector(selectEmployeeActionLoading);
  const error = useSelector(selectEmployeeError);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getEmployeeByIdThunk(id));
    }
  }, [dispatch, id]);

  const handleUpdateSubmit = async (formData) => {
    setSuccessMessage('');
    const result = await dispatch(updateEmployeeThunk({ id, formData }));

    if (!result.error) {
      setSuccessMessage('Employee record updated successfully! Redirecting...');
      setTimeout(() => {
        navigate('/employees');
      }, 1200);
    }
  };

  if (fetchLoading || !employee) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Header title="Edit Employee Profile" subtitle="Update employee information">
          <Button variant="secondary" onClick={() => navigate('/employees')} icon={ArrowLeft}>
            Back
          </Button>
        </Header>
        <Loader message="Loading employee record..." size="lg" />
      </div>
    );
  }

  const fullName = `${employee.firstName || ''} ${employee.lastName || ''}`.trim() || 'Employee Profile';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <Header title="Edit Employee" subtitle={`Updating record for ${fullName}`}>
        <Button variant="secondary" onClick={() => navigate(`/employees/${id}`)} icon={ArrowLeft}>
          Cancel
        </Button>
      </Header>

      {/* Backend Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{typeof error === 'string' ? error : 'Failed to update employee record.'}</span>
        </div>
      )}

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Form Container with Pre-filled Initial Values */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        <EmployeeForm
          key={employee._id || employee.id}
          initialValues={employee}
          onSubmit={handleUpdateSubmit}
          loading={actionLoading}
          submitLabel="Save Updated Profile"
        />
      </div>
    </div>
  );
};

export default EditEmployeePage;
