import React from 'react';
import { DollarSign, Users, Clock, CheckCircle, Loader2, Copy, Check } from 'lucide-react';
import DashboardChart from '../../../components/DashboardChart';
import StatCard from '../../../components/ui/StatCard';
import { useGetManagerDashboard } from '../../../hooks/useQuery';
import { useQueryClient } from '@tanstack/react-query';
import AnalyticsWorker from '../../../workers/analytics.worker?worker';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
        <p className="text-slate-400 text-xs mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} className="font-bold" style={{ color: p.color }}>
            {p.name}: {typeof p.value === 'number' && p.value > 1000 ? `$${p.value.toLocaleString()}` : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};



const ManagerOverview: React.FC = () => {
  const { data: managerData, isLoading } = useGetManagerDashboard();
  const queryClient = useQueryClient();
  const [copied, setCopied] = React.useState(false);

  const meData: any = queryClient.getQueryData(["me"]);
  const userId = meData?.data?.manager.id;

  const handleCopyId = () => {
    if (userId) {
      navigator.clipboard.writeText(userId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const clients = managerData?.data || [];
  
  // Calculate stats from real data
  const totalAUM = React.useMemo(() => 
    clients.reduce((acc: number, client: any) => {
      const portfolioValue = client.portfolio?.investment?.reduce((pAcc: number, inv: any) => {
        return pAcc + (inv.quantity * (inv.stock?.price || inv.avgPrice));
      }, 0) || 0;
      return acc + portfolioValue;
    }, 0)
  , [clients]);

  const activeClients = clients.length;
  
  const pendingRequests = React.useMemo(() => 
    clients.reduce((acc: number, client: any) => {
      const pendingCount = client.portfolio?.trade_request?.filter((req: any) => req.status === 'PENDING').length || 0;
      return acc + pendingCount;
    }, 0)
  , [clients]);

  const approvedTrades = React.useMemo(() => 
    clients.reduce((acc: number, client: any) => {
      const approvedCount = client.portfolio?.trade_request?.filter((req: any) => req.status === 'SUCCESS').length || 0;
      return acc + approvedCount;
    }, 0)
  , [clients]);

  const [analyticsData, setAnalyticsData] = React.useState<{ aumData: any[], requestVolumeData: any[] }>({ aumData: [], requestVolumeData: [] });
  const [isCalculating, setIsCalculating] = React.useState(false);

  React.useEffect(() => {
    if (!clients.length) return;

    setIsCalculating(true);
    const worker = new AnalyticsWorker();

    worker.onmessage = (e) => {
      if (e.data.type === 'MANAGER_ANALYTICS_RESULT') {
        setAnalyticsData(e.data.data);
        setIsCalculating(false);
        worker.terminate();
      }
    };

    worker.postMessage({
      type: 'CALCULATE_MANAGER_ANALYTICS',
      payload: { clients }
    });

    return () => worker.terminate();
  }, [clients]);

  const { aumData, requestVolumeData } = analyticsData;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }


  return (
    <div className="space-y-6">
      {/* Referral ID Banner */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/5 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-lg leading-none mb-2">Manager Referral ID</h2>
          <p className="text-slate-400 text-sm">Share this ID with your clients so they can add you as their manager.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-slate-300 font-mono text-sm flex-1 sm:flex-none overflow-hidden text-ellipsis whitespace-nowrap min-w-0 max-w-[200px] sm:max-w-none">
            {userId || "Loading..."}
          </div>
          <button 
            onClick={handleCopyId}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              copied 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="text-xs font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-xs font-medium">Copy ID</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total AUM"
          value={`$${(totalAUM / 1000).toFixed(1)}k`}
          icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
          iconBg="bg-emerald-500/10"
        />
        <StatCard
          title="Active Clients"
          value={activeClients.toString()}
          icon={<Users className="w-5 h-5 text-blue-400" />}
          iconBg="bg-blue-500/10"
        />
        <StatCard
          title="Pending Requests"
          value={pendingRequests.toString()}
          icon={<Clock className="w-5 h-5 text-amber-400" />}
          iconBg="bg-amber-500/10"
          subtitle="Awaiting your approval"
        />
        <StatCard
          title="Approved Trades"
          value={approvedTrades.toString()}
          icon={<CheckCircle className="w-5 h-5 text-purple-400" />}
          iconBg="bg-purple-500/10"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-white/5 relative">
          {isCalculating && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm z-10 rounded-2xl">
              <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
            </div>
          )}
          <h2 className="text-white font-bold text-lg mb-1">AUM Trend</h2>
          <p className="text-slate-500 text-sm mb-5">Assets under management (6 months)</p>
          <DashboardChart 
            series={[{ type: 'line', data: aumData, color: '#3b82f6', dataKey: 'aum' }]} 
            loading={isCalculating} 
          />
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5 relative">
          {isCalculating && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm z-10 rounded-2xl">
              <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
            </div>
          )}
          <h2 className="text-white font-bold text-lg mb-1">Request Volume</h2>
          <p className="text-slate-500 text-sm mb-5">Buy vs Sell requests per week</p>
          <DashboardChart 
            series={[
              { type: 'bar', data: requestVolumeData, color: '#10b981', dataKey: 'buy' },
              { type: 'bar', data: requestVolumeData, color: '#ef4444', dataKey: 'sell' }
            ]} 
            loading={isCalculating} 
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerOverview;
