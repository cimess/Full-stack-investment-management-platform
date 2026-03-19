import React from 'react';
import { Users, Briefcase, DollarSign, AlertTriangle, TrendingUp, Loader2 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../../components/ui/StatCard';

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

  const {
    users = [],
    managers = [],
    restrictedUser = [],
    restrictedManagers = [],
    transactions = [],
    tradeRequests = [],
  } = adminData?.data || {};

  // Calculate dynamic stats
  const totalVolume = React.useMemo(() => 
    transactions.reduce((acc: number, tx: any) => acc + Number(tx.price * tx.quantity), 0)
  , [transactions]);

  const registeredUsersCount = users.length + managers.length;
  const activeManagersCount = managers.length;
  const restrictedCount = restrictedUser.length + restrictedManagers.length;

  // Generate dynamic platform volume trend (last 6 months)
  const platformVolumeData = React.useMemo(() => {
    if (!adminData?.data) return [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const result = [];

    for (let i = 5; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = months[targetDate.getMonth()];
      
      const volumeAtMonth = transactions
        .filter((tx: any) => {
          const txDate = new Date(tx.createdAt);
          return txDate.getMonth() === targetDate.getMonth() && txDate.getFullYear() === targetDate.getFullYear();
        })
        .reduce((acc: number, tx: any) => acc + Number(tx.price * tx.quantity), 0);

      result.push({ month: monthLabel, volume: volumeAtMonth });
    }
    return result;
  }, [transactions, adminData?.data]);

  // Generate real trade status breakdown
  const tradeStatusData = React.useMemo(() => {
    if (!adminData?.data) return [];
    return [
      { status: 'Success', count: tradeRequests.filter((r: any) => r.status === 'SUCCESS').length },
      { status: 'Rejected', count: tradeRequests.filter((r: any) => r.status === 'REJECTED').length },
      { status: 'Pending', count: tradeRequests.filter((r: any) => r.status === 'PENDING').length },
    ];
  }, [tradeRequests, adminData?.data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Platform Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Platform Volume"
          value={`$${(totalVolume / 1000).toFixed(1)}k`}
          icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
          iconBg="bg-emerald-500/10"
          subtitle="Recent transaction total"
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
          <p className="text-slate-500 text-sm mb-5">Total capital moved through the platform</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={platformVolumeData}>
              <defs>
                <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="volume" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#volGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold text-lg mb-1">Trade Status</h2>
          <p className="text-slate-500 text-sm mb-5">Current request breakdown</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={tradeStatusData} layout="vertical">
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} hide />
              <YAxis type="category" dataKey="status" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
