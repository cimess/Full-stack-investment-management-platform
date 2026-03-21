import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  iconBg?: string;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  iconBg = 'bg-emerald-500/10',
  subtitle,
}) => {
  return (
    <div className="premium-card p-4 sm:p-6 group hover:translate-y-[-2px]">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="premium-label mb-1.5 opacity-80">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-tighter font-mono">{value}</p>
          {subtitle && <p className="text-slate-500 text-[10px] sm:text-xs font-medium">{subtitle}</p>}
        </div>
        <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${iconBg} bg-opacity-5 flex items-center justify-center transition-all duration-300 border border-white/[0.03] group-hover:border-white/10 flex-shrink-0 ml-3`}>
          {React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5", strokeWidth: 1.5 })}
        </div>
      </div>

      {change && (
        <div className="mt-5 flex items-center gap-2">
          <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg ${
            changeType === 'up' 
              ? 'bg-emerald-500/10 text-emerald-400' 
              : changeType === 'down' 
              ? 'bg-red-500/10 text-red-400' 
              : 'bg-white/5 text-slate-400'
            }`}>
            {changeType === 'up' && <TrendingUp className="w-3 h-3" strokeWidth={2} />}
            {changeType === 'down' && <TrendingDown className="w-3 h-3" strokeWidth={2} />}
            <span className="text-[11px] font-bold font-mono tracking-tight">{change}</span>
          </div>
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
