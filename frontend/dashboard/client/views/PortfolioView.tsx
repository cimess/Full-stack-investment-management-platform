import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { TrendingUp, TrendingDown, Loader2, X } from 'lucide-react';
import { getUserDashboard, useGetMarketQuotes, useBuyStock, useSellStock ,useSearchStock} from "../../../hooks/useQuery";
import { toast } from 'react-toastify';
import DetailsModal from '../../../components/DetailsModal';



import { useVirtualizer } from '@tanstack/react-virtual';

const TradeModal = React.memo(({
  isOpen,
  onClose,
  type,
  stocks = [],
  onConfirm,
  isPending,
  initialSelectedStockId,
  initialSelectedStock,
  isMarketLoading
}: {
  isOpen: boolean;
  onClose: () => void;
  type: 'BUY' | 'SELL';
  stocks: any[];
  onConfirm: (stockId: string, quantity: number) => void;
  isPending: boolean;
  initialSelectedStockId?: string | null;
  initialSelectedStock?: string | null;
  isMarketLoading?: boolean;
}) => {
  const [selectedStockId, setSelectedStockId] = React.useState(initialSelectedStockId || '');
  const [quantity, setQuantity] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [detailedStock, setDetailedStock] = React.useState<any>(null);
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  
  const parentRef = React.useRef<HTMLDivElement>(null);
  const { mutate: performSearch, isPending: isSearching } = useSearchStock();

  // Reset state on open
  React.useEffect(() => {
    if (isOpen) {
      setSearchTerm(initialSelectedStock || '');
      setSelectedStockId(initialSelectedStockId || '');
      setQuantity(0);
      setDetailedStock(null);
      setSearchResults([]);
    }
  }, [isOpen, initialSelectedStockId, initialSelectedStock]);

  // Debounced Remote Search
  React.useEffect(() => {
    if (!searchTerm || searchTerm.length < 2 || type === 'SELL') {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const isLocallyFound = stocks.some(s => 
        s?.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s?.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (!isLocallyFound) {
        performSearch(searchTerm, {
          onSuccess: (res) => {
            if (res.success && res.data) {
              const results = Array.isArray(res.data) ? res.data : [res.data];
              setSearchResults(results);
            }
          }
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, performSearch, stocks, type]);

  // Unified list logic
  const { allStocks, filteredResults } = React.useMemo(() => {
    const combined = [...stocks, ...searchResults];
    const uniqueMap = new Map();
    combined.forEach(s => {
      if (!s) return;
      const key = s.id || s.symbol || Math.random().toString();
      if (!uniqueMap.has(key)) uniqueMap.set(key, s);
    });
    
    const all = Array.from(uniqueMap.values()).sort((a, b) => 
      (a?.symbol || '').localeCompare(b?.symbol || '')
    );

    const term = searchTerm.toLowerCase();
    const filtered = !searchTerm ? all : all.filter(s =>
      s?.symbol?.toLowerCase().includes(term) ||
      s?.company?.toLowerCase().includes(term)
    );

    return { allStocks: all, filteredResults: filtered };
  }, [stocks, searchResults, searchTerm]);

  // Virtualizer implementation
  const virtualizer = useVirtualizer({
    count: filteredResults.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72, // Height of each row including gap
    overscan: 10,
  });

  const selectedStock = allStocks.find(s => s.id === selectedStockId || s.symbol === selectedStockId);
  
  // Debug: Monitor data arrival
  React.useEffect(() => {
    if (isOpen) {
      console.log('📦 TradeModal Data Sync:', {
        stocksCount: stocks.length,
        isMarketLoading,
        searchTerm,
        type
      });
    }
  }, [isOpen, stocks.length, isMarketLoading, searchTerm, type]);

  // Robust loading check: 
  // ONLY show Initializing if we are ACTIVELY loading and have nothing yet.
  // If loading is done (isMarketLoading is false), we MUST stop showing "Initializing".
  const isActuallyLoading = isMarketLoading && stocks.length === 0 && searchTerm === '' && type === 'BUY';

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
        <div className="glass-panel w-full max-w-md max-h-[90vh] rounded-[2.5rem] border border-white/10 p-5 sm:p-7 flex flex-col space-y-5 animate-in fade-in zoom-in duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between shrink-0">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {type === 'BUY' ? 'Invest in Markets' : 'Exit Position'}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {isSearching ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Searching Global Market...</span>
                  </>
                ) : (
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    {filteredResults.length} Assets Available
                  </span>
                )}
              </div>
            </div>
            <button onClick={onClose} className="p-2.5 rounded-2xl bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative shrink-0">
            <div className="relative group">
              <input
                type="text"
                placeholder="Find stocks, indices or symbols..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all font-medium placeholder:text-slate-600"
              />
              <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Virtualized List Area */}
          <div
            ref={parentRef}
            className="flex-1 overflow-y-auto min-h-[350px] scrollbar-hide py-1 rounded-2xl relative">
            
            {filteredResults.length > 0 ? (
              <div
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {virtualizer.getVirtualItems().map((virtualItem) => {
                  const s = filteredResults[virtualItem.index];
                  const itemKey = s.id || s.symbol || `virtual-${virtualItem.index}`;
                  const isSelected = selectedStockId === s.id || (s.symbol && selectedStockId === s.symbol);
                  const price = Number(s.price || 0);
                  
                  return (
                    <div
                      key={itemKey}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                        paddingBottom: '10px'
                      }}
                    >
                      <button
                        onClick={() => setSelectedStockId(s.id || s.symbol)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${isSelected
                          ? 'bg-emerald-500/10 border-emerald-500/40'
                          : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                          }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[10px] shrink-0 border transition-all ${isSelected ? 'bg-emerald-500 text-black border-emerald-400 scale-105' : 'bg-white/5 text-slate-400 border-white/10 group-hover:text-white group-hover:border-white/20'}`}>
                            {s.symbol?.substring(0, 3)}
                          </div>
                          <div className="min-w-0">
                            <span className={`font-bold text-sm block leading-none mb-1.5 ${isSelected ? 'text-white' : 'text-slate-300'}`}>{s.symbol}</span>
                            <span className="text-slate-500 text-[9px] uppercase font-bold tracking-[0.15em] truncate block">{s.company || 'Market Asset'}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`font-mono text-sm font-bold block ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                            ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (isActuallyLoading ? (
              <div className="flex flex-col items-center justify-center h-full py-20 space-y-5">
                <div className="relative">
                   <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                   <div className="absolute inset-0 blur-lg bg-emerald-500/20 animate-pulse" />
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] animate-pulse">Initializing Data Stream</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20 text-slate-500 space-y-4">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <X className="w-6 h-6 opacity-30" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-white mb-1">No Assets Found</p>
                  <p className="text-[10px] uppercase tracking-wider font-semibold opacity-50">Refine your search parameters</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quantity & Summary */}
          <div className="pt-2 shrink-0 space-y-4">
            {selectedStock && (
              <button
                onClick={() => setDetailedStock({
                  ...selectedStock,
                  label: selectedStock.company || selectedStock.symbol,
                  image: selectedStock.image || `https://api.lineicons.com/v1/icons/investment/stock-${selectedStock.symbol?.toLowerCase()}`,
                  stats: {
                    industry: selectedStock.industry || 'Market Asset',
                    hq: selectedStock.hq || 'Global Markets',
                    more: 'Verified Financial Data'
                  }
                })}
                className="w-full py-2.5 rounded-2xl border border-white/5 bg-white/[0.02] text-[10px] font-bold text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-1"
              >
                Explore {selectedStock.symbol} Details
              </button>
            )}

            <div className="bg-white/5 rounded-3xl p-5 border border-white/5 space-y-4">
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Order Quantity</label>
                  <input
                    type="number"
                    step="any"
                    placeholder="0.00"
                    value={quantity || ''}
                    onChange={(e) => setQuantity(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-transparent border-none text-white font-mono text-xl focus:outline-none font-bold placeholder:text-slate-700"
                  />
                </div>
                {selectedStock && (
                  <div className="text-right">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Estimated Cost</label>
                    <p className="text-emerald-400 text-2xl font-bold font-mono">
                      ${(Number(selectedStock.price || 0) * quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex gap-3 shrink-0">
            <button disabled={isPending} onClick={onClose} className="flex-1 py-4 rounded-2xl border border-white/10 text-slate-400 font-bold hover:text-white hover:bg-white/5 transition-all text-sm uppercase tracking-widest">
              Cancel
            </button>
            <button
              disabled={!selectedStockId || quantity <= 0 || isPending || (Number(selectedStock?.price) <= 0)}
              onClick={() => onConfirm(selectedStockId, quantity)}
              className={`flex-[2] py-4 rounded-2xl font-bold text-white transition-all text-sm uppercase tracking-widest shadow-2xl ${
                type === 'BUY' ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-red-500 shadow-red-500/20'
              } disabled:opacity-10 disabled:grayscale`}
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (type === 'BUY' ? 'Execute Purchase' : 'Liquidate Asset')}
            </button>
          </div>
        </div>
      </div>

      {/* Details View Portal */}
      {detailedStock && (
        <DetailsModal
          item={detailedStock}
          onClose={() => setDetailedStock(null)}
          onConfirm={() => {
            onConfirm(selectedStockId, quantity);
            setDetailedStock(null);
          }}
          tradeType={type}
          isPending={isPending}
          initialQuantity={quantity}
        />
      )}
    </>
  );
});

const PortfolioView: React.FC = () => {



  const [tradeType, setTradeType] = React.useState<'BUY' | 'SELL' | null>(null);
  const [isTradeModalOpen, setIsTradeModalOpen] = React.useState(false);
  const [initialStockId, setInitialStockId] = React.useState<string | null>(null);
  const [initialSelectedStock, setInitialSelectedStock] = React.useState<string | null>(null);
  // Only true after user opens the BUY modal for the first time
  const [marketEnabled, setMarketEnabled] = React.useState(false);


  const { data, isLoading, isError, refetch } = getUserDashboard();

  const { data: marketData, isLoading: isMarketLoading}
    = useGetMarketQuotes(marketEnabled);
 


  const location = useLocation();

  // helper: open BUY modal and trigger the fetch
  const openBuyModal = () => {
    setMarketEnabled(true);  // start fetching market data
    setTradeType('BUY');
    setIsTradeModalOpen(true);
  };

  // Reset initialStockId when modal closes
  useEffect(() => {
    if (!isTradeModalOpen) {
      setInitialStockId(null);
      setInitialSelectedStock(null);
    }
  }, [isTradeModalOpen]);

  useEffect(() => {
    const state = location.state as { symbol?: string; mode?: 'BUY' | 'SELL' } | null;

    if (state?.symbol && marketData?.data && Array.isArray(marketData.data)) {
      const stock = marketData.data.find((s: any) => s.symbol === state.symbol);
      
      if (stock) {
        setMarketEnabled(true);
        setTradeType(state.mode || 'BUY');
        setInitialStockId(stock.id || stock.symbol);
        setInitialSelectedStock(stock.symbol);
        setIsTradeModalOpen(true);
        // Clear location state to prevent re-opening on refresh
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, marketData?.data]);

  const buyMutation = useBuyStock();
  const sellMutation = useSellStock();

  // Optimized: Pre-calculate holdings statistics once per render
  // This avoids recalculating P&L values twice (mobile/desktop) during the same render
  const processedHoldings = React.useMemo(() => {
    return (data?.data?.investments || []).map((h: any) => {
      if (!h.stock) return null;
      const currentPrice = Number(h.stock.price || 0);
      const avgPrice = Number(h.avgPrice || 0);
      const value = h.quantity * currentPrice;
      const pnl = (currentPrice - avgPrice) * h.quantity;
      const isUp = pnl >= 0;
      const changePct = avgPrice > 0 ? ((currentPrice - avgPrice) / avgPrice) * 100 : 0;

      return {
        ...h,
        currentPrice,
        avgPrice,
        value,
        pnl,
        isUp,
        changePct
      };
    }).filter(Boolean);
  }, [data?.data?.investments]);

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
        Failed to load portfolio data.
      </div>
    );
  }

  const holdings = processedHoldings;

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-xl lg:text-2xl">My Portfolio</h2>
          <p className="text-slate-500 text-xs lg:text-sm">Detailed view of your current active holdings</p>
        </div>
        {/* TRIGGER BUTTONS FOR TRADE MODAL */}
        <div className="flex gap-2">
          {/* This button opens the Buy Stock modal */}
          <button
            onClick={openBuyModal}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs lg:text-sm font-medium hover:bg-emerald-500/20 transition-colors"
          >
            <TrendingUp className="w-4 h-4" /> Buy Stock
          </button>

          {/* This button opens the Sell Stock modal */}
          <button
            onClick={() => { setTradeType('SELL'); setIsTradeModalOpen(true); }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-xs lg:text-sm font-medium hover:bg-red-500/20 transition-colors"
          >
            <TrendingDown className="w-4 h-4" /> Sell Stock
          </button>
        </div>
        {/* END OF TRIGGER BUTTONS */}
      </div>

      <div className={` rounded-2xl overflow-hidden ${holdings.length === 0 ? 'glass-panel' : ''}`}>
        {holdings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 lg:p-24 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-slate-500" />
            </div>
            <div className="max-w-xs space-y-2">
              <h3 className="text-white font-bold text-lg">Empty Portfolio</h3>
              <p className="text-slate-400 text-sm">You haven't made any investments yet. Ready to start your financial journey?</p>
            </div>

            {/* THIS BUTTON TRIGGERS THE FIRST BUY ACTION */}
            <button
              onClick={openBuyModal}
              className="px-8 py-3 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              Start Investing
            </button>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="grid grid-cols-1 divide-y divide-white/5 md:hidden glass-panel rounded-2xl">
              {holdings.map((h: any) => (
                <div key={h.id} className="p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{h.stock.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm tracking-tight">{h.stock.symbol}</p>
                        <p className="text-slate-500 text-[8px] uppercase tracking-[0.2em] font-bold">{h.stock.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${h.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                        {h.isUp ? '+' : ''}${h.pnl.toFixed(2)}
                      </p>
                      <p className="text-slate-500 text-[10px] font-medium">{h.quantity} Shares</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Avg Price</p>
                      <p className="text-slate-300 text-xs font-medium">${h.avgPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Current</p>
                      <p className="text-white text-xs font-bold">${h.currentPrice.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Value</p>
                      <p className="text-emerald-400 text-xs font-bold">${h.value.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto glass-panel">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 bg-white/2">
                    <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Symbol</th>
                    <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Qty</th>
                    <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Avg Price</th>
                    <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Current</th>
                    <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Value</th>
                    <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 ">
                  {holdings.map((h: any) => (
                    <tr key={h.id} className="hover:bg-white/2 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/5 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{h.stock.symbol.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-white text-sm font-semibold">{h.stock.symbol}</p>
                            <p className="text-slate-500 text-xs">{h.stock.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right text-slate-300 text-sm">{h.quantity}</td>
                      <td className="px-4 py-4 text-right text-slate-300 text-sm">${h.avgPrice.toFixed(2)}</td>
                      <td className="px-4 py-4 text-right text-white text-sm font-medium">${h.currentPrice.toFixed(2)}</td>
                      <td className="px-4 py-4 text-right text-slate-300 text-sm">${h.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="px-6 py-4 text-right">
                        <p className={`text-sm font-bold ${h.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                          {h.isUp ? '+' : ''}${h.pnl.toFixed(2)}
                        </p>
                        <p className={`text-[10px] font-medium ${h.isUp ? 'text-emerald-500/60' : 'text-red-500/60'}`}>
                          ({h.isUp ? '+' : ''}{h.changePct.toFixed(2)}%)
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {isTradeModalOpen && (
        <TradeModal
          isOpen={isTradeModalOpen}
          onClose={() => setIsTradeModalOpen(false)}
          type={tradeType || 'BUY'}
          stocks={
            tradeType === 'SELL' 
              ? (data?.data?.investments?.map((v: any) => v.stock) || []) 
              : (marketData?.data || [])
          }
          isMarketLoading={isMarketLoading}
          isPending={buyMutation.isPending || sellMutation.isPending}
          initialSelectedStockId={initialStockId}
          initialSelectedStock={initialSelectedStock}
          onConfirm={(stockId, quantity) => {
            const mutation = tradeType === 'BUY' ? buyMutation : sellMutation;
            mutation.mutate({ stock_id: stockId, quantity }, {
              onSuccess: () => {
                setIsTradeModalOpen(false);
                refetch(); // Refresh dashboard to see pending request
                toast.success("Trade request sent successfully!");
              },
              onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Trade request failed. Make sure you have a manager assigned.");
              }
            });
          }}
        />
      )}
    </div>
  );
};

export default PortfolioView;
