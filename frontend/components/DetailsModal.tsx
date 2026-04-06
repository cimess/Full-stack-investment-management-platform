import React, { useEffect, useState } from 'react';
import { X, Globe, Building2, Calendar, Briefcase, TrendingUp, Info, Activity } from 'lucide-react';
import { StockCardProps } from '../types';
import { useNavigate } from 'react-router-dom';
import PriceChart from './PriceChart';
import { useFetchStockHistory, useFetchStockDetails } from '../hooks/useQuery';

const DetailsModal = React.memo(({ 
  item, 
  onClose, 
  targetPath = "/signup",
  onConfirm,
  tradeType,
  isPending
}: {
  item: StockCardProps,
  onClose: () => void,
  targetPath?: string,
  onConfirm?: (id: string) => void,
  tradeType?: 'BUY' | 'SELL',
  isPending?: boolean
}) => {
  const navigate = useNavigate();
  const [range, setRange] = useState('1mo');
  const { mutate: fetchHistory, data: historyData, isPending: isHistoryLoading } = useFetchStockHistory();
  const { mutate: fetchDetails, data: detailsData, isPending: isDetailsLoading } = useFetchStockDetails();

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

  const stats = [
    { label: 'Market Cap', value: displayItem.marketCap || 'N/A' },
    { label: 'Volume', value: displayItem.volume || 'N/A' },
    { label: 'P/E Ratio', value: displayItem.peRatio || 'N/A' },
    { label: 'Div. Yield', value: displayItem.dividendYield || 'N/A' },
    { label: 'EPS', value: displayItem.eps || 'N/A' },
    { label: '52W High', value: displayItem.fiftyTwoWeekHigh || 'N/A' },
    { label: '52W Low', value: displayItem.fiftyTwoWeekLow || 'N/A' },
    { label: 'Beta', value: displayItem.beta || 'N/A' },
  ];

  const cryptoStats = [
    { label: 'Circ. Supply', value: displayItem.circulatingSupply || 'N/A' },
    { label: 'Max Supply', value: displayItem.maxSupply || 'N/A' },
    { label: 'Market Cap', value: displayItem.marketCap || 'N/A' },
    { label: '24h Volume', value: displayItem.volume || 'N/A' },
    { label: 'Global Rank', value: displayItem.marketCapRank ? `#${displayItem.marketCapRank}` : 'N/A' },
    { label: '52W High', value: displayItem.fiftyTwoWeekHigh || 'N/A' },
    { label: '52W Low', value: displayItem.fiftyTwoWeekLow || 'N/A' },
    { label: 'Start Date', value: displayItem.startDate || 'N/A' },
  ];

  const currentStats = displayItem.type === 'CRYPTO' ? cryptoStats : stats;

  const chartData = (historyData as any)?.data || [];
  const isUp = parseFloat(item.return || '0') >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 perspective-1000">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xl transition-opacity animate-in fade-in duration-500"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden animate-in slide-in-from-bottom-10 duration-500 ease-out">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5 bg-white/[0.02] backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-2 flex-shrink-0">
              <img src={item.image} alt={item.label} className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight truncate">{item.label}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-emerald-400 tracking-wider">
                  {item.symbol}
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest leading-none">{item.type}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="group p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-all"
          >
            <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
          
          {/* Price Section */}
          <div className="p-6 sm:p-8 pb-0">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-bold tracking-tighter text-white">
                {displayItem.price ? `$${displayItem.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : 'N/A'}
              </span>
              <span className={`text-sm font-bold px-2 py-1 rounded-lg ${isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {item.return}
              </span>
            </div>
            <p className="text-gray-500 text-xs font-medium mt-2 flex items-center gap-2 italic">
              <Activity className="w-3 h-3" />
              Real-time update from Global Markets
            </p>
          </div>

          {/* Chart Section */}
          <div className="px-6 py-4 relative">
             <div className="flex justify-start gap-2 mb-6 bg-white/[0.03] p-1 rounded-xl w-fit border border-white/5">
                {['1d', '1w', '1mo', '1y', 'max'].map((t) => (
                  <button 
                    key={t} 
                    onClick={() => setRange(t)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${range === t ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>
             <div className={`h-[280px] w-full transition-opacity duration-300 ${isHistoryLoading ? 'opacity-30' : 'opacity-100'}`}>
                {chartData.length > 0 ? (
                  <PriceChart data={chartData} containerHeight={280} isUp={isUp} />
                ) : (
                  <div className="h-full flex items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                    <p className="text-gray-600 text-xs font-bold tracking-widest uppercase animate-pulse">Loading Chart Data...</p>
                  </div>
                )}
             </div>
          </div>

          {/* Stats Grid */}
          <div className="px-6 py-8">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Info className="w-3 h-3" />
                Key Statistics
             </h3>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {currentStats.map((stat, i) => (
                   <div key={i} className="group p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300">
                      <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2 group-hover:text-gray-300 transition-colors">{stat.label}</p>
                      <p className="text-sm sm:text-base font-bold text-white tracking-tight">{stat.value}</p>
                   </div>
                ))}
             </div>
          </div>

          {/* About Section */}
          <div className="px-6 py-8 bg-white/[0.01] border-y border-white/5">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">About {item.label}</h3>
             <p className="text-gray-400 text-sm leading-relaxed font-medium">
                {item.about}
             </p>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                          <Building2 className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Headquarters</p>
                          <p className="text-xs font-bold text-white">{displayItem.hq || 'Global'}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                          <Briefcase className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Industry</p>
                          <p className="text-xs font-bold text-white">{displayItem.industry || 'N/A'}</p>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                          <TrendingUp className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Executive</p>
                          <p className="text-xs font-bold text-white">{displayItem.ceo || 'N/A'}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                          <Globe className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">{displayItem.type === 'CRYPTO' ? 'Start Date' : 'Founded'}</p>
                          <p className="text-xs font-bold text-white">{displayItem.type === 'CRYPTO' ? displayItem.startDate : (displayItem.stats?.founded || 'N/A')}</p>
                       </div>
                    </div>
                </div>
             </div>
          </div>

          {/* Disclaimer */}
          <div className="p-6 text-[10px] text-gray-600 leading-normal mb-6">
             <p>CimessInvest provided market data is for informational purposes only. Trading involves significant risk. Technical charts are powered by high-performance data streams.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-white/5 bg-black sticky bottom-0 z-10 flex flex-col sm:flex-row gap-3">
            <button
               onClick={onClose}
               className="flex-1 px-6 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white hover:bg-white/5 transition-all"
            >
               Dismiss
            </button>
            {onConfirm ? (
               <button
                  onClick={() => onConfirm(item.id || '')}
                  disabled={isPending}
                  className={`flex-[2] px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] text-white shadow-2xl transition-all active:scale-[0.98] disabled:opacity-50 ${
                  tradeType === 'BUY' ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20' : 'bg-red-500 hover:bg-red-400 shadow-red-500/20'
                  }`}
               >
                  {isPending ? 'Processing...' : `Confirm ${tradeType === 'BUY' ? 'Purchase' : 'Sale'}`}
               </button>
            ) : (
               <button
                  onClick={() => navigate(targetPath, { state: { symbol: item.symbol, mode: 'BUY' } })}
                  className="flex-[2] px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] text-black bg-white hover:bg-gray-200 shadow-xl shadow-white/10 transition-all active:scale-[0.98]"
               >
                  Invest In {item.symbol}
               </button>
            )}
        </div>

      </div>
    </div>
          
  );
});

export default DetailsModal;
