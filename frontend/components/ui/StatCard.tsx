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
    <div className="glass-panel rounded-2xl p-6 hover:border-white/10 transition-all duration-300 group hover:shadow-lg hover:shadow-emerald-500/5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-white mb-1">{value}</p>
          {subtitle && <p className="text-slate-500 text-xs">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>

      {change && (
        <div className="mt-4 flex items-center gap-1.5">
          {changeType === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
          {changeType === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-400" />}
          <span
            className={`text-xs font-medium ${
              changeType === 'up'
                ? 'text-emerald-400'
                : changeType === 'down'
                ? 'text-red-400'
                : 'text-slate-400'
            }`}
          >
            {change}
          </span>
          <span className="text-slate-500 text-xs">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
