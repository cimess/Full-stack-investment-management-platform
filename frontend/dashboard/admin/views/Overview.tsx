import React from 'react';
import { Users, Briefcase, DollarSign, AlertTriangle, Loader2 } from 'lucide-react';
import DashboardChart from '../../../components/DashboardChart';
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
          <DashboardChart 
            series={[{ type: 'area', data: platformVolumeData, color: '#8b5cf6', dataKey: 'volume' }]} 
            loading={isCalculating} 
          />
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5 relative">
          {isCalculating && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm z-10 rounded-2xl">
              <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
            </div>
          )}
          <h2 className="text-white font-bold text-lg mb-1">Trade Status</h2>
          <p className="text-slate-500 text-sm mb-5">Current request breakdown</p>
          <DashboardChart 
            series={[{ type: 'bar', data: tradeStatusData, color: '#8b5cf6', dataKey: 'count' }]} 
            loading={isCalculating} 
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
