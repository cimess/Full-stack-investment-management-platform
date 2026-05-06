import React, { useEffect } from 'react';
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Briefcase, Loader2 } from 'lucide-react';
import DashboardChart from '../../../components/DashboardChart';
import StatCard from '../../../components/ui/StatCard';
import { getUserDashboard } from "../../../hooks/useQuery";
import { useQueryClient } from '@tanstack/react-query';
import { toast,Zoom } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AnalyticsWorker from '../../../workers/analytics.worker?worker';
import { useAnalytics } from '../../../hooks/useAnalysis';

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
  const [selectedRange, setSelectedRange] = React.useState('1W');
  const [isCalculating, setIsCalculating] = React.useState(false);

  const { trackEvent } = useAnalytics();

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
      payload: { portfolioValue, transactions, range: selectedRange }
    });

    return () => worker.terminate();
  }, [portfolioValue, transactions, data?.data, selectedRange]);

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
          onClick={() => {
            trackEvent("client_started_trading_first_time",{
              
            });
            navigate("/dashboard/client/portfolio")}
          }
        >
          Start Trading
        </button>
      </div>
    );
  }

  const rangeLabels: Record<string, string> = {
    '1W': 'Last 7 Days',
    '1M': 'Last 30 Days',
    '6M': 'Last 6 Months',
    '1Y': 'Last Year',
    'ALL': 'All Time Performance'
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard
          title="Portfolio Value"
          value={`$${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          icon={<DollarSign className="w-4 h-4 text-emerald-400" />}
          iconBg="bg-emerald-500/10"
        />
        <StatCard
          title="Total Profit"
          value={`${totalProfit >= 0 ? '+' : ''}$${Math.abs(totalProfit).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          change={`${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(2)}%`}
          changeType={totalProfit >= 0 ? "up" : "down"}
          icon={<TrendingUp className="w-4 h-4 text-blue-400" />}
          iconBg="bg-blue-500/10"
        />
        <StatCard
          title="Active Positions"
          value={activePositions}
          icon={<Briefcase className="w-4 h-4 text-purple-400" />}
          iconBg="bg-purple-500/10"
        />
        <StatCard
          title="Risk Level"
          value="Moderate"
          icon={<TrendingUp className="w-4 h-4 text-amber-400" />}
          iconBg="bg-amber-500/10"
          subtitle="Based on holdings"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 glass-panel rounded-2xl p-4 lg:p-6 border border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-white font-bold text-sm lg:text-lg tracking-tight">Portfolio Performance</h2>
              <p className="text-slate-500 text-[9px] sm:text-xs uppercase tracking-widest font-bold mt-0.5">{rangeLabels[selectedRange]}</p>
            </div>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 w-fit">
              {['1W', '1M', '6M', '1Y', 'ALL'].map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRange(r)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    selectedRange === r ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <DashboardChart 
              series={[{ type: 'area', data: chartData, color: '#10b981', dataKey: 'value' }]} 
              height={300} 
              loading={isCalculating} 
            />
          </div>
        </div>
 
        <div className="glass-panel rounded-2xl p-4 lg:p-6 border border-white/5 space-y-4 lg:space-y-6">
          <h2 className="text-white font-bold text-sm lg:text-lg">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
            {[{name:'Market',nav:"/dashboard/client/market" , track:"client clicked to view market in the client overview" }, {name: 'Portfolio', nav:"/dashboard/client/portfolio" , track:"client clicked to view portfolio in the client overview" },
             {name: 'Transactions', nav:"/dashboard/client/transactions" , track:"client clicked to view transactions in the client overview"},
             {name: 'Manager', nav:"/dashboard/client/manager" , track:"client clicked to view manager in the client overview"}].map((item) => (
              <button key={item.name} className="flex flex-col items-center justify-center
               gap-2 p-3 rounded-xl bg-white/3 border 
               border-white/5 hover:bg-white/5 transition-all group"
               onClick={() => {
                trackEvent(item.track);
                navigate(item.nav)
               }}>
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
              </button>
            ))}
          </div>
          
          <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
             <h3 className="text-white text-sm font-bold mb-1 tracking-tight">Portfolio Manager</h3>
             {user?.client_manager ? (
               <>
                  <p className="text-slate-500 text-xs mb-4">{user.client_manager.user.fullname} is overseeing your account.</p>
                  <button className="w-full py-2.5 bg-white text-black 
                  rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
                  onClick={() =>{
                    trackEvent("client clicked to contact manager in the client overview");
                    navigate("/dashboard/client/manager")
                  }}>
                    Contact Manager
                  </button>
               </>
             ) : (
               <>
                  <p className="text-slate-500 text-xs mb-4">No dedicated manager assigned yet.</p>
                  <button className="w-full py-2.5 bg-white/5 text-white border 
                  border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors"
                  onClick={() =>{
                    trackEvent("client clicked to assign manager in the client overview");
                    navigate("/dashboard/client/manager")
                  }}>
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
