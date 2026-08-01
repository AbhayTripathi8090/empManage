import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeByIdThunk, deleteEmployeeThunk } from '../employeeThunk';
import {
  selectSelectedEmployee,
  selectEmployeeLoading,
  selectEmployeeActionLoading,
  selectEmployeeError,
} from '../employeeSelector';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import {
  ArrowLeft,
  Edit3,
  Trash2,
  Mail,
  Phone,
  Briefcase,
  User,
  AlertCircle,
} from 'lucide-react';

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employee = useSelector(selectSelectedEmployee);
  const loading = useSelector(selectEmployeeLoading);
  const actionLoading = useSelector(selectEmployeeActionLoading);
  const error = useSelector(selectEmployeeError);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getEmployeeByIdThunk(id));
    }
  }, [dispatch, id]);

  const handleConfirmDelete = async () => {
    const result = await dispatch(deleteEmployeeThunk(id));
    if (!result.error) {
      setIsDeleteModalOpen(false);
      navigate('/employees');
    }
  };

  if (loading || !employee) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Header title="Employee Details" subtitle="View complete employee profile records">
          <Button variant="secondary" onClick={() => navigate('/employees')} icon={ArrowLeft}>
            Back to List
          </Button>
        </Header>
        <Loader message="Fetching employee profile..." size="lg" />
      </div>
    );
  }

  const fullName = `${employee.firstName || ''} ${employee.lastName || ''}`.trim() || 'Employee Profile';
  const imageUrl = typeof employee.profileImage === 'object' ? employee.profileImage?.url : employee.profileImage;
  const formattedSalary = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(employee.salary || 0);

  const formattedJoiningDate = employee.joiningDate
    ? new Date(employee.joiningDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '-';

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Inactive':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'On Leave':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header with Navigation & Action Controls */}
      <Header title="Employee Profile" subtitle={`Details for ${fullName}`}>
        <Button variant="secondary" onClick={() => navigate('/employees')} icon={ArrowLeft}>
          Back
        </Button>
        <Button variant="outline" onClick={() => navigate(`/employees/${id}/edit`)} icon={Edit3}>
          Edit Profile
        </Button>
        <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)} icon={Trash2}>
          Delete
        </Button>
      </Header>

      {/* Backend Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{typeof error === 'string' ? error : 'Error processing employee request.'}</span>
        </div>
      )}

      {/* Hero Profile Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={fullName}
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md ring-4 ring-indigo-50 flex-shrink-0"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-3xl ring-4 ring-indigo-50 flex-shrink-0">
            {employee.firstName?.[0]}
            {employee.lastName?.[0]}
          </div>
        )}

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{fullName}</h2>
              <p className="text-sm font-medium text-indigo-600">{employee.designation || 'Position N/A'}</p>
            </div>
            <span
              className={`self-center sm:self-start px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                employee.status
              )}`}
            >
              {employee.status || 'Active'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-500 pt-2">
            {employee.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-gray-400" /> {employee.email}
              </span>
            )}
            {employee.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-gray-400" /> {employee.phone}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600" /> Personal & Contact Info
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-medium">First Name</span>
              <span className="font-semibold text-gray-900">{employee.firstName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Last Name</span>
              <span className="font-semibold text-gray-900">{employee.lastName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Email Address</span>
              <span className="font-semibold text-gray-900">{employee.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500 font-medium">Phone Number</span>
              <span className="font-semibold text-gray-900">{employee.phone || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Employment & Compensation Details Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600" /> Employment & Compensation
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Designation</span>
              <span className="font-semibold text-gray-900">{employee.designation}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Annual Compensation</span>
              <span className="font-bold text-emerald-700">{formattedSalary}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500 font-medium">Joining Date</span>
              <span className="font-semibold text-gray-900">{formattedJoiningDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        employeeName={fullName}
        loading={actionLoading}
      />
    </div>
  );
};

export default EmployeeDetailsPage;
