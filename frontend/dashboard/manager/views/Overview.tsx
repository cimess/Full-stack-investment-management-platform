import React from 'react';
import { DollarSign, Users, Clock, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import StatCard from '../../../components/ui/StatCard';

const aumData = [
  { month: 'Sep', aum: 420000 },
  { month: 'Oct', aum: 460000 },
  { month: 'Nov', aum: 445000 },
  { month: 'Dec', aum: 510000 },
  { month: 'Jan', aum: 490000 },
  { month: 'Feb', aum: 548000 },
];

const requestVolumeData = [
  { week: 'W1', buy: 12, sell: 5 },
  { week: 'W2', buy: 18, sell: 9 },
  { week: 'W3', buy: 8, sell: 14 },
  { week: 'W4', buy: 22, sell: 7 },
];

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
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const clients = managerData?.data || [];
  
  // Calculate stats from real data
  const totalAUM = clients.reduce((acc: number, client: any) => {
    const portfolioValue = client.portfolio?.investment?.reduce((pAcc: number, inv: any) => {
      return pAcc + (inv.quantity * (inv.stock?.price || inv.avgPrice));
    }, 0) || 0;
    return acc + portfolioValue;
  }, 0);

  const activeClients = clients.length;
  
  const pendingRequests = clients.reduce((acc: number, client: any) => {
    const pendingCount = client.portfolio?.trade_request?.filter((req: any) => req.status === 'PENDING').length || 0;
    return acc + pendingCount;
  }, 0);

  const approvedTrades = clients.reduce((acc: number, client: any) => {
    const approvedCount = client.portfolio?.trade_request?.filter((req: any) => req.status === 'APPROVED').length || 0;
    return acc + approvedCount;
  }, 0);

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
