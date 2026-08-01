import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, User, LogOut, ShieldAlert } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutUserThunk } from '../../features/auth/authThunk';

const Sidebar = () => {
  const dispatch = useDispatch();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Employees', path: '/employees', icon: Users },
    { label: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="hidden lg:flex w-64 bg-slate-900 text-slate-300 min-h-screen flex-col border-r border-slate-800 flex-shrink-0">
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
        <ShieldAlert className="w-7 h-7 text-indigo-400" />
        <span className="text-lg font-bold tracking-wider text-white">EMP PORTAL</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => dispatch(logoutUserThunk())}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
