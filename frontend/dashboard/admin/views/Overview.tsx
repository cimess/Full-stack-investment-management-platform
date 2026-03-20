import React from 'react';
import { Users, Briefcase, DollarSign, AlertTriangle, Loader2 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../../components/ui/StatCard';
import { useGetAdminDashboard } from '../../../hooks/useQuery';
import AnalyticsWorker from '../../../workers/analytics.worker?worker';

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

  const [analyticsData, setAnalyticsData] = React.useState<{ platformVolumeData: any[], tradeStatusData: any[] }>({ 
    platformVolumeData: [], 
    tradeStatusData: [] 
  });
  const [isCalculating, setIsCalculating] = React.useState(false);

  React.useEffect(() => {
    if (!transactions.length && !tradeRequests.length) return;

    setIsCalculating(true);
    const worker = new AnalyticsWorker();

    worker.onmessage = (e) => {
      if (e.data.type === 'ADMIN_ANALYTICS_RESULT') {
        setAnalyticsData(e.data.data);
        setIsCalculating(false);
        worker.terminate();
      }
    };

    worker.postMessage({
      type: 'CALCULATE_ADMIN_ANALYTICS',
      payload: { transactions, tradeRequests }
    });

    return () => worker.terminate();
  }, [transactions, tradeRequests]);

  const totalVolume = React.useMemo(() => 
    transactions.reduce((acc: number, tx: any) => acc + Number(tx.price * tx.quantity), 0)
  , [transactions]);

  const registeredUsersCount = users.length + managers.length;
  const activeManagersCount = managers.length;
  const restrictedCount = restrictedUser.length + restrictedManagers.length;

  const { platformVolumeData, tradeStatusData } = analyticsData;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 glass-panel rounded-2xl p-6 border border-white/5 relative">
          {isCalculating && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm z-10 rounded-2xl">
              <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
            </div>
          )}
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

        <div className="glass-panel rounded-2xl p-6 border border-white/5 relative">
          {isCalculating && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm z-10 rounded-2xl">
              <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
            </div>
          )}
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
