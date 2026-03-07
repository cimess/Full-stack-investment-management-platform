import React from 'react';
import { PieChart, TrendingUp, BarChart3, Target } from 'lucide-react';

const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-bold text-2xl">Portfolio Analytics</h2>
        <p className="text-slate-500 text-sm">Deep insights into client performance and risk metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-white/5">
            <PieChart className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold">Asset Allocation</h3>
          <p className="text-slate-500 text-sm">Visual breakdown of sectors and asset classes across your managed portfolios.</p>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
            <div className="h-full bg-blue-500" style={{ width: '45%' }} />
            <div className="h-full bg-emerald-500" style={{ width: '30%' }} />
            <div className="h-full bg-amber-500" style={{ width: '25%' }} />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-white/5">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold">Risk Attribution</h3>
          <p className="text-slate-500 text-sm">Analyze the volatility and risk factors contributing to portfolio swings.</p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium"><span className="text-slate-400">Market Exposure</span> <span className="text-emerald-400">Low</span></div>
            <div className="flex justify-between text-xs font-medium"><span className="text-slate-400">Sector Concentration</span> <span className="text-amber-400">Medium</span></div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-white/5">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold">Forecasting</h3>
          <p className="text-slate-500 text-sm">AI-driven projections for portfolio growth based on current market trends.</p>
          <button className="w-full py-2 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/30 hover:bg-purple-500/30 transition-colors">
             Generate Report
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-8 border border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
         <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-500 mb-2">
           <BarChart3 className="w-8 h-8" />
         </div>
         <h2 className="text-white font-bold text-xl">Advanced Charts Coming Soon</h2>
         <p className="text-slate-500 max-w-md mx-auto">We're integrating real-time market depth and historical benchmarking tools to give you even better insights.</p>
      </div>
    </div>
  );
};

export default AnalyticsView;
