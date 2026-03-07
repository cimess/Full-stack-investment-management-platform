import React from 'react';
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../../components/ui/StatCard';
import { useGetDashboard } from "../../../hooks/useQuery";
const chartData = [
  { name: 'Mon', value: 38400 },
  { name: 'Tue', value: 39100 },
  { name: 'Wed', value: 38800 },
  { name: 'Thu', value: 40200 },
  { name: 'Fri', value: 41500 },
  { name: 'Sat', value: 41200 },
  { name: 'Sun', value: 42300 },
];

const ClientOverview: React.FC = () => {
  const {data,isLoading,isError}=useGetDashboard()
  console.log(data)
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Portfolio Value"
          value="$42,300"
          change="+5.2%"
          changeType="up"
          icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
          iconBg="bg-emerald-500/10"
        />
        <StatCard
          title="Total Profit"
          value="$3,840"
          change="+12.4%"
          changeType="up"
          icon={<TrendingUp className="w-5 h-5 text-blue-400" />}
          iconBg="bg-blue-500/10"
        />
        <StatCard
          title="Active Positions"
          value="12"
          change="5 stocks"
          changeType="neutral"
          icon={<Briefcase className="w-5 h-5 text-purple-400" />}
          iconBg="bg-purple-500/10"
        />
        <StatCard
          title="total stock value"
          value="$1,250"
          icon={<DollarSign className="w-5 h-5 text-amber-400" />}
          iconBg="bg-amber-500/10"
          subtitle="Ready to invest"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 glass-panel rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-bold text-lg">Portfolio Performance</h2>
              <p className="text-slate-500 text-sm">Growth over the last 7 days</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} hide />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-6">
          <h2 className="text-white font-bold text-lg">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {['Market', 'Portfolio', 'History', 'Manager'].map((item) => (
              <button key={item} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <span className="text-slate-300 text-xs font-medium">{item}</span>
              </button>
            ))}
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20">
             <h3 className="text-white text-sm font-bold mb-1">Portfolio Manager</h3>
             <p className="text-indigo-200/70 text-xs mb-3">Sarah Mitchell is overseeing your requests.</p>
             <button className="w-full py-2 bg-indigo-500 text-white rounded-lg text-xs font-bold hover:bg-indigo-600 transition-colors">
               Contact Sarah
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOverview;
