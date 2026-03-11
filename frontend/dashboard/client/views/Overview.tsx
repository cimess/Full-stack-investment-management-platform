import React, { useEffect } from 'react';
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Briefcase, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../../components/ui/StatCard';
import { useGetDashboard } from "../../../hooks/useQuery";
import { useQueryClient } from '@tanstack/react-query';
import { toast,Zoom } from 'react-toastify';
import { use } from 'chai';

const chartData = [
  { name: 'Mon', value: 38400 },
  { name: 'Tue', value: 39100 },
  { name: 'Wed', value: 38800 },
  { name: 'Thu', value: 40200 },
  { name: 'Fri', value: 41500 },
  { name: 'Sat', value: 41200 },
  { name: 'Sun', value: 42300 },
];
type User = {
  id: string;
  name: string;
  isVerified: boolean;
};


const ClientOverview: React.FC = () => {
  const { data, isLoading, isError } = useGetDashboard();

    const queryClient = useQueryClient();
  const me = queryClient.getQueryData<{data:User}>(["me"]);
  const checkVerification = me?.data?.isVerified


  useEffect(()=>{
 toast.success("Welcome to CimessInvestment Management Platform .", {
      position:"top-center",
      autoClose:5000,
      hideProgressBar:true,
      closeOnClick:true,
      pauseOnHover:true,
      draggable:true,
      theme:"colored",
      transition:Zoom,
      });
  },[]
  )
  useEffect(()=>{

   
    if(me?.data && !me.data.isVerified){
      toast.info("Your account is not verified. Please verify your email to access all features.", {
      position:"top-center",
      autoClose:5000,
      hideProgressBar:true,
      closeOnClick:true,
      pauseOnHover:true,
      draggable:true,
      theme:"colored",
      transition:Zoom,
      });
    }

    if(isError){
           toast.error("Failed to fetch dashboard data.", {
      position:"top-center",
      autoClose:5000,
      hideProgressBar:true,
      closeOnClick:true,
      pauseOnHover:true,
      draggable:true,
      theme:"colored",
      transition:Zoom,
      });
      }

  }
,[checkVerification,data,isError])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex h-full items-center justify-center p-12 text-slate-400">
        Failed to load dashboard data.
      </div>
    );
  }

  const { investments = [], user } = data.data;

  // Calculate dynamic stats
  const portfolioValue = investments.reduce((acc: number, inv: any) => acc + (inv.quantity * Number(inv.stock.price)), 0);
  const totalProfit = investments.reduce((acc: number, inv: any) => acc + (inv.quantity * (Number(inv.stock.price) - Number(inv.avgPrice))), 0);
  const activePositions = investments.length;

  const initialInvestment = portfolioValue - totalProfit;
  const percentageChange = initialInvestment > 0 ? (totalProfit / initialInvestment) * 100 : 0;

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Portfolio Value"
          value={`$${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
          iconBg="bg-emerald-500/10"
        />
        <StatCard
          title="Total Profit"
          value={`${totalProfit >= 0 ? '+' : ''}$${Math.abs(totalProfit).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          change={`${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(2)}%`}
          changeType={totalProfit >= 0 ? "up" : "down"}
          icon={<TrendingUp className="w-5 h-5 text-blue-400" />}
          iconBg="bg-blue-500/10"
        />
        <StatCard
          title="Active Positions"
          value={activePositions}
          icon={<Briefcase className="w-5 h-5 text-purple-400" />}
          iconBg="bg-purple-500/10"
        />
        <StatCard
          title="Risk Level"
          value="Moderate"
          icon={<TrendingUp className="w-5 h-5 text-amber-400" />}
          iconBg="bg-amber-500/10"
          subtitle="Based on holdings"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 glass-panel rounded-2xl p-4 lg:p-6 border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-bold text-base lg:text-lg">Portfolio Performance</h2>
              <p className="text-slate-500 text-xs lg:text-sm">Growth over the last 7 days</p>
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
 
        <div className="glass-panel rounded-2xl p-4 lg:p-6 border border-white/5 space-y-4 lg:space-y-6">
          <h2 className="text-white font-bold text-base lg:text-lg">Quick Actions</h2>
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
             {user?.client_manager ? (
               <>
                  <p className="text-indigo-200/70 text-xs mb-3">{user.client_manager.user.fullname} is overseeing your requests.</p>
                  <button className="w-full py-2 bg-indigo-500 text-white rounded-lg text-xs font-bold hover:bg-indigo-600 transition-colors">
                    Contact {user.client_manager.user.fullname.split(' ')[0]}
                  </button>
               </>
             ) : (
               <>
                  <p className="text-indigo-200/70 text-xs mb-3">You currently do not have a dedicated portfolio manager.</p>
                  <button className="w-full py-2 bg-slate-700 text-white rounded-lg text-xs font-bold hover:bg-slate-600 transition-colors">
                    Assign Manager
                  </button>
               </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOverview;
