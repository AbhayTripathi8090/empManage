import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, User, ShieldCheck, Sparkles } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Employees', path: '/employees', icon: Users },
    { label: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="hidden lg:flex w-72 min-h-screen flex-col flex-shrink-0 p-4">
      <div className="glass-panel flex h-full flex-col rounded-2xl overflow-hidden">
      <div className="h-20 flex items-center gap-3 px-5 border-b border-slate-200/80">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-teal-300 shadow-lg shadow-slate-900/15">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <span className="block text-lg font-black tracking-tight text-slate-950">EmpManage</span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">People Ops</span>
        </div>
      </div>

      <div className="mx-4 mt-4 rounded-xl border border-teal-100 bg-teal-50/70 p-3 text-teal-900">
        <div className="flex items-center gap-2 text-sm font-bold">
          <Sparkles className="h-4 w-4" />
          Smart directory
        </div>
        <p className="mt-1 text-xs leading-relaxed text-teal-700">Track hiring, roles, and employee status from one quiet dashboard.</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-lg shadow-slate-900/15'
                    : 'text-slate-500 hover:bg-white hover:text-slate-950 hover:shadow-sm'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* <div className="p-4 border-t border-slate-200/80">
        <div className="rounded-xl bg-slate-50 p-3 text-xs font-medium leading-relaxed text-slate-500">
          Sign out securely from your profile page.
        </div>
      </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;
