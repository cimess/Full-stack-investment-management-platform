import React, { useEffect } from 'react';
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Briefcase, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../../components/ui/StatCard';
import { getUserDashboard } from "../../../hooks/useQuery";
import { useQueryClient } from '@tanstack/react-query';
import { toast,Zoom } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AnalyticsWorker from '../../../workers/analytics.worker?worker';


type User = {
  id: string;
  name: string;
  isVerified: boolean;
};


const ClientOverview: React.FC = () => {
  const { data, isLoading, isError ,error} = getUserDashboard();
  const navigate = useNavigate();

    const queryClient = useQueryClient();
  const me = queryClient.getQueryData<{data:User}>(["me"]);
  const checkVerification = me?.data?.isVerified



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

  const { investments = [], transactions = [], user = null } = data?.data || {};

  // Calculate dynamic stats
  const portfolioValue = React.useMemo(() => 
    investments.reduce((acc: number, inv: any) => acc + (inv.quantity * Number(inv.stock.price)), 0)
  , [investments]);

  const totalProfit = React.useMemo(() => 
    investments.reduce((acc: number, inv: any) => acc + (inv.quantity * (Number(inv.stock.price) - Number(inv.avgPrice))), 0)
  , [investments]);

  const activePositions = investments.length;
  const initialInvestment = portfolioValue - totalProfit;
  const percentageChange = initialInvestment > 0 ? (totalProfit / initialInvestment) * 100 : 0;

  const [chartData, setChartData] = React.useState<any[]>([]);
  const [isCalculating, setIsCalculating] = React.useState(false);

  useEffect(() => {
    if (!data?.data || !transactions.length) return;

    setIsCalculating(true);
    const worker = new AnalyticsWorker();

    worker.onmessage = (e) => {
      if (e.data.type === 'CHART_DATA_RESULT') {
        setChartData(e.data.data);
        setIsCalculating(false);
        worker.terminate();
      }
    };

    worker.postMessage({
      type: 'CALCULATE_CHART_DATA',
      payload: { portfolioValue, transactions }
    });

    return () => worker.terminate();
  }, [portfolioValue, transactions, data?.data]);

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

  // Handle empty portfolio state (no investments)
  if (investments.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <button
          className=" rounded-xl font-bold text-gray-300 transition-all 
          shadow-lg p-5 lg:p-8 bg-gradient-to-r from-green-600 to-emerald-600 
          hover:from-green-500 shadow-green-500/20"
          onClick={() => navigate("/dashboard/client/portfolio")}
        >
          Start Trading
        </button>
      </div>
    );
  }

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
              <h2 className="text-white font-bold text-base lg:text-lg tracking-tight">Portfolio Performance</h2>
              <p className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest font-bold mt-1">Last 7 Days</p>
            </div>
          </div>
          <div className="relative h-[220px] sm:h-[300px]">
            {isCalculating && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10 rounded-xl">
                <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
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
                contentStyle={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
 
        <div className="glass-panel rounded-2xl p-4 lg:p-6 border border-white/5 space-y-4 lg:space-y-6">
          <h2 className="text-white font-bold text-base lg:text-lg">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {['Market', 'Portfolio', 'History', 'Manager'].map((item) => (
              <button key={item} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{item}</span>
              </button>
            ))}
          </div>
          
          <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
             <h3 className="text-white text-sm font-bold mb-1 tracking-tight">Portfolio Manager</h3>
             {user?.client_manager ? (
               <>
                  <p className="text-slate-500 text-xs mb-4">{user.client_manager.user.fullname} is overseeing your account.</p>
                  <button className="w-full py-2.5 bg-white text-black rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
                    Contact Manager
                  </button>
               </>
             ) : (
               <>
                  <p className="text-slate-500 text-xs mb-4">No dedicated manager assigned yet.</p>
                  <button className="w-full py-2.5 bg-white/5 text-white border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">
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
