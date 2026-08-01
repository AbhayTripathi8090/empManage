import React from 'react';
import { Eye, Edit3, Trash2 } from 'lucide-react';

const EmployeeTable = ({ employees = [], onView, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Inactive':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'On Leave':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const getInitials = (firstName = '', lastName = '') => {
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase() || 'E';
  };

  return (
    <div className="surface-card overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-sm text-left">
          <thead className="bg-slate-50/80 text-xs font-black text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Designation</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white/75">
            {employees.map((emp) => {
              const empId = emp._id || emp.id;
              const fullName = `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || 'Unnamed Employee';
              const imageUrl = typeof emp.profileImage === 'object' ? emp.profileImage?.url : emp.profileImage;

              return (
                <tr key={empId} className="hover:bg-teal-50/40 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={fullName}
                          className="w-11 h-11 rounded-xl object-cover border border-slate-200 ring-4 ring-white"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-slate-950 text-teal-300 flex items-center justify-center font-black text-sm ring-4 ring-white">
                          {getInitials(emp.firstName, emp.lastName)}
                        </div>
                      )}
                      <div>
                        <div className="font-black text-slate-950 group-hover:text-teal-700 transition-colors">
                          {fullName}
                        </div>
                        <div className="text-xs font-medium text-slate-500">{emp.email || 'No email provided'}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-700 font-bold">
                    {emp.designation || emp.position || '-'}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black border ${getStatusBadge(
                        emp.status
                      )}`}
                    >
                      {emp.status || 'Active'}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onView && onView(emp)}
                        title="View Details"
                        className="p-2 text-slate-400 hover:text-teal-700 rounded-lg hover:bg-teal-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit && onEdit(emp)}
                        title="Edit Employee"
                        className="p-2 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(empId)}
                        title="Delete Employee"
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
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
