import React from 'react';

const Header = ({ title, subtitle, children }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <div className="mb-3 h-1.5 w-14 rounded-full bg-teal-500" />
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-2 max-w-2xl">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
};

export default Header;
