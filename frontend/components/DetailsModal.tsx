import React, { useEffect, useState } from 'react';
import { X, Globe, Building2, Briefcase, TrendingUp, Info, Activity, Loader2, Wallet, Calendar } from 'lucide-react';
import { StockCardProps } from '../types';
import { useNavigate } from 'react-router-dom';
import PriceChart from './PriceChart';
import { useFetchStockHistory, useFetchStockDetails, useGetMe, useBuyStock } from '../hooks/useQuery';
import { toast } from 'react-toastify';
import { StockIntelligence } from './analytics/StockIntelligence';

const DetailsModal = React.memo(({
  item,
  onClose,
  targetPath = "/signup",
  onConfirm: externalConfirm,
  tradeType = 'BUY',
  isPending: externalPending,
  initialQuantity = 0,
  isManager = false
}: {
  item: StockCardProps,
  onClose: () => void,
  targetPath?: string,
  onConfirm?: (id: string, qty: number) => void,
  tradeType?: 'BUY' | 'SELL',
  isPending?: boolean,
  initialQuantity?: number,
  isManager?: boolean
}) => {
  const navigate = useNavigate();
  const [range, setRange] = useState('1mo');
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [chartType, setChartType] = useState<'area' | 'candles'>('area');

  const { data: userData, isLoading: isUserLoading } = useGetMe();
  const { mutate: buyStock, isPending: isBuying } = useBuyStock();
  const { mutate: fetchHistory, data: historyData, isPending: isHistoryLoading } = useFetchStockHistory();
  const { mutate: fetchDetails, data: detailsData, isPending: isDetailsLoading, isError: isDetailsError } = useFetchStockDetails();


  const isLoggedIn = !!userData?.success;
  const isPending = isBuying || externalPending;


  useEffect(() => {

    if (isDetailsError) {
      toast.info("Failed to fetch market data");
    }
  }, [isDetailsError])

  useEffect(() => {
    // ✅ Only fetch from backend if NOT logged in (guest on landing page)
    if (item?.symbol && item.type !== 'CASH' && !isLoggedIn) {
      fetchDetails(item.symbol);
    }
  }, [item?.symbol, fetchDetails, isLoggedIn]);

  useEffect(() => {
    if (item?.symbol) {
      fetchHistory({ symbol: item.symbol, range });
    }
  }, [item?.symbol, range, fetchHistory]);


  const isDataReady = isLoggedIn || (detailsData?.data && !isDetailsLoading)

  if (!item) return null;


  const displayItem = (detailsData as any)?.data ? { ...item, ...(detailsData as any).data } : item;
  const price: any = isLoggedIn ? item.invest : displayItem?.displayPrice;
  const calPrice = item?.price || displayItem?.price
  const totalCost = calPrice !== "N/A" ? calPrice * quantity : "N/A";

  // frontend/components/DetailsModal.tsx

  // 1. Determine if it's crypto (checking both sources)
  const isCrypto = item.type === 'CRYPTO' || displayItem.type === 'CRYPTO' || displayItem.isCrypto || item.symbol?.endsWith('-USD');

  // 2. Helper to get a value from any of the three possible locations:
  // (Backend Details -> Frontend Flat Item -> Frontend Nested Stats)
  const getStat = (key: string, fallback: any = 'N/A') => {
    return (displayItem as any)?.[key] || ((item as any)?.[key] || (item as any)?.stats?.[key] || fallback);
  };

  // 3. The 100% complete stats array
  const stats = [
    { label: 'Market Cap', value: getStat('displayMarketCap', getStat('marketCap')) },
    { label: 'Volume', value: getStat('displayVolume', getStat('volume')) },

    isCrypto
      ? { label: 'Circ. Supply', value: getStat('circulatingSupply') }
      : { label: 'P/E Ratio', value: getStat('peRatio') },
    { label: 'Open', value: getStat('open') },
    { label: 'Previous Close', value: getStat('previousClose') },

    isCrypto
      ? { label: 'Rank', value: getStat('marketCapRank') !== 'N/A' ? `#${getStat('marketCapRank')}` : 'N/A' }
      : { label: 'Div. Yield', value: getStat('dividendYield') },

    {
      label: '52W High',
      value: getStat('display52wHigh', getStat('fiftyTwoWeekHigh'))
    },
    {
      label: '52W Low',
      value: getStat('display52wLow', getStat('fiftyTwoWeekLow'))
    },
    !isCrypto && { label: 'Eps', value: getStat('eps') },
    !isCrypto && { label: "Beta", value: getStat("beta") }
  ].filter(Boolean);



  const handleImmediateTrade = () => {



    if (!isLoggedIn) {
      toast.error("Please log in to execute trades");
      return;
    }
    // Safety check: Ensure quantity is valid
    if (quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }
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


  const chartData = (historyData as any)?.data || [];
  const changeDisplay = item?.return || displayItem?.return || "0.00%";
  const isUp = changeDisplay.startsWith('+') || parseFloat(changeDisplay) >= 0;



  if (!isDataReady && isDetailsLoading) {

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/60 font-medium">Fetching market data...</p>
        </div>
      </div>
    );
  }


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
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight shrink-0">{item.label}</h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase letter tracking-wider">{item.symbol}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{item.type}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/10 uppercase tracking-wider ${displayItem.risk?.color || 'text-slate-400'}`}>
                  Risk: {displayItem.risk?.label || 'Variable'}
                </span>
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
              <span className="text-4xl sm:text-5xl font-bold text-white tracking-tighter">{price}</span>
              <span className={`text-sm font-bold px-2 py-1 rounded-lg ${isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{Number(parseFloat(changeDisplay) || 0).toFixed(2)}%</span>
            </div>

            <div className="flex items-center justify-between gap-2 mb-6 max-w-full overflow-x-auto custom-scrollbar-hide">
              <div className="flex gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/5 shrink-0">
                {['1d', '1w', '1mo', '1y', 'max'].map((t) => (
                  <button key={t} onClick={() => setRange(t)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${range === t ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}>{t}</button>
                ))}
              </div>

              <div className="flex gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/5 shrink-0">
                <button 
                  onClick={() => setChartType('area')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${chartType === 'area' ? 'bg-indigo-500 text-white' : 'text-slate-500 hover:text-white'}`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setChartType('candles')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${chartType === 'candles' ? 'bg-indigo-500 text-white' : 'text-slate-500 hover:text-white'}`}
                >
                  <Activity className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className={`h-[250px] w-full transition-opacity ${isHistoryLoading ? 'opacity-30' : 'opacity-100'}`}>
              {chartData.length > 0 ? (
                <PriceChart data={chartData} containerHeight={250} isUp={isUp} type={chartType} />
              ) : (
                <div className="h-full flex items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                  <p className="text-slate-600 text-xs font-bold tracking-widest uppercase">Loading Analytics...</p>
                </div>
              )}
            </div>
          </div>

          {/* Key Stats */}
          <div className="px-6 sm:px-8 py-8 border-t border-white/5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
              {stats.map((stat, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-sm font-bold text-white tracking-tight">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="px-6 sm:px-8 py-8 border-t border-white/5 space-y-6">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Info className="w-3.5 h-3.5" />
                About {displayItem.company}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {displayItem.about || displayItem.financialSummary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">HQ / Origin</p>
                <div className="flex items-center gap-2 text-white font-bold">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-sm">{displayItem.stats.hq || 'Global'}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {displayItem.isCrypto ? 'Market Rank' : 'Leadership'}
                </p>
                <div className="flex items-center gap-2 text-white font-bold">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-sm">{displayItem.stats.ceo || 'N/A'}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Industry</p>
                <div className="flex items-center gap-2 text-white font-bold">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-sm">{displayItem.stats.industry || 'N/A'}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Sector</p>
                <div className="flex items-center gap-2 text-white font-bold">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-sm">{displayItem.stats.more?.replace("Sector:", "").trim() || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{displayItem.industry}</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{displayItem.sector}</span>
            </div>
          </div>
          {((detailsData as any)?.data?.intelligence || item?.intelligence) && (
            <StockIntelligence
              intelligence={(detailsData as any)?.data?.intelligence || item?.intelligence}
            />
          )}
        </div>

        {/* REDESIGNED TRADING CONSOLE */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-black/95 backdrop-blur-xl sticky bottom-0">
          {isManager ? (
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 rounded-2xl border border-white/10 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all"
              >
                Close Details
              </button>
              {isManager && <button
                onClick={() => {
                  onClose();
                  navigate(`/dashboard/manager/dcf?symbol=${displayItem.symbol}`);
                }}
                className="flex-[2] px-8 py-4 rounded-2xl bg-indigo-500 text-white font-bold uppercase text-[10px] tracking-widest shadow-2xl shadow-indigo-500/20 hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4" />
                Deep Analysis
              </button>}
            </div>
          ) : !isUserLoading && isLoggedIn ? (
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
                Join CimessInvest to Trade
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
});

export default DetailsModal;
