import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAuthUser } from '../../features/auth/authSelector';

const Navbar = ({ onMenuClick }) => {
  const user = useSelector(selectAuthUser);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/70 bg-white/72 px-4 py-3 shadow-sm backdrop-blur-xl sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">Workspace</p>
          <h2 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">Employee Management</h2>
        </div>
      </div>

      <div className="hidden lg:flex h-10 max-w-sm flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 text-sm text-slate-400 shadow-sm">
        <Search className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">Search people, roles, teams</span>
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-400 shadow-sm">
          <Search className="h-4 w-4" />
        </div>

        <button
          className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition-colors hover:text-teal-700"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-teal-500 ring-2 ring-white" />
        </button>

        <div className="hidden sm:block h-8 w-px bg-slate-200" />

        <Link
          to="/profile"
          className="flex items-center gap-2.5 rounded-xl border border-transparent p-1 transition-colors hover:border-slate-200 hover:bg-white group"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-950 text-teal-300 flex items-center justify-center font-black text-sm ring-4 ring-white">
            {user?.name ? user.name[0].toUpperCase() : <User className="w-4 h-4" />}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-bold text-slate-900 leading-tight">{user?.name || 'User Profile'}</div>
            <div className="text-xs font-medium text-slate-500 capitalize">{user?.role || 'Employee'}</div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
