import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchStockDetailsAPI } from '../../../services/queryServices';
import { 
  Search, 
  Plus, 
  Loader2, 
  TrendingUp, 
  Coins, 
  Check, 
  AlertCircle,
  Database,
  RefreshCw
} from 'lucide-react';
import { toast } from 'react-toastify';

// Inline formatters to avoid missing module errors
const formatCurrency = (val: any) => {
  if (val === undefined || val === null || val === 'N/A') return 'N/A';
  const num = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.-]+/g,"")) : val;
  if (isNaN(num)) return val;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
};

const formatCompactNumber = (val: any) => {
  if (val === undefined || val === null || val === 'N/A') return 'N/A';
  const num = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.-]+/g,"")) : val;
  if (isNaN(num)) return val;
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(num);
};

const StocksView: React.FC = () => {
  const [symbol, setSymbol] = useState('');
  const [lastAdded, setLastAdded] = useState<any>(null);
  const queryClient = useQueryClient();

  const { mutate: addStock, isPending } = useMutation({
    mutationFn: fetchStockDetailsAPI,
    onSuccess: (data) => {
      setLastAdded(data.data);
      toast.success(`${data.data.symbol} added/updated successfully!`);
      setSymbol('');
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to add asset");
    }
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol.trim()) return;
    addStock(symbol.trim().toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-2xl">Asset Management</h2>
          <p className="text-slate-500 text-sm">Seed the database with new Stocks or Cryptocurrencies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Form */}
        <div className="lg:col-span-1 glass-panel rounded-2xl border border-white/5 p-6 space-y-6 self-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Plus className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-white font-bold">Add New Asset</h3>
          </div>

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">Symbol / Ticker</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder="e.g. AAPL, BTC-USD, MSFT"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors" 
                />
              </div>
              <p className="text-[10px] text-slate-500 italic">
                Tip: Use -USD suffix for Crypto (e.g. ETH-USD)
              </p>
            </div>

            <button 
              type="submit"
              disabled={isPending || !symbol.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Fetching Data...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  Seed Asset
                </>
              )}
            </button>
          </form>

          <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-xs text-amber-200/70 leading-relaxed">
              Adding an asset will instantly fetch its current price, market cap, and fundamentals from our live providers.
            </p>
          </div>
        </div>

        {/* Status / Last Added */}
        <div className="lg:col-span-2 space-y-6">
          {lastAdded ? (
            <div className="glass-panel rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 animate-in slide-in-from-right duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                    {lastAdded.isCrypto ? <Coins className="text-yellow-500" /> : <TrendingUp className="text-emerald-500" />}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{lastAdded.company}</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-blue-400 font-mono text-sm">{lastAdded.symbol}</span>
                       <span className="text-slate-600">•</span>
                       <span className="text-slate-400 text-xs uppercase tracking-widest">{lastAdded.assetType}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 text-[10px] font-bold uppercase">Stored in DB</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-white/3 rounded-xl border border-white/5">
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Price</p>
                  <p className="text-white font-bold">{lastAdded.displayPrice}</p>
                </div>
                <div className="p-4 bg-white/3 rounded-xl border border-white/5">
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Market Cap</p>
                  <p className="text-white font-bold">{lastAdded.marketCap}</p>
                </div>
                <div className="p-4 bg-white/3 rounded-xl border border-white/5">
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Sector</p>
                  <p className="text-white font-bold text-sm truncate">{lastAdded.sector || 'N/A'}</p>
                </div>
                <div className="p-4 bg-white/3 rounded-xl border border-white/5">
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Status</p>
                  <p className="text-emerald-400 font-bold text-sm flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> Live
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center glass-panel rounded-2xl border border-white/5 p-6 border-dashed">
              <Database className="w-12 h-12 text-slate-700 mb-4" />
              <h3 className="text-white font-medium">Ready to Seed</h3>
              <p className="text-slate-500 text-sm max-w-xs mt-2">
                Enter an asset ticker on the left to pull live data and save it to our global market tracking system.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StocksView;
