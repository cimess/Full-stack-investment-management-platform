import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', qty: 25, avgPrice: 168.50, currentPrice: 182.30, change: 8.19 },
  { symbol: 'TSLA', name: 'Tesla Inc.', qty: 10, avgPrice: 205.00, currentPrice: 221.40, change: 8.00 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', qty: 15, avgPrice: 310.00, currentPrice: 298.50, change: -3.71 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', qty: 8, avgPrice: 590.00, currentPrice: 673.20, change: 14.10 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', qty: 12, avgPrice: 142.00, currentPrice: 155.80, change: 9.72 },
];

const PortfolioView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-2xl">My Portfolio</h2>
          <p className="text-slate-500 text-sm">Detailed view of your current active holdings</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium hover:bg-emerald-500/20 transition-colors">
              <TrendingUp className="w-4 h-4" /> Buy Stock
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-medium hover:bg-red-500/20 transition-colors">
              <TrendingDown className="w-4 h-4" /> Sell Stock
            </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
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
              {holdings.map((h) => {
                const value = h.qty * h.currentPrice;
                const pnl = (h.currentPrice - h.avgPrice) * h.qty;
                const isUp = pnl >= 0;
                return (
                  <tr key={h.symbol} className="hover:bg-white/2 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/5 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{h.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">{h.symbol}</p>
                          <p className="text-slate-500 text-xs">{h.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-slate-300 text-sm">{h.qty}</td>
                    <td className="px-4 py-4 text-right text-slate-300 text-sm">${h.avgPrice.toFixed(2)}</td>
                    <td className="px-4 py-4 text-right text-white text-sm font-medium">${h.currentPrice.toFixed(2)}</td>
                    <td className="px-4 py-4 text-right text-slate-300 text-sm">${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-right">
                      <p className={`text-sm font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isUp ? '+' : ''}${pnl.toFixed(2)}
                      </p>
                      <p className={`text-[10px] font-medium ${isUp ? 'text-emerald-500/60' : 'text-red-500/60'}`}>
                        ({isUp ? '+' : ''}{h.change.toFixed(2)}%)
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioView;
