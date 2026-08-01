import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color = 'indigo' }) => {
  const colorStyles = {
    indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-100',
    emerald: 'bg-teal-50 text-teal-700 ring-teal-100',
    amber: 'bg-amber-50 text-amber-700 ring-amber-100',
    rose: 'bg-rose-50 text-rose-700 ring-rose-100',
  };

  return (
    <div className="surface-card group rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <div className={`p-3 rounded-xl ring-1 ${colorStyles[color] || colorStyles.indigo}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <p className="text-4xl font-black text-slate-950 mt-5 tracking-tight">{value}</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className={`h-full rounded-full ${color === 'amber' ? 'bg-amber-400' : color === 'emerald' ? 'bg-teal-500' : 'bg-indigo-500'}`} style={{ width: `${Math.min(Number(value) || 0, 100)}%` }} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
