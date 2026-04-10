import React, { useEffect, useState } from 'react';
import { X, Globe, Building2, Briefcase, TrendingUp, Info, Activity, Loader2, Wallet } from 'lucide-react';
import { StockCardProps } from '../types';
import { useNavigate } from 'react-router-dom';
import PriceChart from './PriceChart';
import { useFetchStockHistory, useFetchStockDetails, useGetMe, useBuyStock } from '../hooks/useQuery';
import { toast } from 'react-toastify';

const DetailsModal = React.memo(({ 
  item, 
  onClose, 
  targetPath = "/signup",
  onConfirm: externalConfirm,
  tradeType = 'BUY',
  isPending: externalPending,
  initialQuantity = 0
}: {
  item: StockCardProps,
  onClose: () => void,
  targetPath?: string,
  onConfirm?: (id: string, qty: number) => void,
  tradeType?: 'BUY' | 'SELL',
  isPending?: boolean,
  initialQuantity?: number
}) => {
  const navigate = useNavigate();
  const [range, setRange] = useState('1mo');
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  
  const { data: userData, isLoading: isUserLoading } = useGetMe();
  const { mutate: buyStock, isPending: isBuying } = useBuyStock();
  const { mutate: fetchHistory, data: historyData, isPending: isHistoryLoading } = useFetchStockHistory();
  const { mutate: fetchDetails, data: detailsData, isPending: isDetailsLoading } = useFetchStockDetails();

  const isLoggedIn = !!userData?.success;
  const isPending = isBuying || externalPending;

  useEffect(() => {
    if (item?.symbol) {
      fetchHistory({ symbol: item.symbol, range });
    }
  }, [item?.symbol, range, fetchHistory]);

  useEffect(() => {
    if (item?.symbol && item.type !== 'CASH' && item.type !== 'WALLET') {
      fetchDetails(item.symbol);
    }
  }, [item?.symbol, fetchDetails]);

  if (!item) return null;

  const displayItem = (detailsData as any)?.data ? { ...item, ...(detailsData as any).data } : item;
  const price = Number(displayItem.price || 0);
  const totalCost = price * quantity;

  const stats = [
    { label: 'Market Cap', value: displayItem.marketCap || 'N/A' },
    { label: 'Volume', value: displayItem.volume || 'N/A' },
    { label: 'P/E Ratio', value: displayItem.peRatio || 'N/A' },
    { label: 'Div. Yield', value: displayItem.dividendYield || 'N/A' },
    { label: '52W High', value: displayItem.fiftyTwoWeekHigh || 'N/A' },
    { label: '52W Low', value: displayItem.fiftyTwoWeekLow || 'N/A' },
  ];

  const handleImmediateTrade = () => {
    if (externalConfirm) {
      externalConfirm(item.id || item.symbol || '', quantity);
      return;
    }

    if (tradeType === 'BUY') {
      buyStock({ stock_id: item.id || item.symbol, quantity }, {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(`Successfully purchased ${quantity} ${item.symbol}`);
            onClose();
          } else {
            toast.error(res.message || 'Transaction failed');
          }
        },
        onError: () => toast.error('Network error during transaction')
      });
    }
  };

  const isUp = parseFloat(item.return || '0') >= 0;
  const chartData = (historyData as any)?.data || [];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity animate-in fade-in duration-500" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5 bg-white/[0.02] backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 p-2 shrink-0">
              <img src={item.image} alt={item.label} className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight truncate">{item.label}</h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase letter tracking-wider">{item.symbol}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{item.type}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-slate-500 hover:text-white transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          
          {/* Price & Chart */}
          <div className="p-6 sm:p-8">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl sm:text-5xl font-bold text-white tracking-tighter">${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <span className={`text-sm font-bold px-2 py-1 rounded-lg ${isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{item.return}</span>
            </div>

            <div className="flex gap-2 mb-6 bg-white/[0.03] p-1 rounded-xl w-fit border border-white/5">
              {['1d', '1w', '1mo', '1y', 'max'].map((t) => (
                <button key={t} onClick={() => setRange(t)} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${range === t ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}>{t}</button>
              ))}
            </div>

            <div className={`h-[250px] w-full transition-opacity ${isHistoryLoading ? 'opacity-30' : 'opacity-100'}`}>
              {chartData.length > 0 ? (
                <PriceChart data={chartData} containerHeight={250} isUp={isUp} />
              ) : (
                <div className="h-full flex items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                  <p className="text-slate-600 text-xs font-bold tracking-widest uppercase">Loading Analytics...</p>
                </div>
              )}
            </div>
          </div>

          {/* Key Stats */}
          <div className="px-6 sm:px-8 py-8 border-t border-white/5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-sm font-bold text-white tracking-tight">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REDESIGNED TRADING CONSOLE */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-black/95 backdrop-blur-xl sticky bottom-0">
          {!isUserLoading && isLoggedIn ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 p-4 rounded-3xl bg-white/5 border border-white/5">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 px-1">Order Quantity</label>
                  <input
                    type="number"
                    step="any"
                    placeholder="0.00"
                    value={quantity || ''}
                    onChange={(e) => setQuantity(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-transparent border-none text-white font-mono text-xl focus:outline-none font-bold placeholder:text-slate-700"
                  />
                </div>
                <div className="text-right">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 px-1">Estimated Total</label>
                  <p className="text-emerald-400 text-xl font-bold font-mono">${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 px-6 py-4 rounded-2xl border border-white/10 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all">Dismiss</button>
                <button
                  onClick={handleImmediateTrade}
                  disabled={quantity <= 0 || isPending}
                  className="flex-[2] px-8 py-4 rounded-2xl bg-emerald-500 text-white font-bold uppercase text-[10px] tracking-widest shadow-2xl shadow-emerald-500/20 disabled:opacity-20 transition-all flex items-center justify-center gap-2"
                >
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
                  {isPending ? 'Processing' : `Execute ${tradeType} Order`}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 px-6 py-4 rounded-2xl border border-white/10 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all">Dismiss</button>
              <button
                onClick={() => navigate(targetPath)}
                className="flex-[2] px-8 py-4 rounded-2xl bg-white text-black font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-white/10 hover:bg-slate-200 transition-all"
              >
                Join NovaInvest to Trade
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default DetailsModal;
