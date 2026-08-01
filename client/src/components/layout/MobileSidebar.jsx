import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, User, ShieldCheck, X } from 'lucide-react';

const MobileSidebar = ({ isOpen, onClose }) => {
  // Close mobile sidebar on route change / screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onClose();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Employees', path: '/employees', icon: Users },
    { label: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white text-slate-700 flex flex-col shadow-2xl z-50">
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-teal-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-lg font-black tracking-tight text-slate-950">EmpManage</span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">People Ops</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-lg shadow-slate-900/15'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="rounded-xl bg-slate-50 p-3 text-xs font-medium leading-relaxed text-slate-500">
            Sign out securely from your profile page.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
