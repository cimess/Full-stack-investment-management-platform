import React from 'react';
import { Users, Briefcase, DollarSign, AlertTriangle, TrendingUp, Loader2 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../../components/ui/StatCard';

const platformVolumeData = [
  { month: 'Sep', volume: 1200000 },
  { month: 'Oct', volume: 1450000 },
  { month: 'Nov', volume: 1310000 },
  { month: 'Dec', volume: 1780000 },
  { month: 'Jan', volume: 1640000 },
  { month: 'Feb', volume: 2100000 },
];

const transactionsByTypeData = [
  { type: 'Buy', count: 342 },
  { type: 'Sell', count: 218 },
  { type: 'Pending', count: 47 },
  { type: 'Rejected', count: 23 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
        <p className="text-slate-400 text-xs mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} className="font-bold" style={{ color: p.color }}>
            {p.value > 1000 ? `$${p.value.toLocaleString()}` : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

import { useGetAdminDashboard } from '../../../hooks/useQuery';

const Overview: React.FC = () => {
  const { data: adminData, isLoading } = useGetAdminDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  const {
    users = [],
    managers = [],
    restrictedUser = [],
    restrictedManagers = [],
    transactions = [],
  } = adminData?.data || {};

  // Calculate total volume from last 30 transactions
  const totalVolume = transactions.reduce((acc: number, tx: any) => acc + Number(tx.price * tx.quantity), 0);
  const registeredUsersCount = users.length + managers.length;
  const activeManagersCount = managers.length;
  const restrictedCount = restrictedUser.length + restrictedManagers.length;

  return (
    <div className="space-y-6">
      {/* Platform Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Platform Volume"
          value={`$${(totalVolume / 1000).toFixed(1)}k`}
          icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
          iconBg="bg-emerald-500/10"
          subtitle="Last 30 transactions"
        />
        <StatCard
          title="Registered Users"
          value={registeredUsersCount.toString()}
          icon={<Users className="w-5 h-5 text-blue-400" />}
          iconBg="bg-blue-500/10"
        />
        <StatCard
          title="Active Managers"
          value={activeManagersCount.toString()}
          icon={<Briefcase className="w-5 h-5 text-purple-400" />}
          iconBg="bg-purple-500/10"
        />
        <StatCard
          title="Restricted Accounts"
          value={restrictedCount.toString()}
          icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
          iconBg="bg-red-500/10"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold text-lg mb-1">Platform Trade Volume</h2>
          <p className="text-slate-500 text-sm mb-5">Total capital moved through the platform (mock trend)</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={platformVolumeData}>
              <defs>
                <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="volume" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#volGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold text-lg mb-1">Transaction Types</h2>
          <p className="text-slate-500 text-sm mb-5">Last 30 transactions breakdown</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { type: 'Buy', count: transactions.filter((tx: any) => tx.type === 'BUY').length },
              { type: 'Sell', count: transactions.filter((tx: any) => tx.type === 'SELL').length },
            ]} layout="vertical">
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="type" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
