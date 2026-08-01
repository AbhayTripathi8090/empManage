import React from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAuthUser } from '../../features/auth/authSelector';
import { logoutUserThunk } from '../../features/auth/authThunk';

const Navbar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h2 className="text-base sm:text-lg font-semibold text-gray-800 tracking-tight">
          Employee Management System
        </h2>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-gray-200" />

        {/* Profile Pill & Link */}
        <Link
          to="/profile"
          className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-gray-50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm ring-2 ring-indigo-50 group-hover:ring-indigo-100">
            {user?.name ? user.name[0].toUpperCase() : <User className="w-4 h-4" />}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-semibold text-gray-800 leading-tight">{user?.name || 'User Profile'}</div>
            <div className="text-xs text-gray-500 capitalize">{user?.role || 'Employee'}</div>
          </div>
        </Link>

        {/* Logout Button */}
        <button
          onClick={() => dispatch(logoutUserThunk())}
          title="Logout"
          className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
