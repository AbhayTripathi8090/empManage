import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeesThunk } from '../../employees/employeeThunk';
import { selectEmployeePagination, selectEmployees } from '../../employees/employeeSelector';
import Header from '../../../components/common/Header';
import StatsCard from '../components/StatsCard';
import { Users, UserCheck, Clock } from 'lucide-react';

const DashboardPage = () => {
  const dispatch = useDispatch();

  const employees = useSelector(selectEmployees);
  const pagination = useSelector(selectEmployeePagination);

  useEffect(() => {
    dispatch(getEmployeesThunk({ limit: 100 }));
  }, [dispatch]);

  const totalEmployeesCount = pagination.totalCount || employees.length || 0;
  const activeEmployeesCount = employees.filter((emp) => emp.status === 'Active').length;
  const onLeaveCount = employees.filter((emp) => emp.status === 'On Leave').length;

  return (
    <div className="space-y-6">
      <Header title="Dashboard Overview" subtitle="System metrics and live organizational stats" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Employees"
          value={totalEmployeesCount}
          icon={Users}
          color="indigo"
        />
        <StatsCard
          title="Active / Present Status"
          value={activeEmployeesCount}
          icon={UserCheck}
          color="emerald"
        />
        <StatsCard
          title="Employees On Leave"
          value={onLeaveCount}
          icon={Clock}
          color="amber"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3">
        <h3 className="text-lg font-bold text-gray-900">System Architecture Overview</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          The Employee Management System features decoupled Feature-Based Architecture on client and server. Data is stored directly in MongoDB and synced via Redux Toolkit and REST API endpoints.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
