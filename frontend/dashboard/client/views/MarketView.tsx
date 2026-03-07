import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

const marketStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 182.30, change: +1.25, cap: '2.8T' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 673.20, change: +4.82, cap: '1.6T' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 298.50, change: -0.45, cap: '3.1T' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 221.40, change: +2.15, cap: '700B' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.80, change: +0.85, cap: '1.8T' },
  { symbol: 'AMZN', name: 'Amazon Inc.', price: 155.80, change: +1.10, cap: '1.6T' },
];

const MarketView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = marketStocks.filter(s =>
    s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-2xl">Market Explorer</h2>
          <p className="text-slate-500 text-sm">Discover and analyze global stocks</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <input
            type="text"
            placeholder="Search symbol or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(s => (
          <div key={s.symbol} className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white font-bold border border-white/5 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                  {s.symbol.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold">{s.symbol}</p>
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{s.name}</p>
                </div>
              </div>
              <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors">
                 <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-slate-500 text-xs mb-1">Price</p>
                <p className="text-white text-lg font-bold">${s.price.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-xs mb-1">24h Change</p>
                <p className={`text-sm font-bold ${s.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketView;
