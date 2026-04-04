import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { TrendingUp, TrendingDown, Loader2, X } from 'lucide-react';
import { getUserDashboard, useGetMarketQuotes, useBuyStock, useSellStock } from "../../../hooks/useQuery";
import { toast } from 'react-toastify';
import DetailsModal from '../../../components/DetailsModal';

const TradeModal = React.memo(({
  isOpen,
  onClose,
  type,
  stocks = [],
  onConfirm,
  isPending,
  initialSelectedStockId,
  initialSelectedStock
}: {
  isOpen: boolean;
  onClose: () => void;
  type: 'BUY' | 'SELL';
  stocks: any[];
  onConfirm: (stockId: string, quantity: number) => void;
  isPending: boolean;
  initialSelectedStockId?: string | null;
  initialSelectedStock?: string | null;
}) => {
  const [selectedStockId, setSelectedStockId] = React.useState(initialSelectedStockId || '');
  const [quantity, setQuantity] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [detailedStock, setDetailedStock] = React.useState<any>(null);
  const [showDetailsBtn, setShowDetailsBtn] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setSearchTerm(initialSelectedStock || '');
      setSelectedStockId(initialSelectedStockId || '');
      setQuantity(0);
      setDetailedStock("");
    }
  }, [isOpen, initialSelectedStockId, initialSelectedStock]);

  const sortedStocks = React.useMemo(() => {
    return [...stocks].sort((a, b) => (a.symbol || '').localeCompare(b.symbol || ''));
  }, [stocks]);

  const filteredStocks = React.useMemo(() => {
    if (!searchTerm) return sortedStocks;
    const term = searchTerm.toLowerCase();
    return sortedStocks.filter(s =>
      s?.symbol?.toLowerCase().includes(term) ||
      s?.company?.toLowerCase().includes(term)
    );
  }, [sortedStocks, searchTerm]);

  const selectedStock = stocks.find(s => s.id === selectedStockId);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        <div className="glass-panel w-full max-w-md max-h-[90vh] rounded-3xl border border-white/10 p-5 sm:p-6 flex flex-col space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-between shrink-0">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {type === 'BUY' ? 'Buy Asset' : 'Sell Asset'}
            </h3>
            <button onClick={onClose} className="p-2 rounded-full bg-white/5 text-slate-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative shrink-0">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Search Markets</label>
            <div className="relative group">
              <input
                type="text"
                placeholder="Search symbol or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all"
              />
              <TrendingUp className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Persistent List Container */}
          <div className="flex-1 overflow-y-auto min-h-[250px] scrollbar-hide py-1 space-y-1.5 rounded-2xl">
            {filteredStocks.length > 0 ? (
              filteredStocks.map((s: any) => {
                const isSelected = selectedStockId === s.id;
                return (
                  <div key={s.id}
                    className="flex flex-col items-center justify-between">
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedStockId(s.id);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${isSelected
                        ? 'bg-emerald-500/10 border-emerald-500/40 ring-1 ring-emerald-500/20'
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border transition-colors ${isSelected ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-white/5 text-white border-white/10'
                          }`}>
                          {s.symbol?.charAt(0)}
                        </div>
                        <div className="min-w-0 pr-2">
                          <span className={`font-bold text-sm block tracking-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>{s.symbol}</span>
                          <span className="text-slate-500 text-[9px] uppercase font-bold tracking-widest truncate block">{s.company}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`font-mono text-sm font-bold block ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                          ${Number(s.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                        {isSelected && (
                          <span className="text-[8px] font-bold text-emerald-500/80 uppercase tracking-widest">Reviewing</span>
                        )}
                      </div>
                    </button>
                    {isSelected && (
                    <button
                      onClick={() => {

                        
                        // Map backend stock to DetailsModal format
                        setDetailedStock({
                          id: s.id,
                          label: s.company || s.symbol,
                          symbol: s.symbol,
                          image: s.image || `https://api.lineicons.com/v1/icons/investment/stock-${s.symbol.toLowerCase()}`,
                          type: s.assetType || 'STOCK',
                          financial: s.financialSummary || 'No financial summary available.',
                          about: s.about || `Learn more about ${s.company || s.symbol} performance and market trends.`,
                          stats: {
                            industry: s.industry || 'Financial Services',
                            hq: s.hq || 'Global',
                            founded: s.founded || 'N/A',
                            ceo: s.ceo || 'N/A',
                            more: s.assetType === 'CRYPTO' ? 'Crypto Market Data provided by Yahoo Finance' : 'Stock Market Data provided by Yahoo Finance'
                          }
                        });
                      }
                      }
                      className="w-[40%] text-center p-2 rounded-xl border border-white/5
                  transition-all duration-300 flex items-center  justify-center
                  hover:bg-white/[0.05] hover:border-white/10 
                  font-bold text-xs text-gray-500 mt-2">
                      view details
                    </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-slate-500 space-y-3">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <X className="w-6 h-6 opacity-20" />
                </div>
                <p className="text-xs font-medium">No results found for "{searchTerm}"</p>
              </div>
            )}
          </div>

          {/* Controls Section (Quantity Only) */}
          <div className="pt-4 border-t border-white/5 space-y-4 shrink-0">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Set Quantity</label>
                <input
                  type="number"
                  step={'any'}
                  value={quantity}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setQuantity(Math.max(0, isNaN(value) ? 0 : value));
                  }}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
              {selectedStock && (
                <div className="text-right">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Total Estimate</label>
                  <p className="text-emerald-400 text-lg font-bold font-mono tracking-tighter">
                    ${(Number(selectedStock.price || 0) * quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={!selectedStockId || quantity <= 0 || isPending||selectedStock.price<=0}
              onClick={() => {
                // Clicking this button ensures the DetailsModal is open for confirmation
               
                  // Modal is already open or will be triggered by click in list
                  onConfirm(selectedStockId, quantity);
                  setDetailedStock(null);
                
              }}
              className={`flex-1 px-4 py-2.5 sm:py-3 rounded-xl font-bold text-white text-sm sm:text-base transition-all ${type === 'BUY'
                ? 'bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-red-500 hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                } disabled:opacity-50 disabled:shadow-none`}
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                `${type === 'BUY' ? 'Buy' : 'Sell'}`
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Details Review Overlay */}
      {detailedStock  && (
        <DetailsModal
          item={detailedStock}
          onClose={() => setDetailedStock(null)}
          onConfirm={() => {
            onConfirm(selectedStockId, quantity);
            setDetailedStock(null);
          }}
          tradeType={type}
          isPending={isPending}
        />
      )}
    </>
  );
});

