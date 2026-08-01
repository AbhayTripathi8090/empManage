import React from 'react';
import { Eye, Edit3, Trash2 } from 'lucide-react';

const EmployeeTable = ({ employees = [], onView, onEdit, onDelete }) => {
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

  const getInitials = (firstName = '', lastName = '') => {
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase() || 'E';
  };

  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Designation</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {employees.map((emp) => {
              const empId = emp._id || emp.id;
              const fullName = `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || 'Unnamed Employee';
              const imageUrl = typeof emp.profileImage === 'object' ? emp.profileImage?.url : emp.profileImage;

              return (
                <tr key={empId} className="hover:bg-gray-50/80 transition-colors group">
                  {/* Employee Name & Avatar */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={fullName}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200 ring-2 ring-gray-100"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm ring-2 ring-indigo-50">
                          {getInitials(emp.firstName, emp.lastName)}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {fullName}
                        </div>
                        <div className="text-xs text-gray-500">{emp.email || 'No email provided'}</div>
                      </div>
                    </div>
                  </td>

                  {/* Designation */}
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                    {emp.designation || emp.position || '-'}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                        emp.status
                      )}`}
                    >
                      {emp.status || 'Active'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onView && onView(emp)}
                        title="View Details"
                        className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit && onEdit(emp)}
                        title="Edit Employee"
                        className="p-1.5 text-gray-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(empId)}
                        title="Delete Employee"
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
