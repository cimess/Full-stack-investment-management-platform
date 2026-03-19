import React from 'react';
import { DollarSign, Users, Clock, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import StatCard from '../../../components/ui/StatCard';

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

import { useGetManagerDashboard } from '../../../hooks/useQuery';
import { Loader2, Copy, Check } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

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

  // Generate real AUM trend based on client joining dates
  const aumData = React.useMemo(() => {
    if (!managerData?.data) return [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const result = [];

    for (let i = 5; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = months[targetDate.getMonth()];
      
      const aumAtMonth = clients.reduce((acc: number, client: any) => {
        if (new Date(client.createdAt) <= new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0)) {
           const val = client.portfolio?.investment?.reduce((pAcc: number, inv: any) => {
             return pAcc + (inv.quantity * (inv.stock?.price || inv.avgPrice));
           }, 0) || 0;
           return acc + val;
        }
        return acc;
      }, 0);

      result.push({ month: monthLabel, aum: aumAtMonth });
    }
    return result;
  }, [clients, managerData?.data]);

  // Generate real Request Volume data
  const requestVolumeData = React.useMemo(() => {
    if (!managerData?.data) return [];
    const result = [];
    const now = new Date();

    for (let i = 4; i >= 1; i--) {
      const weekStart = new Date(now.getTime() - (i * 7 * 24 * 60 * 60 * 1000));
      const weekEnd = new Date(now.getTime() - ((i - 1) * 7 * 24 * 60 * 60 * 1000));
      
      let buyCount = 0;
      let sellCount = 0;

      clients.forEach((client: any) => {
        client.portfolio?.trade_request?.forEach((req: any) => {
          const reqDate = new Date(req.createdAt);
          if (reqDate >= weekStart && reqDate < weekEnd) {
            if (req.type === 'BUY') buyCount++;
            else if (req.type === 'SELL') sellCount++;
          }
        });
      });

      result.push({ week: `W${5-i}`, buy: buyCount, sell: sellCount });
    }
    return result;
  }, [clients, managerData?.data]);

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
        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold text-lg mb-1">AUM Trend</h2>
          <p className="text-slate-500 text-sm mb-5">Assets under management (6 months)</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={aumData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="aum" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', stroke: '#0f172a', strokeWidth: 2, r: 5 }} activeDot={{ r: 8 }} name="AUM" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold text-lg mb-1">Request Volume</h2>
          <p className="text-slate-500 text-sm mb-5">Buy vs Sell requests per week</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={requestVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="buy" fill="#10b981" radius={[4, 4, 0, 0]} name="Buy" />
              <Bar dataKey="sell" fill="#ef4444" radius={[4, 4, 0, 0]} name="Sell" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ManagerOverview;
