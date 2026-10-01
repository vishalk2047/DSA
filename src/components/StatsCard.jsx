import React from 'react';

export default function StatsCard({ title, value, subtitle, icon: Icon, trend, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-[#A8C4EC]/20 dark:bg-[#0474C4]/20 text-[#0474C4] dark:text-[#A8C4EC] border-[#A8C4EC]/40 dark:border-[#0474C4]/40',
    steel: 'bg-[#5379AE]/15 dark:bg-[#5379AE]/25 text-[#5379AE] dark:text-[#A8C4EC] border-[#5379AE]/30 dark:border-[#5379AE]/40',
    navy: 'bg-[#06457F]/10 dark:bg-[#06457F]/30 text-[#06457F] dark:text-[#A8C4EC] border-[#06457F]/20 dark:border-[#06457F]/40',
    teal: 'bg-[#2C444C]/15 dark:bg-[#2C444C]/30 text-[#2C444C] dark:text-[#A8C4EC] border-[#2C444C]/30 dark:border-[#2C444C]/50',
    amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/40',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40',
  };

  return (
    <div className="bg-white dark:bg-[#262B40] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-subtle hover:shadow-card transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-xl border ${colorMap[color] || colorMap.blue}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </div>
        {subtitle && (
          <div className="mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1.5">
            {trend && <span className="text-[#0474C4] dark:text-[#A8C4EC] font-medium">{trend}</span>}
            <span>{subtitle}</span>
          </div>
        )}
      </div>
    </div>
  );
}
