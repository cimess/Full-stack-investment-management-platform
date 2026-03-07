import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

const activities = [
  { id: 1, type: 'Buy', symbol: 'NVDA', qty: 5, price: 673.20, total: 3366.00, date: 'Feb 26, 2025', status: 'completed' },
  { id: 2, type: 'Sell', symbol: 'AAPL', qty: 10, price: 182.30, total: 1823.00, date: 'Feb 25, 2025', status: 'completed' },
  { id: 3, type: 'Buy', symbol: 'TSLA', qty: 4, price: 221.40, total: 885.60, date: 'Feb 24, 2025', status: 'pending' },
  { id: 4, type: 'Buy', symbol: 'MSFT', qty: 6, price: 298.50, total: 1791.00, date: 'Feb 23, 2025', status: 'completed' },
];

const TransactionsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-bold text-2xl">Transaction History</h2>
        <p className="text-slate-500 text-sm">Review your past trades and pending requests</p>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Transaction</th>
                <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Quantity</th>
                <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Price</th>
                <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Total Value</th>
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Date</th>
                <th className="text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3">
              {activities.map((act) => (
                <tr key={act.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${act.type === 'Buy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'} border border-white/5`}>
                         {act.type === 'Buy' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{act.type} {act.symbol}</p>
                        <p className="text-slate-500 text-xs">Market Order</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-slate-300 text-sm">{act.qty}</td>
                  <td className="px-4 py-4 text-right text-slate-300 text-sm">${act.price.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right text-white text-sm font-bold">${act.total.toLocaleString()}</td>
                  <td className="px-4 py-4 text-slate-400 text-sm">{act.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${act.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                      {act.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsView;
