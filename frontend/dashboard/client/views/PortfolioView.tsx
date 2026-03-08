import React from 'react';
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import { useGetDashboard, useGetMarketQuotes, userBuyStock, userSellStock } from "../../../hooks/useQuery";

const TradeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  type: 'BUY' | 'SELL';
  stocks: any[];
  onConfirm: (stockId: string, quantity: number) => void;
  isPending: boolean;
}> = ({ isOpen, onClose, type, stocks = [], onConfirm, isPending }) => {
  const [selectedStockId, setSelectedStockId] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedStockId('');
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-md rounded-2xl border border-white/10 p-6 space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            {type === 'BUY' ? 'Buy Stock' : 'Sell Stock'}
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <TrendingDown className="w-5 h-5 rotate-45" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Stock</label>
            <select 
              value={selectedStockId}
              onChange={(e) => setSelectedStockId(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 appearance-none"
            >
              <option value="" disabled className="bg-slate-900 font-bold">Choose a stock...</option>
              {stocks.filter(s => s).map((s: any) => (
                <option key={s.id} value={s.id} className="bg-slate-900 font-bold">
                  {s.symbol || 'N/A'} - {s.company || 'N/A'} (${Number(s.price || 0).toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Quantity</label>
            <input 
              type="number" 
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
            />
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
            disabled={!selectedStockId || quantity < 1 || isPending}
            onClick={() => onConfirm(selectedStockId, quantity)}
            className={`flex-1 px-4 py-3 rounded-xl font-bold text-white transition-all ${
              type === 'BUY' 
                ? 'bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                : 'bg-red-500 hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
            } disabled:opacity-50 disabled:shadow-none`}
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              `Confirm ${type === 'BUY' ? 'Buy' : 'Sell'}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const PortfolioView: React.FC = () => {
  const { data, isLoading, isError, refetch } = useGetDashboard();
  const { data: marketData } = useGetMarketQuotes();
  
  const [tradeType, setTradeType] = React.useState<'BUY'|'SELL'|null>(null);
  const [isTradeModalOpen, setIsTradeModalOpen] = React.useState(false);

  const buyMutation = userBuyStock();
  const sellMutation = userSellStock();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }


  const holdings = data?.data?.investments || [];

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

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {holdings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 lg:p-24 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-white/5 flex items-center justify-center">
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
            <div className="grid grid-cols-1 divide-y divide-white/5 md:hidden">
              {holdings.map((h: any) => {
                if (!h.stock) return null;
                const currentPrice = Number(h.stock.price || 0);
                const avgPrice = Number(h.avgPrice || 0);
                const value = h.quantity * currentPrice;
                const pnl = (currentPrice - avgPrice) * h.quantity;
                const isUp = pnl >= 0;

                return (
                  <div key={h.id} className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/5 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{h.stock.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-white font-bold">{h.stock.symbol}</p>
                          <p className="text-slate-500 text-[10px] uppercase tracking-wider">{h.stock.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                          {isUp ? '+' : ''}${pnl.toFixed(2)}
                        </p>
                        <p className="text-slate-500 text-[10px] font-medium">{h.quantity} Shares</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                      <div>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Avg Price</p>
                        <p className="text-slate-300 text-xs font-medium">${avgPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Current</p>
                        <p className="text-white text-xs font-bold">${currentPrice.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Value</p>
                        <p className="text-emerald-400 text-xs font-bold">${value.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
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
                <tbody className="divide-y divide-white/3">
                  {holdings.map((h: any) => {
                    if (!h.stock) return null;
                    const currentPrice = Number(h.stock.price || 0);
                    const avgPrice = Number(h.avgPrice || 0);
                    const value = h.quantity * currentPrice;
                    const pnl = (currentPrice - avgPrice) * h.quantity;
                    const isUp = pnl >= 0;
                    const changePct = avgPrice > 0 ? ((currentPrice - avgPrice) / avgPrice) * 100 : 0;

                    return (
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
                        <td className="px-4 py-4 text-right text-slate-300 text-sm">${avgPrice.toFixed(2)}</td>
                        <td className="px-4 py-4 text-right text-white text-sm font-medium">${currentPrice.toFixed(2)}</td>
                        <td className="px-4 py-4 text-right text-slate-300 text-sm">${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td className="px-6 py-4 text-right">
                          <p className={`text-sm font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                            {isUp ? '+' : ''}${pnl.toFixed(2)}
                          </p>
                          <p className={`text-[10px] font-medium ${isUp ? 'text-emerald-500/60' : 'text-red-500/60'}`}>
                            ({isUp ? '+' : ''}{changePct.toFixed(2)}%)
                          </p>
                        </td>
                      </tr>
                    );
                  })}
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
          stocks={tradeType === 'SELL' ? (data?.data?.investments?.map((v:any) => v.stock) || []) : (marketData?.data || [])}
          isPending={buyMutation.isPending || sellMutation.isPending}
          onConfirm={(stockId, quantity) => {
            const mutation = tradeType === 'BUY' ? buyMutation : sellMutation;
            mutation.mutate({ stock_id: stockId, quantity }, {
              onSuccess: () => {
                setIsTradeModalOpen(false);
                refetch(); // Refresh dashboard to see pending request
                alert("Trade request sent successfully!");
              },
              onError: (err: any) => {
                alert(err?.response?.data?.message || "Trade request failed. Make sure you have a manager assigned.");
              }
            });
          }}
        />
      )}
    </div>
  );
};

export default PortfolioView;