const PortfolioView: React.FC = () => {
  const { data, isLoading, isError, refetch } = getUserDashboard();
  const { data: marketData } = useGetMarketQuotes();

  const [tradeType, setTradeType] = React.useState<'BUY' | 'SELL' | null>(null);
  const [isTradeModalOpen, setIsTradeModalOpen] = React.useState(false);
  const [initialStockId, setInitialStockId] = React.useState<string | null>(null);
  const [initialSelectedStock, setInitialSelectedStock] = React.useState<string| null>(null);
  const location = useLocation();

  // Reset initialStockId when modal closes
  useEffect(() => {
    if (!isTradeModalOpen) {
      setInitialStockId(null);
      setInitialSelectedStock(null);
    }
  }, [isTradeModalOpen]);

  useEffect(() => {
    const state = location.state as { symbol?: string; mode?: 'BUY' | 'SELL' } | null;
    if (state?.symbol && marketData?.data) {
      const stock = marketData.data.find((s: any) => s.symbol === state.symbol);
      if (stock) {
        setTradeType(state.mode || 'BUY');
        setInitialStockId(stock.id);
        setInitialSelectedStock(stock.symbol );
        setIsTradeModalOpen(true);
        // Clear location state to prevent re-opening on refresh
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, marketData]);

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
            onClick={() => { setTradeType('BUY'); setIsTradeModalOpen(true); }}
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
              onClick={() => { setTradeType('BUY'); setIsTradeModalOpen(true); }}
              className="px-8 py-3 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              Start Investing
            </button>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="grid grid-cols-1 divide-y divide-white/5 md:hidden glass-panel">
              {holdings.map((h: any) => (
                <div key={h.id} className="p-4 space-y-4 border-b border-white/10 rounded-xl mb-3 ">
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
          stocks={tradeType === 'SELL' ? (data?.data?.investments?.map((v: any) => v.stock) || []) : (marketData?.data || [])}
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
