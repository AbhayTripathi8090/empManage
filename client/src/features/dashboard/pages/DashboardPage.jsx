import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeesThunk } from '../../employees/employeeThunk';
import { selectEmployeePagination, selectEmployees } from '../../employees/employeeSelector';
import Header from '../../../components/common/Header';
import StatsCard from '../components/StatsCard';
import { Users, UserCheck, Clock, ArrowUpRight, BriefcaseBusiness } from 'lucide-react';

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
      <Header title="Dashboard Overview" subtitle="Live employee health, staffing movement, and directory signals." />

      <section className="overflow-hidden rounded-2xl bg-slate-950 text-white shadow-2xl shadow-slate-900/20">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-teal-200">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              Workforce command center
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Manage people with clarity.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Keep your directory, roles, and availability in sync from one focused operational dashboard.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-300">Active rate</span>
              <ArrowUpRight className="h-5 w-5 text-teal-300" />
            </div>
            <p className="mt-4 text-5xl font-black tracking-tight">
              {totalEmployeesCount ? Math.round((activeEmployeesCount / totalEmployeesCount) * 100) : 0}%
            </p>
            <p className="mt-2 text-xs font-medium text-slate-400">Based on current employee records.</p>
          </div>
        </div>
      </section>

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

      <div className="surface-card rounded-2xl p-6 space-y-3">
        <h3 className="text-lg font-black text-slate-950">System Architecture Overview</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          The Employee Management System features decoupled Feature-Based Architecture on client and server. Data is stored directly in MongoDB and synced via Redux Toolkit and REST API endpoints.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
